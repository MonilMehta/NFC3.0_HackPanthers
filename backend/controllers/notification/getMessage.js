import Message from "../../models/message_schema.js";
const getMessage = async (req,resp) =>{
    try{     
        let message = await Message.find();
        if(!message)
        {
          return resp.status(404).json({message:"No message found"});
        }

        return resp.status(201).json({message});
  }
  catch(err)
  {
      console.log(err);
      return resp.status(401).json({ message: "Error occured" });        
  }
}

export default getMessage