import { Router } from "express";
import { authenticate,createAc } from "../controller/loginController.js";

const router=Router()

router.post("/authenticate",authenticate);
router.post("/createAc",createAc);

export default router
