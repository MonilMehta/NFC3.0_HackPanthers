import mongoose  from "mongoose";

// Define the schema for User
const staffSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_no: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    eventPartcicpatedId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }
});

// Create the model from the schema
const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
