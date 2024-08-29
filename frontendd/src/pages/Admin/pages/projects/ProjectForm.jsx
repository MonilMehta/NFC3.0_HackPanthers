import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  MenuItem,
  Checkbox,
  Select,
  InputLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProjectForm = () => {
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    startDate: '',
    endDate: '',
    allocatedBudget: 0,
    status: 'Planning',
  });
  const [memberList, setMemberList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);

  useEffect(() => {
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

  const handleStaffChange = (event) => {
    setSelectedStaff(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/projects/createProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          teamMembers: selectedStaff,
          allocated: formData.allocatedBudget,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Project created successfully:', result);
        // Handle success (e.g., show a success message, redirect to another page)
      } else {
        console.error('Error creating project:', response.statusText);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleShowMemberForm = (index = null) => {
    if (index !== null) {
      setEditingIndex(index);
    } else {
      setEditingIndex(null);
    }
    setShowMemberForm(true);
  };

  const handleCloseMemberForm = (newMember) => {
    setShowMemberForm(false);
    if (newMember) {
      if (editingIndex !== null) {
        const updatedMemberList = [...memberList];
        updatedMemberList[editingIndex] = newMember;
        setMemberList(updatedMemberList);
      } else {
        setMemberList((prevList) => [...prevList, newMember]);
      }
    }
    setEditingIndex(null);
  };

  const handleEditMember = (index) => {
    handleShowMemberForm(index);
  };

  const handleDeleteMember = (index) => {
    setMemberList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Project
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Project Name */}
        <Box sx={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            label="Project Name"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
          />
        </Box>

        {/* Description */}
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

        {/* Start Date */}
        <Box sx={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            name="startDate"
            InputLabelProps={{ shrink: true }}
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </Box>

        {/* End Date */}
        <Box sx={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            label="End Date"
            type="date"
            name="endDate"
            InputLabelProps={{ shrink: true }}
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </Box>

        {/* Allocated Budget */}
        <Box sx={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            label="Allocated Budget"
            type="number"
            name="allocatedBudget"
            value={formData.allocatedBudget}
            onChange={handleChange}
            required
          />
        </Box>

        {/* Project Status */}
        <Box sx={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            {['Planning', 'In Progress', 'Completed', 'On Hold', 'Cancelled'].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Team Members Section */}
        <List>
          {memberList.map((member, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${member.firstName} ${member.lastName}`}
                secondary={`Role: ${member.role}`}
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
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Member
          </Typography>
          <InputLabel id="staff-select-label">Select Member</InputLabel>
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

        {/* Submit Button */}
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
