import mongoose  from "mongoose";

// Define the schema for User
const userSchema = new mongoose.Schema({
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
    date_of_birth: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['normalUser','admin'],
        default: 'normalUser',
    },
    amountDonated: {
        type: Number,
        default: 0
    }
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

export default User;
