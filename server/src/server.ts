import express from "express"
import "dotenv"
import helmet from "helmet"
import cors from "cors"
import log from "./utils/logger"
import auth from "./routes/auth"
import assets from "./routes/assets"
import subscriptions from "./routes/subscriptions"
import { esClient, pgClient, redisClient } from "./services"

const port = process.env.PORT || 3000
const app = express()

// Basic Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

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

// Start the server after all the services have started
pgClient
  .query(
    "SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('iso201')"
  )
  .then((value) => {
    const {
      rows: [datname],
    } = value
    const { datname: dbName } = datname
    if (dbName === "iso201") {
      // After postgres client successfully connects, we register the routes
      app.use("/api/v0/auth", auth)
      app.use("/api/v0/assets", assets)
      app.use("/api/v0/subscriptions", subscriptions)

      // Pass DB clients across all express routes and controllers for reuse
      app.locals.pg = pgClient
      app.locals.es = esClient
      app.locals.redis = redisClient

      app.listen(port, () => log.debug(`Server listening on port ${port}...`))
    }
  })
  .catch((error) => console.log("Postgres iso201 DB error: ", error))
