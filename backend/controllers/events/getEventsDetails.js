import Event from "../../models/Event_schema.js";

const eventDetails = async(req,resp) => {
    try{
          let events = await Event.find();
          if(!events)
          {
            return resp.status(404).json({message:"No event found"});
          }

          return resp.status(201).json({events});
    }
    catch(err)
    {
        console.log(err);
        return resp.status(401).json({ message: "Error occured" });        
    }
}

export default eventDetails