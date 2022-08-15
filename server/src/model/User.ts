import { Client as PGClient } from "pg"

export default class User {
  id: number
  email: string
  name: string
  isPro: boolean
  img: string
  createdAt: number
  likes?: Array<string>
  views?: Array<string>
  downloads?: Array<string>
  updatedAt?: number
  deletedAt?: number

  constructor(
    id: number,
    email: string,
    name: string,
    isPro: boolean,
    img: string,
    createdAt: number,
    likes?: Array<string>,
    views?: Array<string>,
    downloads?: Array<string>,
    updatedAt?: number,
    deletedAt?: number
  ) {
    this.id = id
    this.email = email
    this.name = name
    this.isPro = isPro
    this.createdAt = createdAt
    this.img = img
    this.likes = likes
    this.views = views
    this.downloads = downloads
    this.updatedAt = updatedAt
    this.deletedAt = deletedAt
  }

  async create(pg: PGClient) {
    const query = `INSERT INTO users (email, name, is_pro, img, created_at)
    VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO NOTHING RETURNING *`

    const values = [this.email, this.name, this.isPro, this.img, this.createdAt]
    try {
      const {
        rows: [user],
      } = await pg.query<User>(query, values)
      return user
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async read() {}

  async update() {}

  async delete() {}
}


`
CREATE TABLE accounts (
	id serial PRIMARY KEY,
	email VARCHAR ( 50 ) UNIQUE NOT NULL,
	name VARCHAR ( 50 ) NOT NULL,
	is_pro VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
  img STRING,
  likes INTEGER [],
  views INTEGER [],
  downloads INTEGER [],
  updated_on TIMESTAMP,
  deleted_on TIMESTAMP
);
`