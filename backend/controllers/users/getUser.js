// Import the User model
import User from "../../models/User_schema.js";

const getUser = async (req, res) => {
  try {
    // Get email from route parameters (e.g., /user/:email)
    const email = req.params.email;

    // Validate email
    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "Email is required." });
    }

    // Find the user by email
    const user = await User.findOne({ email: email.trim() }).select('-password'); // Exclude the password field if present

    // If the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return the found user
    return res.status(200).json(user);
  } catch (error) {
    // Handling errors
    return res.status(500).json({
      message: "An error occurred while retrieving the user.",
      error: error.message,
    });
  }
};

export default getUser;
