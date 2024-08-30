import Event from "../../models/Event_schema.js";

const getEvent = async (req, resp) => {
    try {
        const eventId = req.params.eventId; // Get email from query parameters

        if (!eventId || eventId.trim() === "") {
            return resp.status(404).json({ message: "Not found." });
        }

        const getEvent = await Event.findOne({ _id: eventId.trim() });

        if (!getEvent) {
            return resp.status(404).json({ message: "Event not found." });
        }

        return resp.status(200).json(getEvent);
    } catch (error) {
        return resp.status(500).json({ message: "An error occurred while retrieving event.", error });
    }
}

export default getEvent;
