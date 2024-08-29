const Event = require("../../models/Event_schema");

module.exports = async (req, res) => {
  try {
    const { eventId, userId } = req.body; 

    const event = await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { volunteers: userId } }, 
      { new: true } 
    ).populate('volunteers'); 

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Volunteer successfully added to event",
      event
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding user to event",
      error: error.message
    });
  }
};
