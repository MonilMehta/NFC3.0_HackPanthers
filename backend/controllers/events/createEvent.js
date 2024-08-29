import Event from "../../models/Event_schema.js"; // Import the Event model

const createEvent = async (req, res) => {
  try {
    // Create a new event using the request body
    let data = new Event({
      eventName: req.body.eventName,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location, // Add location if it's part of the schema
      organizer: req.body.organizer, // Add organizer if it's part of the schema
      status: req.body.status || "Scheduled", // Default to "Scheduled" if not provided
      staff: req.body.staff
    });

    // Save the new event to the database
    const savedEvent = await data.save();

    // Send a success response with the saved event
    res.status(201).json({
      message: "Event created successfully!",
      event: savedEvent
    });

  } 
  catch (error) {
    // Handle any errors that occur during event creation
    res.status(500).json({
      message: "Error creating event",
      error: error.message
    });
  }
};

export default createEvent