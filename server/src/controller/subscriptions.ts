import { Request, Response } from "express"
import {
  createPaypalOrder,
  capturePaypalPayment,
  getPaypalOrderData,
} from "../services/paypal"
import log from "../utils/logger"
import servErr from "../utils/servErr"

export const createSubscription = async (_req: Request, res: Response) => {
  try {
    // @ts-ignore
    const order = await createPaypalOrder(getPaypalOrderData())
    console.log("Order", order)
    return res.status(200).json(order)
  } catch (err) {
    console.log("createSubscription Error", err)
    log.error("createSubscription Error: ", err)
    return servErr(res)
  }
}

export const captureSubscription = async (req: Request, res: Response) => {
  const { orderID } = req.body

  console.log("Order ID: ", orderID)

  try {
    const captureData = await capturePaypalPayment(orderID)
    // TODO: Store payment information in postgres
    console.log("captureData", captureData)
    return res.status(200).json(captureData)
  } catch (err) {
    console.log("captureSubscription Error", err)

    log.error(err)
    return servErr(res)
  }
}
