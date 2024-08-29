import mongoose  from "mongoose";

const DonarSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  donarEmail: {
    type: String,
    required: true,
    trim: true
  },
  donarPhoneNo: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    trim: true
  },
  donationDate: {
    type: Date,
    default: Date.now
  }
});

const Donar = mongoose.model('Donar',DonarSchema);

export default Donar;
