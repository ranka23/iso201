import { Router } from "express";
import { login } from "./controller/auth";
const router = Router();

router.get('/', login)

export default router;