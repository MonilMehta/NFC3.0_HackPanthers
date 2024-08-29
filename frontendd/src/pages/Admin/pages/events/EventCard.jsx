import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import StaffCard from './StaffCard';
const EventCard = () => {
  const theme = useTheme();

  // Dummy data
  const eventData = {
    eventName: 'Annual Company Gala',
    description: 'A formal event celebrating the company’s achievements over the past year.',
    date: '2024-09-15',
    location: {
      address: '1234 Elm Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704',
      country: 'USA',
    },
    organizer: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNo: '(555) 123-4567',
      role: 'Event Coordinator',
    },
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 700, bgcolor: theme.palette.background.paper, borderRadius: 2, border:'black' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
            {eventData.eventName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {eventData.description}
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
            <strong>Date:</strong> {eventData.date}
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
            <strong>Location:</strong> {eventData.location.address}, {eventData.location.city}, {eventData.location.state} {eventData.location.zipCode}
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
            <strong>Country:</strong> {eventData.location.country}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="text.primary">
            <strong>Organizer:</strong>
          </Typography>
          <Typography variant="body2" color="text.primary">
            <strong>Name:</strong> {eventData.organizer.firstName} {eventData.organizer.lastName}
          </Typography>
          <Typography variant="body2" color="text.primary">
            <strong>Email:</strong> {eventData.organizer.email}
          </Typography>
          <Typography variant="body2" color="text.primary">
            <strong>Phone:</strong> {eventData.organizer.phoneNo}
          </Typography>
          <Typography variant="body2" color="text.primary">
            <strong>Role:</strong> {eventData.organizer.role}
          </Typography>
          <StaffCard/>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventCard;
