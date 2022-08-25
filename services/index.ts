import { Pool } from "pg"
import { createClient, RedisClientType } from "redis"
import { Client } from "@elastic/elasticsearch"
import { establishConnection } from "./solana"

if (!global?.db) {
  global.db = {
    pg: null,
    es: null,
    redis: null,
    sol: null,
  }
}

if (!global?.db?.pg) {
  global.db.pg = null
}

if (!global?.db?.es) {
  global.db.es = null
}

if (!global.db.redis) {
  global.db.redis = null
}

if (!global.db.sol) {
  global.db.sol = null
}

export function pg() {
  if (!global.db.pg) {
    global.db.pg = new Pool({
      user: "postgres",
      host: "localhost",
      database: "iso201",
      password: "postgres",
      port: 5432,
    })
  }
  return global.db.pg
}

export function es() {
  if (!global.db.es) {
    global.db.es = new Client({ node: "http://localhost:9200" })
  }
  return global.db.es
}

export function redis() {
  if (!global.db.redis) {
    const client: RedisClientType = createClient()
    client.connect()
    global.db.redis = client
  }
  return global.db.redis
}

export function sol() {
  if (!global.db.sol) {
    global.db.sol = establishConnection()
  }
  return global.db.sol
}
