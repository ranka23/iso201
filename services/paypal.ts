import axios from "axios"
import log from "../utils/logger"
import dayjs from "dayjs"

const url = process.env.PAYPAL_URL as string
const clientID = process.env.PAYPAL_CLIENT_ID as string
const secret = process.env.PAYPAL_SECRET as string

const getCachedToken = () => {
  if (!global?.paypalToken?.token || !global?.paypalToken?.expiry) {
    return
  }
  const isValid = dayjs(dayjs(global.paypalToken.expiry)).diff(dayjs()) > 1000
  if (isValid) {
    const token = global.paypalToken.token
    return token
  }
  return
}

const generatePaypalAccessToken = async () => {
  const paypalAuthTokenUrl = `${url}/v1/oauth2/token`
  try {
    const token = getCachedToken()
    if (token) {
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
    const { access_token, expires_in } = res.data

    // Cache paypal access token
    global.paypalToken = {
      token: access_token,
      expiry: expires_in,
    }
    return access_token
  } catch (error: any) {
    log.error("Failed to fetch Paypal Oauth", error)
    throw new Error(error.message)
  }
}

export const createOrder = async (orderData: PaypalOrderData) => {
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

export const capturePayment = async (orderID: string) => {
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

export const getPaypalOrderData = (currency: string) => {
  return {
    intent: "CAPTURE",
    purchase_units: [
      {
        items: [
          {
            name: "One Year Subscription",
            description:
              "365 days of unlimited access to all our digital assets",
            quantity: "1",
            unit_amount: {
              currency_code: currency,
              value: "60.00",
            },
          },
        ],
        amount: {
          currency_code: currency,
          value: "30.00",
          breakdown: {
            discount: {
              currency_code: currency,
              value: "30.00",
            },
            item_total: {
              currency_code: currency,
              value: "60.00",
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
