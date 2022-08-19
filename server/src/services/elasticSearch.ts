import { Client } from "@elastic/elasticsearch"
import log from "../utils/logger"

const client = new Client({ node: "http://localhost:9200" })

client.info().then(() => log.info("Elastic Client active"))

export default client