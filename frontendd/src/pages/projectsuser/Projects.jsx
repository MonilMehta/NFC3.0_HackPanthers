import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { Container, Typography, CircularProgress, Card, CardContent, Grid, List, ListItem, ListItemText } from '@mui/material';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch('https://nurturenest-cvqz.onrender.com/projects/getProjectDetails');
        
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched Project Data:', data); // Log data to console
          setProjects(data.projects); // Adjust based on actual data structure
        } else {
          console.error('Error fetching project details:', response.statusText);
          setError('Error fetching project details. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
        setError('Error fetching project details. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false after the request is completed
      }
    };

    fetchProjectDetails();
  }, []);

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md" sx={{ padding: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Projects Page
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project._id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {project.projectName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Status:</strong> {project.status}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Allocated Budget:</strong> ${project.allocated}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Team Members:</strong>
                    </Typography>
                    <List>
                      {project.teamMembers.map((member) => (
                        <ListItem key={member._id}>
                          <ListItemText
                            primary={`${member.firstName} ${member.lastName}`}
                            secondary={`Email: ${member.email}, Phone: ${member.phone_no}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Projects;
