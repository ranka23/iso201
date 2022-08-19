import log from "../utils/logger"
import { createClient } from "redis"

const client = createClient()

client.on("connect", () => {
  log.debug(`Redis Client connected`)
})

client.on("ready", () => {
  log.debug("Redis Client ready to use..")
})

client.on("error", (err: any) => {
  log.error(err.message)
})

client.on("end", () => {
  log.debug("Redis Client disconnected")
})

process.on("SIGINT", () => {
  client.quit()
})

export default client
