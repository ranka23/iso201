import { pg } from "services"
import { insert, select } from "sql/common"

export default class PaypalPayments {
  invoiceid: string
  id?: string
  status?: string
  email?: string
  accountid?: string
  firstname?: string
  lastname?: string
  address?: string
  currency?: string
  gross?: number
  paypalfee?: number
  total?: number
  created?: string
  payer?: string

  constructor(
    invoiceid: string,
    id?: string,
    status?: string,
    email?: string,
    accountid?: string,
    firstname?: string,
    lastname?: string,
    address?: string,
    currency?: string,
    gross?: number,
    paypalfee?: number,
    total?: number,
    created?: string,
    payer?: string
  ) {
    this.id = id
    this.status = status
    this.email = email
    this.accountid = accountid
    this.firstname = firstname
    this.lastname = lastname
    this.address = address
    this.currency = currency
    this.gross = gross
    this.paypalfee = paypalfee
    this.total = total
    this.invoiceid = invoiceid
    this.created = created
    this.payer = payer
  }

  async create() {
    const query = insert("paypal_payments", [
      "id",
      "status",
      "email",
      "accountid",
      "firstname",
      "lastname",
      "address",
      "currency",
      "gross",
      "paypalfee",
      "total",
      "invoiceid",
      "created",
      "payer",
    ])
    const values = [
      this.id,
      this.status,
      this.email,
      this.accountid,
      this.firstname,
      this.lastname,
      this.address,
      this.currency,
      this.gross,
      this.paypalfee,
      this.total,
      this.invoiceid,
      this.create,
      this.payer,
    ]

    try {
      const {
        rows: [payment_status],
      } = await pg().query<PaypalPayments>(query, values)
      return payment_status
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async read(): Promise<PaypalPayments> {
    const query = select("paypal_payments", "invoiceid")
    const values = [this.invoiceid]
    try {
      const {
        rows: [paypal_payments],
      } = await pg().query(query, values)
      return paypal_payments
    } catch (err: any) {
      throw new Error(err)
    }
  }
}
