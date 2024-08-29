import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Container, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MemberForm from './MemberForm';

const ProjectForm = () => {
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [formData, setFormData] = useState({
    ProjectName: '',
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
  const [memberList, setmemberList] = useState([]);
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
    e.prProjectDefault();
    console.log('Project Data:', formData);
    console.log('Staff List:', memberList);
  };

  const handleShowMemberForm = (index = null) => {
    if (index !== null) {
      setEditingIndex(index);
    } else {
      setEditingIndex(null);
    }
    setShowMemberForm(true);
  };

  const handleCloseMemberForm = (newStaff) => {
    setShowMemberForm(false);
    if (newStaff) {
      if (editingIndex !== null) {
        const updatedStaffList = [...memberList];
        updatedStaffList[editingIndex] = newStaff;
        setmemberList(updatedStaffList);
      } else {
        setmemberList((prevList) => [...prevList, newStaff]);
      }
    }
    setEditingIndex(null);
  };

  const handleEditMember = (index) => {
    handleShowMemberForm(index);
  };

  const handleDeleteMember = (index) => {
    setmemberList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Project
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            label="Project Name"
            name="ProjectName"
            value={formData.ProjectName}
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
            Members
          </Typography>
          <List>
            {memberList.map((staff, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${staff.firstName} ${staff.lastName}`}
                  secondary={`Role: ${staff.role}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    color="primary"
                    onClick={() => handleEditMember(index)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleDeleteMember(index)}
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
            onClick={() => handleShowMemberForm()}
            sx={{ marginTop: '10px' }}
          >
            <AddIcon />
          </IconButton>
        </Box>
        
        {showMemberForm && (
          <MemberForm
            staff={editingIndex !== null ? memberList[editingIndex] : null}
            onClose={handleCloseMemberForm}
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

export default ProjectForm;
