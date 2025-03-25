import { Router } from "express";
import { generateNewShortUrl,
    HealthCheck,
    getClickAnalytics
 } from "../controllers/url.controller.js"

const router = Router()

router.post("/", generateNewShortUrl)
router.get("/ok",HealthCheck)
router.get("/analytics/:shortID",getClickAnalytics)

export default router