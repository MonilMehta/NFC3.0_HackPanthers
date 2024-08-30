import mongoose from 'mongoose';

// Define the schema for the Message
const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set the date to the current date if not provided
    required: true,
  },
  time: {
    type: String, // Store time in a string format (HH:MM:SS)
    required: true,
  }
}, { timestamps: true });

// Create the model from the schema
const Message = mongoose.model('Message', messageSchema);

export default Message;
