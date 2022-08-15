export default class Subscription {
  id: number
  userId: number
  invoiceId: number
  provider: string
  date: number
  price: number
  discount: number
  tax: number
  address: number

  constructor(
    id: number,
    userId: number,
    invoiceId: number,
    provider: string,
    date: number,
    price: number,
    discount: number,
    tax: number,
    address: number
  ) {
    this.id = id
    this.userId = userId
    this.invoiceId = invoiceId
    this.provider = provider
    this.date = date
    this.price = price
    this.discount = discount
    this.tax = tax
    this.address = address
  }

  async create() {}

  async read() {}

  async update() {}
}
