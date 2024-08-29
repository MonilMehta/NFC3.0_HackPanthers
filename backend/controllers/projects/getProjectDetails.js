import Project from "../../models/Project_Schema.js";

const projectDetails = async(req,resp) => {
    try{         
          let projects = await Project.find();
          if(!projects)
          {
            return resp.status(404).json({message:"No projects found"});
          }

          return resp.status(201).json({projects});
    }
    catch(err)
    {
        console.log(err);
        return resp.status(401).json({ message: "Error occured" });        
    }
}

export default projectDetails