import express from "express";
import createEvent from '../controllers/events/createEvent.js';
import addVolunteer from '../controllers/events/addVolunteer.js';
import addStaff from '../controllers/events/addStaff.js';
import deleteStaff from "../controllers/events/deleteStaff.js";
import eventDetails from "../controllers/events/getEventsDetails.js";

const router = express.Router();

router.route("/createEvent").post(createEvent);
router.route("/addVolunteer").post(addVolunteer);
router.route("/addStaff").post(addStaff);
router.route("/deleteStaff").delete(deleteStaff);
router.route("/getEventsDetails").get(eventDetails);

export default router;

