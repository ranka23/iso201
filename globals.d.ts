type AssetType = "image" | "video" | "audio" | "360"

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
  total: number
  orderDetails: {
    intent: string
    purchase_units: [
      {
        invoice_id: invoiceID
        items: Array<PaypalOrderItem>
        amount: {
          currency_code: string
          value: string
          breakdown: {
            discount?: {
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

interface CreateSolanaOrderResponse {
  qr: string
  invoiceID: string
}

interface CreatePaypalOrderResponse {
  id: string
  invoiceID: string
  amount: string
  currency: AvailableCurrencies
}

interface ErrorResponse {
  error: {
    code: string
    message: string
  }
}

interface SuccessResponse {
  success: boolean
}

type AvailableCurrencies =
  | "USD"
  | "AUD"
  | "CAD"
  | "CHF"
  | "DKK"
  | "EUR"
  | "GBP"
  | "JPY"
  | "NOK"
  | "NZD"
  | "SEK"
  | "SGD"
  | "THB"
  | "MXN"
  | "ILS"
  | "HKD"

interface VideoEntry {
  id?: number
  title?: string
  fname?: string
  type?: AssetType
  size?: number
  tags?: Array<string>
  mime?: string
  scale?: [number, number]
  duration?: number
  fps?: number
  bitrate?: number
  location?: string
}

interface ErrorRes {
  code: string
  message: string
}

interface ESKeyword {
  order: "asc" | "desc"
  fieldName: string
}

interface ESSort {
  keywords: Array<ESKeyword>
  from: number
  size: number
}

type VideoResolution = "480p" | "720p" | "1080p" | "original"

interface GetAssetReq {
  id?: number
  title?: string
  fname?: string
  type?: AssetType
  size?: string
  search?: string
  tags?: Array<string>
  mime?: string
  likes?: number
  views?: number
  scale?: [number, number]
  created?: string
  modified?: string
  fps?: number
  bitrate?: number
  rating?: number
  provide?: Array<string>
  operator?: "AND" | "OR"
  description?: string
  genre?: string
  album?: string
  comment?: string
  sort?: ESSort
}


type ListDataHits = {
  id: number
  thumbnail: string
  type: AssetType
  scale: [number, number]
  title: string
  poster?: string
  genre: string
  album: string
  duration?: number
}

interface ListData {
  total: number,
  hits: Array<ListDataHits>
}

interface PopulateFilters {
  premium?: boolean
  free?: boolean
  fps: Array<number>
  type: Array<AssetType>
  scale: Array<[number, number]>
  genre?: Array<string>
  album?: Array<string>
  duration?: number
  views: number
  location?: string
}

interface RadioButtonCallback {
  placeholder: string
  isChecked: boolean
  name: keyof PopulateFilters
}

interface PageProps {
  head?: {
    title: string,
    description: string
  },
  hero?: {
    image: string
    topHeader: string
    largeHeader: string
    description: string
  }
  list: {
    header: {
      title: string
      caption: string
    }
    data: ListData
    filters: PopulateFilters
  }
  filters?: {
    showFilters: boolean
    showFiltersInNav: boolean
  }
}
