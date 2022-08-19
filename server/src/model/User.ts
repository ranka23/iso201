import { Client as PGClient } from "pg"
import log from "../utils/logger"

export default class User {
  id?: number
  email?: string
  name?: string
  pro?: boolean
  img?: string
  created?: number
  likes?: Array<string>
  views?: Array<string>
  downloads?: Array<string>
  updated?: number
  deleted?: number

  constructor(
    id?: number,
    email?: string,
    name?: string,
    pro?: boolean,
    img?: string,
    created?: number,
    likes?: Array<string>,
    views?: Array<string>,
    downloads?: Array<string>,
    updated?: number,
    deleted?: number
  ) {
    this.id = id
    this.email = email
    this.name = name
    this.pro = pro
    this.created = created
    this.img = img
    this.likes = likes
    this.views = views
    this.downloads = downloads
    this.updated = updated
    this.deleted = deleted
  }

  async create(pg: PGClient): Promise<User> {
    const user = await this.readBasicInfo(pg)
    if (user) {
      return user
    } else {
      try {
        const query = `INSERT INTO users (email, name, img)
        VALUES ($1, $2, $3) RETURNING *`

        const values = [this.email, this.name, this.img]

        const {
          rows: [user],
        } = await pg.query<User>(query, values)
        return user
      } catch (err: any) {
        log.debug("Error creating user")
        throw new Error(err)
      }
    }
  }

  async readBasicInfo(pg: PGClient): Promise<User> {
    const value = this?.id ? this.id : this.email
    const column = this?.id ? "id" : "email"
    const selectQuery = `SELECT * FROM users WHERE ${column} = $1`
    const selectValues = [value]
    try {
      const {
        rows: [user],
      } = await pg.query(selectQuery, selectValues)
      return user
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async update() {}

  async delete() {}
}
