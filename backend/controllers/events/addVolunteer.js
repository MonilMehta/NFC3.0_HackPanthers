import Event from "../../models/Event_schema.js"; // Import the Event model
import User from "../../models/User_schema.js"; // Import the User model

const addVolunteer = async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    // Find the event and add the user as a volunteer
    const event = await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { volunteers: userId } }, // Adds userId to volunteers array if not already present
      { new: true } // Returns the updated event document
    ).populate('volunteers');

    // If the event is not found
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Find the user and increment their level by 2
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { level: 2 } }, // Increments the level by 2
      { new: true } // Returns the updated user document
    );

    // If the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the event details to the user's volunteeredEvents array
    user.volunteeredEvents.push({
      eventName: event.eventName,
      eventDate: event.date,
    });
    await user.save();

    // Successfully added the user as a volunteer, incremented their level, and updated volunteered events
    res.status(200).json({
      message: "User successfully added as a volunteer, level increased, and event details updated",
      event,
      user,
    });
  } catch (error) {
    // Handling errors
    res.status(500).json({
      message: "Error adding user as a volunteer",
      error: error.message,
    });
  }
};

export default addVolunteer;
