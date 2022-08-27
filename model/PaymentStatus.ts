import { Pool } from "pg"
import { insert, select } from "sql/common"
import { update } from "sql/common"
import { pg } from "services"

export default class PaymentStatus {
  id?: string
  userid?: number
  provider?: PaymentProvider
  token?: string
  status?: CurrentPaymentStatus
  created?: string
  modified?: string

  constructor(
    id?: string,
    status?: CurrentPaymentStatus,
    userid?: number,
    provider?: PaymentProvider,
    token?: string,
    created?: string,
    modified?: string
  ) {
    this.id = id
    this.userid = userid
    this.provider = provider
    this.token = token
    this.status = status
    this.created = created
    this.modified = modified
  }

  async create(): Promise<PaymentStatus> {
    const query = insert("payment_status", [
      "id",
      "userid",
      "provider",
      "token",
      "status",
    ])
    const values = [
      this.id,
      this.userid,
      this.provider,
      this.token,
      this.status,
    ]
    try {
      const {
        rows: [payment_status],
      } = await pg().query<PaymentStatus>(query, values)
      return payment_status
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async read(from: string = "id"): Promise<PaymentStatus> {
    const query = select("payment_status", from)
    const value = [from === "id" ? this.id : this.token]
    try {
      const {
        rows: [payment_status],
      } = await pg().query(query, value)
      return payment_status
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async update(): Promise<PaymentStatus> {
    const query = update("payment_status", ["status"], "id")
    const value = [this.status, this.id]
    try {
      const {
        rows: [payment_status],
      } = await pg().query(query, value)
      return payment_status
    } catch (err: any) {
      throw new Error(err)
    }
  }
}
