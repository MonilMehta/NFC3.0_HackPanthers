// models/Event.js
import mongoose  from "mongoose";

const EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  organizer: {
    type: String,
    required: true,
  },
  volunteers: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // List of users participating in the event
    },
  ],
  staff: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff', 
    },
  ],
  status: {
    type: String,
    enum: ['Scheduled', 'Ongoing', 'Completed', 'Cancelled'],
    default: 'Scheduled',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const Event = mongoose.model('Event',EventSchema)

export default Event
