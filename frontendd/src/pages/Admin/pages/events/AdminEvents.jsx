import React, { useEffect, useState } from "react";
import EventCard from "./EventCard"; // Component to display basic event details
import EventForm from "./EventForm"; // Modal form component
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import CloseIcon from "@mui/icons-material/Close"; // Icon to close the modal

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all events from the API
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://nurturenest-cvqz.onrender.com/events/getEventsDetails"
        ); // Adjust the API endpoint as needed
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    // Navigate to a new page with more details about the event
    navigate(`/event-details/${eventId}`);
  };

  const handleOpen = () => setOpen(true); // Open the modal
  const handleClose = () => setOpen(false); // Close the modal

  return (
    <div className="p-8">
      <h1 className="text-5xl font-bold text-[#204E4A] mb-6">Admin Events</h1>
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid item xs={12} sm={4} key={event._id}>
            <EventCard
              event={event}
              onClick={() => handleEventClick(event._id)}
            />
          </Grid>
        ))}
      </Grid>
      <div className="mt-10">
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          className="mt-6 bg-81C14B hover:bg-2E933C"
        >
          Add Event
        </Button>
      </div>

      {/* Modal for EventForm */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center bg-204E4A text-white">
          <span className="text-xl font-semibold">Add New Event</span>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            className="text-white"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="bg-gray-100">
          <EventForm onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEvents;
