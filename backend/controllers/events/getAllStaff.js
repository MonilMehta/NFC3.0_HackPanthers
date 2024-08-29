import User from "../../models/User_schema.js";

const getStaff = async (req, resp) => {
    try{
        const staffUsers = await User.find({ role: 'staff' });
        return resp.status(200).json(staffUsers);
    } catch(error) {
        return resp.status(500).json({ message: "An error occurred while retrieving staff users.", error });
    }
}

export default getStaff;