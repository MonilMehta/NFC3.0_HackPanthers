import express from "express";
import signIn from "../controllers/SignIn.js";
import signUp from "../controllers/SignUp.js";
import getUser from "../controllers/users/getUser.js";

const router = express.Router();

router.route("/signIn").post(signIn);
router.route("/signUp").post(signUp);
router.route("/getUser/:email").get(getUser);

export default router;