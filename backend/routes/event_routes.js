import express from "express";
import createEvent from '../controllers/events/createEvent.js';
import addParticipants from '../controllers/events/addParticipates.js';
import addVolunteer from '../controllers/events/addVolunteer.js';
import addStaff from '../controllers/events/addStaff.js';
import deleteStaff from "../controllers/events/deleteStaff.js";
import eventDetails from "../controllers/events/getEventsDetails.js";
import getStaff from "../controllers/events/getAllStaff.js";

const router = express.Router();

router.route("/createEvent").post(createEvent);
router.route("/addParticipates").post(addParticipants);
router.route("/addVolunteer").post(addVolunteer);
router.route("/addStaff").post(addStaff);
router.route("/deleteStaff").delete(deleteStaff);
router.route("/getEventsDetails").get(eventDetails);
router.route("/getStaff").get(getStaff);

export default router;