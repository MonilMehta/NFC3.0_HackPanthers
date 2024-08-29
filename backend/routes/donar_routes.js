import express from "express"
import donar from '../controllers/donors/donar.js'
import donarDetails from "../controllers/donors/getDonarDetails.js";

const router = express.Router();

router.route("/donate").post(donar);
router.route("/getDonarDetails").get(donarDetails);

export default router;
