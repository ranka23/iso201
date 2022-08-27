import { PoolClient } from "pg"
import { insert } from "sql/common"

export const createPaypalPaymentsEntry = (
  client: PoolClient,
  values: Array<string | number>
) => {
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

  return client.query(query, values)
}

export const extractPaypalPaymentsValue = (d: PaypalCaptureResponse) => {
  return [
    d.id,
    d.status,
    d.payment_source.paypal.email_address,
    d.payment_source.paypal.account_id,
    d.payment_source.paypal.name.given_name,
    d.payment_source.paypal.name.surname,
    JSON.stringify(d.payment_source.paypal.address),
    d.purchase_units[0].payments.captures[0].amount.currency_code,
    parseFloat(
      d.purchase_units[0].payments.captures[0].seller_receivable_breakdown
        .gross_amount.value
    ),
    parseFloat(
      d.purchase_units[0].payments.captures[0].seller_receivable_breakdown
        .paypal_fee.value
    ),
    parseFloat(
      d.purchase_units[0].payments.captures[0].seller_receivable_breakdown
        .net_amount.value
    ),
    d.purchase_units[0].payments.captures[0].invoice_id,
    d.purchase_units[0].payments.captures[0].create_time,
    JSON.stringify(d.payer),
  ]
}
