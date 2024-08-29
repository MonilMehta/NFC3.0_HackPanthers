import User from "../../models/User_schema.js";

const getUser = async (req, resp) => {
    try {
        const email = req.params.email; // Get email from query parameters

        if (!email || email.trim() === "") {
            return resp.status(404).json({ message: "Not found." });
        }

        const getUser = await User.findOne({ email: email.trim() });

        if (!getUser) {
            return resp.status(404).json({ message: "User not found." });
        }

        return resp.status(200).json(getUser);
    } catch (error) {
        return resp.status(500).json({ message: "An error occurred while retrieving user.", error });
    }
}

export default getUser;
