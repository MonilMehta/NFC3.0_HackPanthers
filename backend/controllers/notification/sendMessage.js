import Message from "../../models/message_schema.js";

const sendMessage = async (req, res) => {
  try {
    const { messageContent } = req.body;

    if (!messageContent) {
      return res.status(400).json({ message: "Message content is required." });
    }

    const now = new Date();
    const time = now.toTimeString().split(' ')[0]; // HH:MM:SS

    const newMessage = new Message({
      message: messageContent,
      time,
    });

    await newMessage.save();

    return res.status(201).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ message: "Error sending message.", error: error.message });
  }
};

export default sendMessage;
