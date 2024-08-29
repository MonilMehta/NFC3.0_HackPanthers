import User from "../models/User_schema.js";
import bcrypt from "bcryptjs";
import sendSMS from "./sendSMS.js";

const signUp = async (req, resp) => {
  try {
    if (
      [
        req.body?.firstName,
        req.body?.lastName,
        req.body?.email,
        req.body?.phone_no,
        req.body?.date_of_birth,
        req.body?.password,
      ].some((field) => typeof field !== 'string' || field.trim() === "")
    ) {
      return resp.status(400).json({ message: "All fields are required" });
    }

    console.log("2");
    const existingUser = await User.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return resp
        .status(409)
        .json({ message: "User already exists! Sign in instead." });
    }

    // Hash the password
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const userdata = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone_no: req.body.phone_no,
      date_of_birth: req.body.date_of_birth,
      password: hashedPass,
    });

    // // Generate a JWT token
    // const token = jwt.sign({ email: result.email }, secretKey, {
    //   expiresIn: "1h",
    // });

    // console.log("Generated Token: ", token);
    // console.log(result);

    // Send SMS
    // await sendSMS(userdata.firstName, userdata.lastName, userdata.phone_no);

    const createdUser = await User.findById(userdata?._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering");
    }

    return resp.status(201).json({ createdUser });
  } catch (err) {
    console.log(err);
    return resp.status(401).json({ message: "Error in creating User" });
  }
};

export default signUp;
