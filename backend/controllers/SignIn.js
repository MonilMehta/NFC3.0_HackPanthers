import User from "../models/User_schema.js";
import bcrypt from "bcryptjs";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    return "error";
  }
};

const signIn = async (req, resp) => {
  try {
    if (!req.body?.email || !req.body?.password) {
      return resp.status(400).json({ message: "Email and Password is required" });
    }
    let existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      return resp.status(400).json({ message: "User does not exist" });
    }
    // let existingUserPhone = await User.findOne({phone_no:req.body.phone_no});
    // if(!existingUserPhone)
    // {
    //     return resp.status(201).json({message:"Invalid phone no"})
    // }
    const passMatch = await bcrypt.compare(
      req.body.password,
      existingUser?.password || ""
    );
    if (!passMatch) {
      return resp.status(400).json({ message: "Invalid password" });
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      existingUser._id
    );
    const loggedInUser = await User.findById(existingUser._id).select(
      "-password -refreshToken"
    );
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 365 * 24 * 60 * 60 * 1000,
    };
    return resp
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .cookie("role", existingUser?.role, options)
      .json({
        user: loggedInUser,
        accessToken,
        refreshToken,
        message: "Sign In succsefully",
      });
  } catch (err) {
    console.log(err);
    resp.status(500).json({ message: "Internal server Error" });
  }
};
export default signIn;
