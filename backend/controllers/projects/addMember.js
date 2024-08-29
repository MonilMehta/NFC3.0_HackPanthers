const ProjectMember = require("../../models/Project_member_Schema");
const Project = require("../../models/Project_Schema");

module.exports = async (req, res) => {
  try {
    // Create a new project member
    const memberData = new ProjectMember({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone_no: req.body.phone_no,
      role: req.body.role,
      projectId: req.body.projectId,
    });

    // Save the new project member to the database
    let result = await memberData.save();

    // Find the project and update it to include the new member
    const project = await Project.findByIdAndUpdate(
      req.body.projectId,
      { $addToSet: { teamMembers: result._id } }, // Add the member ID to the project's teamMembers array
      { new: true } // Return the updated project
    ).populate('teamMembers'); // Populate the teamMembers field with full member details if needed

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Respond with the newly created member and updated project details
    res.status(201).json({
      message: "Project member created and added to the project successfully",
      member: result,
      project,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating project member", error: err.message });
  }
};
