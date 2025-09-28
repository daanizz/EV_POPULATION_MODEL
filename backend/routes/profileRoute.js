import { Router } from "express";
import {
    profileDetails,
    editProfile,
} from "../controller/profileController.js";
import { verifiedToken } from "../controller/JWTMiddleWare.js";

const router = Router();

router.get("/", verifiedToken, profileDetails);
router.put("/", verifiedToken, editProfile);

export default router;
