import { pg } from "services"
import { insert, select } from "sql/common"

export default class User {
  id?: number
  email?: string
  name?: string
  pro?: boolean
  created?: number
  likes?: Array<string>
  views?: Array<string>
  downloads?: Array<string>
  modified?: number
  deleted?: number

  constructor(
    id?: number,
    email?: string,
    name?: string,
    pro?: boolean,
    created?: number,
    likes?: Array<string>,
    views?: Array<string>,
    downloads?: Array<string>,
    modified?: number,
    deleted?: number
  ) {
    this.id = id
    this.email = email
    this.name = name
    this.pro = pro
    this.created = created
    this.likes = likes
    this.views = views
    this.downloads = downloads
    this.modified = modified
    this.deleted = deleted
  }

  async create(): Promise<User> {
    const user = await this.readBasicInfo()
    if (user) {
      return user
    } else {
      try {
        const query = insert("users", ["email", "name"])
        const values = [this.email, this.name]
        const {
          rows: [user],
        } = await pg().query<User>(query, values)
        return user
      } catch (err: any) {
        throw new Error(err)
      }
    }
  }

  async readBasicInfo(): Promise<User> {
    const value = this?.id ? this.id : this.email
    const column = this?.id ? "id" : "email"
    const selectQuery = select("users", column)
    const selectValues = [value]
    try {
      const {
        rows: [user],
      } = await pg().query(selectQuery, selectValues)
      return user
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async update() {}

  async delete() {}
}
