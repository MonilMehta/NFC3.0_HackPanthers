const Event = require("../../models/Event_schema"); // Import the Event model

module.exports = async (req, res) => {
  try {
    const { eventId, userId } = req.body; 

    const event = await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { participants: userId } }, 
      { new: true } 
    ).populate('participants'); 

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "User successfully added to event",
      event
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding user to event",
      error: error.message
    });
  }
};
