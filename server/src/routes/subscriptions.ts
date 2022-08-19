import express from "express"
import { capturePaypalSubscription, createPaypalSubscription } from "../controller/subscriptions"
// import { verifyAuthToken } from "../utils/jwt"

const router = express.Router()

router.post("/paypal/create", createPaypalSubscription)

router.post('/paypal/:subscriptionID/capture', capturePaypalSubscription)

export default router
