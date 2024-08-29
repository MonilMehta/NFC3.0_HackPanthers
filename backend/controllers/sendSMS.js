// sendSMS.js
import twilio from "twilio";
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Twilio credentials (use environment variables for security)
const accountSid ='AC3c76b48f5c70753ecf744b43d7f59841';
const authToken ='012819d2ad2be608351f579d3479c3ff';
const client = new twilio(accountSid, authToken);

// Function to send SMS
async function sendSMS(firstName,lastName, phoneNumber) {
  try {
    // Validate and format phone number
    const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'IN'); // 'IN' for India
    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
      throw new Error('Invalid phone number');
    }

    const formattedPhoneNumber = parsedPhoneNumber.format('E.164'); // Formats to +91982141XXXX

    // Send SMS
    const message = await client.messages.create({
      body: `Hi ${firstName} ${lastName}, thank you for joining [NGO Name]! Your support means the world to us. Together, we can make a difference. Stay tuned for updates and ways to get involved.`,
      to: formattedPhoneNumber,  // Use the formatted phone number
      from: '+12512862865' // Your Twilio phone number
    });

    console.log("SMS sent: ", message.sid);
  } catch (error) {
    console.error('Error sending SMS:', error.message);
    throw error; // Rethrow the error to handle it in the calling function
  }
}
export default sendSMS;
