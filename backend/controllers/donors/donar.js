import Donar from "../../models/Donar_Schema.js";
import User from "../../models/User_schema.js";

const donar = async (req, resp) => {
  try {
    // Create a new donation entry
    const donarData = new Donar({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      donarEmail: req.body.donarEmail,
      donarPhoneNo: req.body.donarPhoneNo,
      amount: req.body.amount,
      message: req.body.message,
      donationDate: req.body.donationDate
    });

    // Save the donation data
    const donarResult = await donarData.save();

    // Find the user by email
    const user = await User.findOne({ email: req.body.donarEmail });

    if (user) {
      // Update the amountDonated field for the user
      user.amountDonated += req.body.amount;
      
      // Increment the user's level by 3
      user.level += 3;

      // Save the updated user data
      await user.save();
    } else {
      // Handle the case where the user is not found
      console.log(`User with email ${req.body.donarEmail} not found`);
    }

    // Return the donation result
    return resp.status(201).json({ donarResult });
  } catch (err) {
    console.log(err);
    return resp.status(401).json({ message: "Error occurred" });
  }
};

export default donar;
