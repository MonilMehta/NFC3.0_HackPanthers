import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MemberForm from './MemberForm'; // Assuming MemberForm is a component you use to add/edit members

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

  // Handle changes to form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Project Data:', formData);
    console.log('Team Members:', memberList);
  };

  // Show or edit member form
  const handleShowMemberForm = (index = null) => {
    if (index !== null) {
      setEditingIndex(index);
    } else {
      setEditingIndex(null);
    }
    setShowMemberForm(true);
  };

  // Close member form and update member list
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

  // Edit member
  const handleEditMember = (index) => {
    handleShowMemberForm(index);
  };

  // Delete member
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
        <Typography variant="h6" component="h2" gutterBottom>
          Team Members
        </Typography>
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
        <IconButton
          color="primary"
          aria-label="add member"
          onClick={() => handleShowMemberForm()}
          sx={{ marginTop: '10px' }}
        >
          <AddIcon />
        </IconButton>

        {/* Member Form */}
        {showMemberForm && (
          <MemberForm
            member={editingIndex !== null ? memberList[editingIndex] : null}
            onClose={handleCloseMemberForm}
          />
        )}

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
