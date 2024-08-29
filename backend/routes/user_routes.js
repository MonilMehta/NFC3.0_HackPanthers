import express from "express";
import signIn from "../controllers/SignIn.js";
import signUp from "../controllers/SignUp.js";

const router = express.Router();

router.route("/signIn").post(signIn);
router.route("/signUp").post(signUp);

export default router;