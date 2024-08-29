import express from "express";
import addMember from "../controllers/projects/addMember.js";
import createProject from "../controllers/projects/createProject.js";
import deleteMember from "../controllers/projects/deleteMember.js";
import projectDetails from "../controllers/projects/getProjectDetails.js";

const router = express.Router();

router.route("/createProject").post(createProject);
router.route("/addMember").post(addMember);
router.route("/deleteMember").delete(deleteMember);
router.route("/getProjectDetails").get(projectDetails);

export default router;