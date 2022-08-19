import express from "express"
import { captureSubscription, createSubscription } from "../controller/subscriptions"
// import { verifyAuthToken } from "../utils/jwt"

const router = express.Router()

router.post("/create", createSubscription)

router.post('/:subscriptionID/capture', captureSubscription)

export default router
