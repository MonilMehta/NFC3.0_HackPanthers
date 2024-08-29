const User = require("../models/User_schema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendSMS = require("./sendSMS");

const secretKey = "123#secret";

module.exports = async (req, resp) => {
  try {
    // Check if a user with the same first name and last name exists
    const existingUser = await User.findOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });

    if (existingUser) {
      return resp.status(201).json({ message: "User already exists! Sign in instead." });
    }

    // Hash the password
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const userdata = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone_no: req.body.phone_no,
      date_of_birth: req.body.date_of_birth,
      password: hashedPass
    });

    // Save the new user
    let result = await userdata.save();

    // Generate a JWT token
    const token = jwt.sign(
      { email: result.email },
      secretKey,
      { expiresIn: '1h' }
    );

    console.log("Generated Token: ", token);
    console.log(result);

    // Send SMS
    await sendSMS(userdata.firstName,userdata.lastName,userdata.phone_no);

    return resp.status(201).json({ token });
  } catch (err) {
    console.log(err);
    return resp.status(401).json({ message: "Error in creating User" });
  }
};
