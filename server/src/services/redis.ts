import log from "../utils/logger"
import { createClient } from "redis"

const client = createClient()

client.connect()

client.on("connect", () => {
  log.info(`Redis Client connected`)
})

client.on("ready", () => {
  log.info("Redis Client ready to use..")
})

client.on("error", (err: any) => {
  log.error(err.message)
})

client.on("end", () => {
  log.info("Redis Client disconnected")
})

process.on("SIGINT", () => {
  client.quit()
})

export default client
