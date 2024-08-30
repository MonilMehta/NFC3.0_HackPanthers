import express from "express";
import sendMessage from "../controllers/notification/sendMessage.js"
import getMessage from "../controllers/notification/getMessage.js";

const router = express.Router();

router.route("/sendMessage").post(sendMessage);
router.route("/getMessage").get(getMessage);

export default router;


