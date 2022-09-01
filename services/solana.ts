import {
  encodeURL,
  findReference,
  FindReferenceError,
  Reference,
  validateTransfer,
} from "@solana/pay"
import {
  Cluster,
  clusterApiUrl,
  ConfirmedSignatureInfo,
  Connection,
  PublicKey,
} from "@solana/web3.js"
import BigNumber from "bignumber.js"
import { sol } from "."
import log from "../utils/logger"

export const establishConnection = (
  cluster = process.env.SOLANA_NETWORK as Cluster
) => {
  const endpoint = clusterApiUrl(cluster)
  const connection = new Connection(endpoint, "confirmed")
  log.info("Connection to Solana cluster established")

  return connection
}

export const getSolanaTransactionDetails = (
  reference: PublicKey,
  memo: string
) => {
  // The data to be sent to the front-end
  const data = {
    label: "iso201.com 1 yr Subscription",
    message: "365 days of unlimited access",
    amount: new BigNumber(0.01), // TODO: getAmountDetails().finalPrice to get the amount details
    reference,
    memo,
    recipient: new PublicKey(process.env.SOLANA_WALLET_PUBLIC_KEY as string),
    // TODO: splToken: new PublicKey(process.env.USDC_MINT_ADDRESS as string),
  }

  return encodeURL(data)
}

export const confirmSolanaTransaction = (reference: PublicKey, memo: string) =>
  new Promise<ConfirmedSignatureInfo>(async (resolve, reject) => {
    let signatureInfo: ConfirmedSignatureInfo
    let count = 0
    const interval = setInterval(async () => {
      count += 1
      if (count > 120) {
        clearInterval(interval)
        reject(new Error("Timed out waiting for signature"))
      }
      try {
        signatureInfo = await findReference(sol(), reference, {
          finality: "confirmed",
        })
        const infoMemo = signatureInfo?.memo?.split(" ")
        if (infoMemo && infoMemo.length > 1 && infoMemo[1] === memo) {
          clearInterval(interval)
          return resolve(signatureInfo)
        }
      } catch (error: any) {
        if (!(error instanceof FindReferenceError)) {
          clearInterval(interval)
          reject(error)
          throw new Error(error)
        }
      }
    }, 3000)
  })

export const validateSolanaTransaction = async (
  signature: string,
  amount: BigNumber,
  reference: Reference,
  memo: string,
  _splToken?: PublicKey
) => {
  const details = {
    recipient: new PublicKey(process.env.SOLANA_WALLET_PUBLIC_KEY as string),
    amount,
    // TODO: Add other fields after the bug is fixed in @solana/pay npm module
  }
  try {
    const validation = await validateTransfer(sol(), signature, details)
    return validation
  } catch (error: any) {
    throw new Error(error)
  }
}
