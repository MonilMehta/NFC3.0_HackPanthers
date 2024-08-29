import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // Navigate to the event details page
    navigate(`/event-details/${event._id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {event.eventName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.description.substring(0, 100)}...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date: {new Date(event.date).toLocaleDateString()}
        </Typography>
        <Button variant="outlined" onClick={handleViewDetails} sx={{ marginTop: '10px' }}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
