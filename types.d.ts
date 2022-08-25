import { Pool } from "pg"
import { Client as ESClient } from "@elastic/elasticsearch"
import { RedisClientType } from "redis"
import {
  Connection,
} from "@solana/web3.js"

declare module "next" {
  export interface NextApiRequest extends IncomingMessage {
    user: RequestUser
  }
}

declare global {
  var db: {
    pg: Pool | null
    es: ESClient | null
    redis: RedisClientType | null
    sol: Connection | null
  }
  var paypalToken: {
    token: string
    expiry: string
  }
}

interface RequestUser {
  id: number
  pro?: boolean
  email: string
}
