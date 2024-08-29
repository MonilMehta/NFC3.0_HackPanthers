const Staff = require("../../models/Staff_schema");
const Event = require("../../models/Event_schema");

module.exports = async (req, res) => {
  try {
    const { staffId, eventId } = req.body;

    // Find and delete the staff member
    const staff = await Staff.findByIdAndDelete(staffId);

    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    // Remove the staff member from the event
    const event = await Event.findByIdAndUpdate(
      eventId,
      { $pull: { staff: staffId } }, // Remove staff ID from the staff array
      { new: true }
    ).populate('staff'); 

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Staff member deleted and removed from event successfully",
      staff,
      event
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in deleting Staff member" });
  }
};
