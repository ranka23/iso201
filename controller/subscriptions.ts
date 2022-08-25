import { NextApiRequest, NextApiResponse } from "next"
import {
  createOrder,
  capturePayment,
  getPaypalOrderData,
} from "services/paypal"
import log from "utils/logger"
import servErr from "utils/servErr"
import { Keypair, PublicKey } from "@solana/web3.js"
import {
  confirmSolanaTransaction,
  getSolanaTransactionDetails,
  validateSolanaTransaction,
} from "services/solana"
import { nanoid } from "nanoid"
import PaymentStatus from "model/PaymentStatus"
import BigNumber from "bignumber.js"
import getSubscriptionAmount from "utils/getSubscriptionAmount"
import errors from "constants/errors"
import Subscription from "model/Subscription"
import { signAndSetJWTTokens } from "services/jwt"

export const createPaypalOrder = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, email, pro } = req.user
  const { currency } = req.body

  const invoiceID = nanoid()

  try {
    // @ts-ignore
    const order = await createOrder(getPaypalOrderData())
    console.log("Order", order)
    return res.status(200).json(order)
  } catch (err) {
    log.error("createSubscription Error: ", err)
    return servErr(res)
  }
}

export const completePaypalOrder = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { invoiceID } = req.query

  if (typeof invoiceID !== "string") {
    return res.status(401).json({ error: errors.invoiceID_not_provided })
  }

  try {
    const captureData = await capturePayment(invoiceID)
    // TODO: Store payment information in postgres
    console.log("captureData", captureData)
    return res.status(200).json(captureData)
  } catch (err) {
    console.log("captureSubscription Error", err)

    log.error(err)
    return servErr(res)
  }
}

export const createSolanaOrder = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id, pro } = req.user

    if (pro) {
      return res.status(401).json({ error: errors.already_pro })
    }
    const reference = new Keypair().publicKey
    const invoiceID = nanoid()
    const qr = getSolanaTransactionDetails(reference, invoiceID)

    const paymentStatus = await new PaymentStatus(
      invoiceID,
      "pending",
      id,
      "solana",
      reference.toString()
    ).create()

    if (paymentStatus.id === invoiceID) {
      return res.status(200).json({ qr, invoiceID })
    } else {
      return res.status(500).json({ error: errors.failed_to_place_order })
    }
  } catch (err) {
    log.error("createSolanaOrder Error: ", err)
    return servErr(res)
  }
}

export const completeSolanaOrder = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // invoiceID is the memo field in the transaction
  try {
    const { invoiceID } = req.query
    const { id } = req.user

    if (typeof invoiceID !== "string") {
      return res.status(401).json({ error: errors.invoiceID_not_provided })
    }

    // Get the payment status stored in the DB
    const paymentStatus = await new PaymentStatus(invoiceID).read()

    if (paymentStatus?.id === invoiceID) {
      // The amount of the transaction is the amount of the subscription
      const amount = getSubscriptionAmount()
      // Convert the string reference to PublicKey
      const reference = new PublicKey(paymentStatus.token as string)
      // Independently confirm if the transaction is valid after receiving confirmation from front-end
      const signatureInfo = await confirmSolanaTransaction(
        reference,
        paymentStatus.id as string
      )
      // Validate the transaction is on the block chain.
      const validation = await validateSolanaTransaction(
        signatureInfo.signature,
        new BigNumber(0.01), // TODO: new BigNumber(getAmountDetails().finalPrice)
        reference,
        invoiceID
        //TODO: splToken: new PublicKey(process.env.USDC_MINT_ADDRESS)
      )

      if (typeof validation.slot === "number") {
        // Create a subscription in the DB
        const userEmail = await new Subscription(
          id,
          invoiceID,
          "solana",
          amount.basePrice,
          amount.finalPrice,
          amount.discount,
          amount.tax
        ).create()
        if (userEmail) {
          // Sign and set the auth tokens
          await signAndSetJWTTokens(res, {
            id,
            email: userEmail,
            pro: true,
          })
          return res.status(200).json({ message: "success" })
        } else {
          return res
            .status(500)
            .json({ error: errors.payment_received_but_not_pro_error })
        }
      }
    }
    return res.status(404).json({ error: errors.unverified_payment })
  } catch (err) {
    log.error("completeSolanaOrder Error: ", err)
    return servErr(res)
  }
}
