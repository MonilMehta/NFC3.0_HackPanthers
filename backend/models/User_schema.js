import mongoose  from "mongoose";
import jwt from "jsonwebtoken";

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
    },
    level:{
        type: Number,
        default: 1
    },
    refreshToken:{
        type: String,
    },
    volunteeredEvents: [
        {
          eventName: {
            type: String,
            required: true,
          },
          eventDate: {
            type: Date,
            required: true,
          },
        },
      ],
}, {timestamps: true});

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            firstName: this.firstName
        },
        process.env.ACCESS_TOKEN_SECRET || "A1B2C3D4E5F6G7H8I9J10",
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "2h"
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET || "J1I2H3G4F5E6D7C8B9A10",
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "3d"
        }
    )
}

// Create the model from the schema
const User = mongoose.model('User', userSchema);

export default User;
