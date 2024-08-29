import Donar from "../../models/Donar_Schema.js";

const donarDetails = async(req,resp) => {
    try{
         
          let donars = await Donar.find();
          if(!donars)
          {
            return resp.status(404).json({message:"No donars found"});
          }

          return resp.status(201).json({donars});
    }
    catch(err)
    {
        console.log(err);
        return resp.status(401).json({ message: "Error occured" });        
    }
}

export default donarDetails