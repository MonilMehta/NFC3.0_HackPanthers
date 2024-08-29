import User from "../../models/User_schema.js";
import bcrypt from "bcryptjs";

const addStaff = async (req, res) => {
  try {
    // Create a new staff member
    if (!req.body.email || req.body.email.trim() == "") {
      return res.status(404).json({ message: "Not found." });
    }
    const getUser = await User.findOne({ email: req.body.email });
    if(getUser){
      getUser.role = "staff";
      await getUser.save();
      return res.status(200).json({ message: "User role updated to staff.", user: getUser });
    } else{
      const hashedPass = await bcrypt.hash("Pass@123", 10);
      const staffdata = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone_no: req.body.phone_no,
        role: "staff",
        date_of_birth: req.body.date_of_birth,
        password: hashedPass
      });
      return res.status(201).json({ message: "New staff member created.", user: staffdata });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in creating Staff member" });
  }
};

export default addStaff;
