import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  time: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;
