import React, { useEffect, useState } from 'react';
import EventCard from './EventCard'; // Component to display basic event details
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all events from the API
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8000/events/getEventsDetails'); // Adjust the API endpoint as needed
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    // Navigate to a new page with more details about the event
    navigate(`/event-details/${eventId}`);
  };

  return (
    <div>
      <h1>Admin Events</h1>
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} key={event._id}>
            <EventCard event={event} onClick={() => handleEventClick(event._id)} />
          </Grid>
        ))}
      </Grid>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/events/new')}
        style={{ marginTop: '20px' }}
      >
        Add Event
      </Button>
    </div>
  );
};

export default AdminEvents;
