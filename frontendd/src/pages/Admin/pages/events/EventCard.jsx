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
    <Card className="max-w-sm shadow-lg border rounded-lg">
      <CardContent>
        <Typography variant="h5" component="div" className="text-lg font-bold text-[#204E4A]">
          {event.eventName}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mt-2">
          {event.description.substring(0, 100)}...
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mt-2">
          Date: {new Date(event.date).toLocaleDateString()}
        </Typography>
        <Button 
          variant="outlined" 
          onClick={handleViewDetails} 
          className="mt-4 border-[#204E4A] text-[#204E4A] hover:bg-[#204E4A] hover:text-white"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
