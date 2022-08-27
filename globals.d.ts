type AssetType = "image" | "video" | "audio"

type PaymentProvider = "solana" | "paypal"

type CurrentPaymentStatus = "pending" | "completed" | "canceled"

interface RequestUser {
  id: number
  pro?: boolean
  email: string
}

interface GoogleUser {
  email: string
  email_verified: boolean
  name: string
  picture: string
}

interface PaypalAccessTokenResponse {
  access_token: string
}

interface PaypalOrderItem {
  name: string
  description?: string
  quantity?: string
  unit_amount: {
    currency_code: string
    value: string
  }
}

interface PaypalOrderData {
  intent: string
  purchase_units: [
    {
      invoice_id: invoiceID
      items: Array<PaypalOrderItem>
      amount: {
        currency_code: string
        value: string
        breakdown: {
          discount: {
            currency_code: string
            value: string
          }
          item_total: {
            currency_code: string
            value: string
          }
        }
      }
    }
  ]
  application_context: {
    brand_name: string
    shipping_preference: string
  }
}

type Handler = (req: NextApiRequest, res: NextApiResponse<Data>) => void

interface PaypalPayments {
  id: string
  status: string
  email: string
  accountid: string
  firstname: string
  lastname: string
  address: string
  currency: string
  gross: number
  paypalfee: number
  total: number
  invoiceid: string
  created: string
  payer: string
}

interface PaypalCaptureResponse {
  id: string
  status: string
  payment_source: {
    paypal: {
      email_address: string
      account_id: string
      name: { given_name: string; surname: string }
      address: { country_code: string }
    }
  }
  purchase_units: [
    {
      reference_id: string
      payments: {
        captures: [
          {
            id: string
            status: string
            amount: { currency_code: string; value: string }
            final_capture: boolean
            seller_protection: {
              status: string
              dispute_categories: Array<string>
            }
            seller_receivable_breakdown: {
              gross_amount: { currency_code: string; value: string }
              paypal_fee: { currency_code: string; value: string }
              net_amount: { currency_code: string; value: string }
            }
            invoice_id: string
            links: [
              {
                href: string
                rel: string
                method: string
              }
            ]
            create_time: string
            update_time: string
          }
        ]
      }
    }
  ]
  payer: {
    name: { given_name: string; surname: string }
    email_address: string
    payer_id: string
    address: { country_code: string }
  }
  links: [
    {
      href: string
      rel: string
      method: string
    }
  ]
}
