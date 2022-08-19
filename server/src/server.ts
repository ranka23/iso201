import express from "express"
import "dotenv"
import { Client as ESClient } from "@elastic/elasticsearch"
import { Client as PGClient } from "pg"
import helmet from "helmet"
import cors from "cors"
import log from "./utils/logger"
import auth from "./routes/auth"
import assets from "./routes/assets"
import subscriptions from "./routes/subscriptions"

const port = process.env.PORT || 3000
const app = express()

// Basic Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// DB Connections
const elasticClient = new ESClient({ node: "http://localhost:9200" })
const postgresClient = new PGClient({
  user: "postgres",
  host: "localhost",
  database: "iso201",
  password: "postgres",
  port: 5432,
})

// 404 Middleware
/*

app.use((req, res, next) => {
  res.status(404)
  if (req.accepts("json") && ) {
    res.send({ error: "Sorry, request not found" })
  }
  next()
})

 */
postgresClient.connect((err) => {
  if (err) {
    log.debug("Postgres Connection Error: ", err)
  } else {
    // After postgres client successfully connects, we register the routes
    app.use("/api/v0/auth", auth)
    app.use("/api/v0/assets", assets)
    app.use("/api/v0/subscriptions", subscriptions)

    // Pass DB clients across all express routes and controllers for reuse
    app.locals.pg = postgresClient
    app.locals.es = elasticClient

    app.listen(port, () => log.debug(`Server listening on port ${port}...`))
  }
})
