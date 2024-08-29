import Event from "../../models/Event_schema.js";

const eventDetails = async (req, resp) => {
  try {
    // Find all events and populate the participants, volunteers, and staff fields
    let events = await Event.find()
      .populate({
        path: 'volunteers',
        select: '-__v', // Exclude the __v field if not needed
      })
      .populate({
        path: 'staff',
        select: '-__v', // Exclude the __v field if not needed
      });

    if (!events || events.length === 0) {
      return resp.status(404).json({ message: "No event found" });
    }

    return resp.status(200).json({ events });
  } catch (err) {
    console.log(err);
    return resp.status(500).json({ message: "Error occurred" });
  }
};

export default eventDetails;
