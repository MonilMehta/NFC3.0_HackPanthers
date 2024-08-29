import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Container, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StaffForm from './StaffForm';

const EventForm = () => {
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    date: '',
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    organizer: ''
  });
  const [staffList, setStaffList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Data:', formData);
    console.log('Staff List:', staffList);
  };

  const handleShowStaffForm = (index = null) => {
    if (index !== null) {
      setEditingIndex(index);
    } else {
      setEditingIndex(null);
    }
    setShowStaffForm(true);
  };

  const handleCloseStaffForm = (newStaff) => {
    setShowStaffForm(false);
    if (newStaff) {
      if (editingIndex !== null) {
        const updatedStaffList = [...staffList];
        updatedStaffList[editingIndex] = newStaff;
        setStaffList(updatedStaffList);
      } else {
        setStaffList((prevList) => [...prevList, newStaff]);
      }
    }
    setEditingIndex(null);
  };

  const handleEditStaff = (index) => {
    handleShowStaffForm(index);
  };

  const handleDeleteStaff = (index) => {
    setStaffList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            label="Event Name"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
          />
        </Box>
        <Box sx={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Box>
        <Box sx={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            name="date"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Box>
        <Typography variant="h6" component="h2" gutterBottom>
          Location
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.location.address}
              onChange={handleLocationChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.location.city}
              onChange={handleLocationChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.location.state}
              onChange={handleLocationChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Zip Code"
              name="zipCode"
              value={formData.location.zipCode}
              onChange={handleLocationChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.location.country}
              onChange={handleLocationChange}
              required
            />
          </Grid>
        </Grid>
        <Box sx={{ marginBottom: '20px', marginTop: '20px' }}>
          <TextField
            fullWidth
            label="Organizer"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            required
          />
        </Box>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Staff
          </Typography>
          <List>
            {staffList.map((staff, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${staff.firstName} ${staff.lastName}`}
                  secondary={`Role: ${staff.role}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    color="primary"
                    onClick={() => handleEditStaff(index)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleDeleteStaff(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <IconButton
            color="primary"
            aria-label="add staff"
            onClick={() => handleShowStaffForm()}
            sx={{ marginTop: '10px' }}
          >
            <AddIcon />
          </IconButton>
        </Box>
        
        {showStaffForm && (
          <StaffForm
            staff={editingIndex !== null ? staffList[editingIndex] : null}
            onClose={handleCloseStaffForm}
          />
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EventForm;
