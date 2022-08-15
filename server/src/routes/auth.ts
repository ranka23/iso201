import express from 'express'
import { login } from '../controller/auth'

const router = express.Router()

router.get("/login", login)

export default router
