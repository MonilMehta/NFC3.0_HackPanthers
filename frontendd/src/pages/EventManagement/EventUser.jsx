import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const EventUser = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/events/getEventsDetails')
      .then(response => {
        setEvents(response.data.events);
      })
      .catch(error => {
        console.error('There was an error fetching the event data!', error);
      });
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/event-details/${id}`);
  };

  if (events.length === 0) {
    return <div>Loading...</div>; // Display a loading message or spinner while fetching data
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        {events.map(event => (
          <Card key={event.id} sx={{ maxWidth: 345, margin: 'auto', marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {event.eventName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Organizer: {event.organizer}
              </Typography>
              <Typography variant="body2">
                Location: {event.location.city}
              </Typography>
              <Typography variant="body2">
                Date: {event.date.split("T")[0]}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleViewDetails(event._id)}>
                View Details
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

export default EventUser;
