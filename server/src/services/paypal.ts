import axios from "axios"
import log from "../utils/logger"
import "dotenv/config"
import redis from "./redis"

const url = process.env.PAYPAL_URL as string
const clientID = process.env.PAYPAL_CLIENT_ID as string
const secret = process.env.PAYPAL_SECRET as string

const generatePaypalAccessToken = async () => {
  const paypalAuthTokenUrl = `${url}/v1/oauth2/token`
  try {
    const token = await redis.get("paypalAccessToken")
    if (token && token.length > 10) {
      return token
    }
    const res = await axios({
      url: paypalAuthTokenUrl,
      method: "post",
      data: "grant_type=client_credentials",
      auth: {
        username: clientID,
        password: secret,
      },
    })
    const { access_token, expires_in } = res.data.access_token

    redis.set("paypalAccessToken", access_token as string, {
      EX: expires_in - 60,
    })
    return access_token
  } catch (error: any) {
    log.error("Failed to fetch Paypal Oauth", error)
    throw new Error(error.message)
  }
}

export const createPaypalOrder = async (orderData: PaypalOrderData) => {
  const paypalCheckoutUrl = `${url}/v2/checkout/orders`

  try {
    const accessToken = await generatePaypalAccessToken()
    const res = await axios.post(paypalCheckoutUrl, orderData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return res.data
  } catch (err: any) {
    throw new Error(err)
  }
}

export const capturePaypalPayment = async (orderID: string) => {
  const paypalOrdersCaptureUrl = `${url}/v2/checkout/orders/${orderID}/capture`

  try {
    const accessToken = await generatePaypalAccessToken()
    const res = await axios.post(
      paypalOrdersCaptureUrl,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    return res.data
  } catch (err: any) {
    throw new Error(err)
  }
}

export const getPaypalOrderData = () => {
  const price = parseFloat(process.env.PRICE as string)
  const discount = parseFloat(process.env.DISCOUNT as string) // in percentage
  const tax = parseFloat(process.env.GST as string) // in percentage
  const currency = process.env.CURRENCY as string

  const itemDiscount = (price * discount) / 100
  const itemPrice = price - itemDiscount
  const itemTax = (itemPrice * tax) / 100
  const total = itemPrice + itemTax

  return {
    intent: "CAPTURE",
    purchase_units: [
      {
        items: [
          {
            name: "1 Year Subscription",
            description:
              "365 days of unlimited access to all our digital assets",
            quantity: "1",
            unit_amount: {
              currency_code: currency,
              value: price.toString(),
            },
          },
        ],
        amount: {
          currency_code: currency,
          value: total,
          breakdown: {
            /* discount: {
                currency_code: currency,
                value: itemDiscount.toString(),
              }, */
            item_total: {
              currency_code: currency,
              value: total.toString(),
            },
          },
        },
      },
    ],
    application_context: {
      brand_name: "iso201",
      shipping_preference: "NO_SHIPPING",
    },
  }
}
