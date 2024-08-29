import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import Navbar from '../../components/Navbar';
// Example event data
const eventData = {
  id: '1',
  name: 'Charity Gala',
  organizer: 'John Doe',
  date: '2024-12-10',
  address: '123 Charity Lane, Springfield, IL, 62704'
};

const EventUser = () => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/event-details/${eventData.id}`);
  };

  return (
    <>
    <Navbar />
    <div style={{ padding: '20px' }}>
      <Card sx={{ maxWidth: 345, margin: 'auto' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {eventData.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Organizer: {eventData.organizer}
          </Typography>
          <Typography variant="body2">
            Date: {eventData.date}
            <br />
            Address: {eventData.address}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleViewDetails}>
            View Details
          </Button>
        </CardActions>
      </Card>
    </div>
    </>
    
  );
};

export default EventUser;
