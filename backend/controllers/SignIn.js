import User from "../models/User_schema.js";
import bcrypt from "bcryptjs";

const signIn = async(req,resp)=>{
    try
    {
        let existingUserEmail = await User.findOne({email:req.body.email});
        if(!existingUserEmail)
        {
            return resp.status(201).json({message:"Invalid email"})
        }
        let existingUserPhone = await User.findOne({phone_no:req.body.phone_no});
        if(!existingUserPhone)
        {
            return resp.status(201).json({message:"Invalid phone no"})
        }
        const passMatch = await bcrypt.compare(req.body.password, existingUser.password||'');
        if(!passMatch)
        {
            return resp.status(201).json({ message: "Invalid password" });  
        }
        return resp.status(201).json({ message: "Sign In succsefully" });      
    }
    catch(err)
    {
        console.log(err);
        resp.status(401).json({ message:"Internal server Error" });
    }
} 
export default signIn;