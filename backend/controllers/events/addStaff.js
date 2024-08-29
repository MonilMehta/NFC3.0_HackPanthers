const Staff = require("../../models/Staff_schema");
const Event = require("../../models/Event_schema");

module.exports = async (req, res) => {
  try {
    // Create a new staff member
    const staffdata = new Staff({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone_no: req.body.phone_no,
      role: req.body.role,
      eventPartcicpatedId: req.body.eventPartcicpatedId
    });

    let staffResult = await staffdata.save();

    const event = await Event.findByIdAndUpdate(
      req.body.eventPartcicpatedId,  
      { $addToSet: { staff: staffResult._id } }, 
      { new: true } 
    ).populate('staff'); 

    

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(201).json({
      message: "Staff member created and added to event successfully",
      staff: staffResult,
      event
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in creating Staff member" });
  }
};
