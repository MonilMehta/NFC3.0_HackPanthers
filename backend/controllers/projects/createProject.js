import Project from "../../models/Project_Schema.js";

const createProject = async (req, res) => {
  try {
    // Create a new project with the provided details
    const projectData = new Project({
      projectName: req.body.projectName,
      description: req.body.description,
      objectives: req.body.objectives,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      budget: {
        allocated: req.body.budget.allocated || 0,
        spent: req.body.budget.spent || 0,
      },
      status: req.body.status || 'Planning', // Default status to 'Planning' if not provided
    });

    // Save the new project to the database
    let result = await projectData.save();

    // Respond with the newly created project details
    res.status(201).json({
      message: "Project created successfully",
      project: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error creating project",
      error: err.message,
    });
  }
};

export default createProject