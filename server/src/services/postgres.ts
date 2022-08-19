import { Client } from "pg"
import log from "../utils/logger"

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "iso201",
  password: "postgres",
  port: 5432,
})

client.connect((err) => {
  if (err) {
    log.error("Postgres Connection Error: ", err)
  } else {
    log.info("Postgres Client connected")
  }
})

export default client
