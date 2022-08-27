import { IS_DISCOUNT, IS_TAX } from "constants/"
import { select, insert, update } from "sql/common"
import User from "./User"
import { pg } from "../services"
import { createPaypalPaymentsEntry } from "../utils/createPaypalPaymentsEntry"

export default class Subscription {
  id?: number
  invoiceid: string
  userid: number
  provider: PaymentProvider
  price: number
  total: number
  discount?: number
  tax?: number
  address?: number
  date?: number
  modified?: string

  constructor(
    userid: number,
    invoiceid: string,
    provider: PaymentProvider,
    price: number,
    total: number,
    discount?: number,
    tax?: number,
    address?: number,
    date?: number,
    modified?: string
  ) {
    this.userid = userid
    this.invoiceid = invoiceid
    this.provider = provider
    this.date = date
    this.price = price
    this.discount = discount
    this.total = total
    this.tax = tax
    this.address = address
    this.modified = modified
  }

  async create(paypalValues?: Array<string | number>) {
    const queryItems = ["invoiceid", "userid", "provider", "price", "total"]
    const createSubscriptionValues = [
      this.invoiceid,
      this.userid,
      this.provider,
      this.price,
      this.total,
    ]

    if (IS_DISCOUNT) {
      queryItems.push("discount")
      createSubscriptionValues.push(this.discount as number)
    }
    if (IS_TAX) {
      queryItems.push("tax")
      createSubscriptionValues.push(this.tax as number)
    }
    if (this.address) {
      queryItems.push("address")
      createSubscriptionValues.push(this.address)
    }
    const createSubscriptionQuery = insert("subscriptions", queryItems)
    const updateUsersQuery = update("users", ["pro"], "id", "email")
    const updateUsersValues = [true, this.userid]
    const updatePaymentStatusQuery = update("payment_status", ["status"], "id")
    const updatePaymentStatusValues = ["completed", this.invoiceid]

    const client = await pg().connect()

    try {
      // Start the transaction
      await client.query("BEGIN")
      // Add entry to Subscription
      await client.query<Subscription>(
        createSubscriptionQuery,
        createSubscriptionValues
      )
      // if it's paypal payment add entry to paypal_payments table
      if (paypalValues) {
        await createPaypalPaymentsEntry(client, paypalValues)
      }
      // Update payment_status table column "status" to 'complete'
      await client.query<User>(
        updatePaymentStatusQuery,
        updatePaymentStatusValues
      )
      // Update users table column "pro" to true
      const { rows } = await client.query(updateUsersQuery, updateUsersValues)
      // Commit the transaction if everything is successful
      await client.query("COMMIT")
      // Return user's email to confirm the transaction succeeded
      return rows[0].email
    } catch (err: any) {
      // Rollback all changes if there was error in any of the entries
      await client.query("ROLLBACK")
      throw new Error(err)
    } finally {
      // Release the client after the transaction completes
      client.release()
    }
  }

  async read() {
    const query = select("subscriptions", "userid")
    const values = [this.userid]
    try {
      const {
        rows: [subscriptions],
      } = await pg().query<Subscription>(query, values)
      return subscriptions
    } catch (err: any) {
      throw new Error(err)
    }
  }

  static async readWithId(userId: number) {
    const query = select("subscriptions", "userid")
    const values = [userId]
    try {
      const {
        rows: [subscriptions],
      } = await pg().query<Subscription>(query, values)
      return subscriptions
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async update() {}
}
