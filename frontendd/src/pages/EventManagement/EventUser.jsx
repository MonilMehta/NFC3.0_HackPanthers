import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';

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

  const handleBecomeVolunteer = (eventId) => {
    const userId = Cookies.get('userId'); // Retrieve userId from cookie

    if (!userId) {
      console.error('User not logged in');
      return;
    }

    axios.post('http://localhost:8000/events/addVolunteer', {
      userId,
      eventId
    })
    .then(response => {
      console.log('Successfully became a volunteer:', response.data);
    })
    .catch(error => {
      console.error('There was an error becoming a volunteer!', error);
    });
  };

  if (events.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {events.map((event, index) => (
          <Card
            key={event._id}
            sx={{ 
              maxWidth: 345, 
              flex: '1 1 calc(33% - 20px)', 
              marginBottom: '20px', 
              backgroundColor: getCardColor(index),
              display: 'flex', 
              flexDirection: 'column' // Ensure the content is stacked vertically
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h5" component="div">
                {event.eventName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Organizer: {event.organizer}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Description: {event.description}
              </Typography>
              <Typography variant="body2">
                Address: {event.location?.address || 'N/A'}, {event.location?.city || 'N/A'}, {event.location?.country || 'N/A'}, {event.location?.zip || 'N/A'}
              </Typography>
              <Typography variant="body2">
                Date: {new Date(event.date).toLocaleDateString()}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', padding: '20px' }}>
              <Button variant="contained" color="primary" onClick={() => handleBecomeVolunteer(event._id)}>
                Become a Volunteer
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

// Function to return different shades of green for card background
const getCardColor = (index) => {
  const colors = ['#dcedc8', '#c5e1a5', '#aed581']; // Different shades of green
  return colors[index % colors.length];
};

export default EventUser;
