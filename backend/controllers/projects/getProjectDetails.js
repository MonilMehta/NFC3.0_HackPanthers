import Project from "../../models/Project_Schema.js";

const projectDetails = async (req, resp) => {
  try {
    // Find all projects and populate the teamMembers field
    let projects = await Project.find()
      .populate({
        path: 'teamMembers',
        select: '-__v', // Exclude the __v field if not needed
      });

    if (!projects || projects.length === 0) {
      return resp.status(404).json({ message: "No projects found" });
    }

    return resp.status(200).json({ projects });
  } catch (err) {
    console.log(err);
    return resp.status(500).json({ message: "Error occurred" });
  }
};

export default projectDetails;
