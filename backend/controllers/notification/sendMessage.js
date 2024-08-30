import Message from "../../models/message_schema.js"; // Import the Message model

const sendMessage = async (req, res) => {
  try {
    const {  messageContent } = req.body;

    // Get the current date and time
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const time = now.toTimeString().split(' ')[0]; // HH:MM:SS

    // Create a new message entry
    const newMessage = new Message({
      message: messageContent,
      date,
      time,
    });

    // Save the message
    await newMessage.save();

    // Optionally, send the message to users or notify them in some way
    // This part depends on how you plan to deliver the message to users

    return res.status(201).json({ message: "Message sent successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error sending message.", error: error.message });
  }
};

export default sendMessage;
