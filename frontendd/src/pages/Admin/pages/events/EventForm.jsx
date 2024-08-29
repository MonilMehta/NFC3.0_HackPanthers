import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, Container, Grid, MenuItem, Select, InputLabel, Checkbox, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StaffForm from './StaffForm';

const EventForm = () => {
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
  const [selectedStaff, setSelectedStaff] = useState([]);

  useEffect(() => {
    // Fetch staff list from API
    const fetchStaffList = async () => {
      try {
        const response = await fetch('http://localhost:8000/events/getStaff');
        if (response.ok) {
          const staffData = await response.json();
          setStaffList(staffData);
        } else {
          console.error('Error fetching staff list:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching staff list:', error);
      }
    };

    fetchStaffList();
  }, []);

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

  const handleStaffChange = (event) => {
    setSelectedStaff(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      date: new Date(formData.date).toISOString(), // Convert date to ISO string if needed
      staff: selectedStaff // Array of staff IDs
    };
    try {
      const response = await fetch('http://localhost:8000/events/createEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Event created successfully:', result);
      } else {
        console.error('Error creating event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
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
          <InputLabel id="staff-select-label">Select Staff</InputLabel>
          <Select
            labelId="staff-select-label"
            multiple
            value={selectedStaff}
            onChange={handleStaffChange}
            renderValue={(selected) => selected.map(id => {
              const staff = staffList.find(staff => staff._id === id);
              return staff ? `${staff.firstName} ${staff.lastName}` : '';
            }).join(', ')}
            fullWidth
            inputProps={{ 'aria-label': 'Select Staff' }}
          >
            {staffList.map((staff) => (
              <MenuItem key={staff._id} value={staff._id}>
                <Checkbox checked={selectedStaff.includes(staff._id)} />
                <ListItemText primary={`${staff.firstName} ${staff.lastName}`} />
              </MenuItem>
            ))}
          </Select>
        </Box>
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
