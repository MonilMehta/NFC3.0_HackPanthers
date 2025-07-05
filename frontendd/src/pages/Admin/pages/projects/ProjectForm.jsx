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
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

// ProjectForm Component (Modal Content)
const ProjectForm = ({ onClose, onProjectAdded }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    startDate: '',
    endDate: '',
    allocatedBudget: 0,
    status: 'Planning',
  });
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);

  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        const response = await fetch('https://nurturenest-backend.onrender.com/events/getStaff');
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
    const { value, checked } = event.target;
    if (checked) {
      setSelectedStaff(prev => [...prev, value]);
    } else {
      setSelectedStaff(prev => prev.filter(id => id !== value));
    }
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
      const response = await fetch('https://nurturenest-backend.onrender.com/projects/createProject', {
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

        // Trigger the callback to refresh the project list
        if (onProjectAdded) {
          onProjectAdded();
        }

        // Close the modal after successful submission
        onClose();
      } else {
        console.error('Error creating project:', response.statusText);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="p-8 bg-white rounded-3xl shadow-xl border-2" style={{ borderColor: '#003E1F' }}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-semibold mb-3" style={{ color: '#003E1F' }}>
            Project Name *
          </label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
            className="w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400"
            style={{ borderColor: '#003E1F', color: '#003E1F' }}
            placeholder="Enter project name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-3" style={{ color: '#003E1F' }}>
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 resize-none bg-white placeholder-gray-400"
            style={{ borderColor: '#003E1F', color: '#003E1F' }}
            placeholder="Enter project description"
          />
        </div>

        {/* Date Section */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2" style={{ borderColor: '#003E1F' }}>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: '#003E1F' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#003E1F" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="#003E1F" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="#003E1F" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="#003E1F" strokeWidth="2"/>
            </svg>
            Project Timeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: '#003E1F' }}>
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white"
                style={{ borderColor: '#003E1F', color: '#003E1F' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: '#003E1F' }}>
                End Date *
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white"
                style={{ borderColor: '#003E1F', color: '#003E1F' }}
              />
            </div>
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold mb-3" style={{ color: '#003E1F' }}>
            Allocated Budget *
          </label>
          <input
            type="number"
            name="allocatedBudget"
            value={formData.allocatedBudget}
            onChange={handleChange}
            required
            className="w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400"
            style={{ borderColor: '#003E1F', color: '#003E1F' }}
            placeholder="Enter budget amount"
          />
        </div>

        {/* Team Members Section */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2" style={{ borderColor: '#003E1F' }}>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: '#003E1F' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.6977C21.7033 16.0414 20.9996 15.5743 20.2 15.3706" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.13C16.8003 3.33256 17.5056 3.79955 18.0134 4.45606C18.5212 5.11256 18.8066 5.92299 18.8066 6.76C18.8066 7.59701 18.5212 8.40744 18.0134 9.06394C17.5056 9.72045 16.8003 10.1874 16 10.39" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Team Members
          </h3>
          <div className="max-h-64 overflow-y-auto border-2 rounded-2xl p-6 bg-white shadow-lg space-y-3" style={{ borderColor: '#003E1F' }}>
            {staffList.map((staff) => (
              <div key={staff._id} className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 shadow-sm">
                <input
                  type="checkbox"
                  id={`staff-${staff._id}`}
                  value={staff._id}
                  checked={selectedStaff.includes(staff._id)}
                  onChange={handleStaffChange}
                  className="w-5 h-5 border-2 rounded-lg focus:ring-green-500 focus:ring-2 transition-all duration-300"
                  style={{ accentColor: '#003E1F', borderColor: '#003E1F' }}
                />
                <label 
                  htmlFor={`staff-${staff._id}`} 
                  className="ml-4 text-sm font-medium cursor-pointer"
                  style={{ color: '#003E1F' }}
                >
                  {staff.firstName} {staff.lastName}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold mb-3" style={{ color: '#003E1F' }}>
            Project Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white"
            style={{ borderColor: '#003E1F', color: '#003E1F' }}
          >
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="text-white font-bold py-4 px-10 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3"
            style={{ backgroundColor: '#003E1F' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

// AdminProjects Component (similar to AdminEvents)
const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    // Fetch all projects from the API
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://nurturenest-backend.onrender.com/projects/getProjectsDetails"
        ); // Adjust the API endpoint as needed
        const data = await response.json();
        setProjects(data.projects || data); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    // Navigate to a new page with more details about the project
    // navigate(`/project-details/${projectId}`);
    console.log(`Clicked project: ${projectId}`);
  };

  const handleOpen = () => setOpen(true); // Open the modal
  const handleClose = () => setOpen(false); // Close the modal

  const handleProjectAdded = () => {
    // Refresh the project list after adding a new project
    fetchProjects();
    handleClose();
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        "https://nurturenest-backend.onrender.com/projects/getProjectsDetails"
      );
      const data = await response.json();
      setProjects(data.projects || data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <div>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={project._id}>
            {/* You can replace this with a ProjectCard component */}
            <div 
              onClick={() => handleProjectClick(project._id)}
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold">{project.projectName}</h3>
              <p className="text-gray-600 text-sm mt-2">{project.description}</p>
              <p className="text-sm mt-2">Status: {project.status}</p>
              <p className="text-sm">Budget: ${project.allocatedBudget}</p>
            </div>
          </Grid>
        ))}
      </Grid>
      <div className="mt-10 flex justify-center">
        <button
          onClick={handleOpen}
          className="bg-[#003E1F] hover:bg-[#004A25] text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add Project
        </button>
      </div>

      {/* Modal for ProjectForm */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center bg-204E4A text-black">
          <span className="text-xl font-semibold">Add New Project</span>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            className="text-white"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="bg-white p-6">
          <ProjectForm onClose={handleClose} onProjectAdded={handleProjectAdded} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjects;