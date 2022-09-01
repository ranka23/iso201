import axios from "axios"
import log from "utils/logger"
import dayjs from "dayjs"
import getSubscriptionAmount from "../utils/getSubscriptionAmount"
import currencyJS from "currency.js"

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

export const createOrder = async (
  orderData: PaypalOrderData["orderDetails"]
) => {
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
    log.error("CREATE ORDER ERROR: ", err)
    throw new Error(err)
  }
}

export const capturePayment = async (
  orderID: string
): Promise<PaypalCaptureResponse> => {
  const paypalOrdersCaptureUrl = `${url}/v2/checkout/orders/${orderID}/capture`

  try {
    const accessToken = await generatePaypalAccessToken()
    const res = await axios.post<PaypalCaptureResponse>(
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

export const getPaypalOrderData = (
  invoiceID: string,
  currency: AvailableCurrencies = "USD",
  conversionRate: number = 1
): PaypalOrderData => {
  const { basePrice, discount, processingFee, total, grossTotal } =
    convertCurrency(currency, conversionRate)
  const orderDetails: PaypalOrderData["orderDetails"] = {
    intent: "CAPTURE",
    purchase_units: [
      {
        invoice_id: invoiceID,
        items: [
          {
            name: "One year Subscription",
            description: "365 days of unlimited access to iso201",
            quantity: "1",
            unit_amount: {
              currency_code: currency,
              value: basePrice,
            },
          },
          {
            name: "Processing Fee",
            quantity: "1",
            unit_amount: {
              currency_code: currency,
              value: processingFee,
            },
          },
        ],
        amount: {
          currency_code: currency,
          value: total,
          breakdown: {
            item_total: {
              currency_code: currency,
              value: grossTotal,
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

  if (discount) {
    orderDetails.purchase_units[0].amount.breakdown.discount = {
      currency_code: currency,
      value: discount,
    }
  }

  return {
    orderDetails,
    total: parseFloat(total),
  }
}

const convertCurrency = (
  currency: AvailableCurrencies = "USD",
  conversionRate: number = 1
) => {
  const { basePrice, discount, processingFee } = getSubscriptionAmount(true)

  if (currency === "USD") {
    return {
      basePrice: basePrice?.toFixed(2),
      discount: discount?.toFixed(2) || "0.00",
      processingFee: processingFee?.toFixed(2) || "0.00",
      total: ((basePrice + processingFee! || 0) - discount! || 0).toFixed(2),
      grossTotal: (basePrice + processingFee! || 0).toFixed(2),
    }
  }

  let base: currencyJS,
    dis: currencyJS,
    processing: currencyJS,
    total: currencyJS

  base = currencyJS(basePrice, {
    precision: 2,
  }).multiply(conversionRate)
  dis = currencyJS(discount ? discount : 0, {
    precision: 2,
  }).multiply(conversionRate)
  processing = currencyJS(processingFee ? processingFee : 0, {
    precision: 2,
  }).multiply(conversionRate)
  total = base.add(processing).subtract(dis)

  return {
    basePrice: base?.value.toFixed(2),
    discount: dis?.value.toFixed(2) || "0.00",
    processingFee: processing?.value.toFixed(2),
    total: total?.value.toFixed(2),
    grossTotal: base.add(processing)?.value.toFixed(2),
  }
}
