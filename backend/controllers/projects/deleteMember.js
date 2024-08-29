// controllers/deleteProjectMember.js

import Project from "../../models/Project_Schema.js";

const deleteMember = async (req, res) => {
  try {
    const { memberId, projectId } = req.body;

    // Find and delete the project member
    const member = await ProjectMember.findByIdAndDelete(memberId);

    if (!member) {
      return res.status(404).json({ message: "Project member not found" });
    }

    // Remove the member from the project
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $pull: { teamMembers: memberId } }, // Remove member ID from the teamMembers array
      { new: true }
    ).populate('teamMembers'); // Populate the teamMembers for response clarity

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project member deleted and removed from project successfully",
      member,
      project
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in deleting project member" });
  }
};

export default deleteMember