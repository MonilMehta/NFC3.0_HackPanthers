import React from 'react';
import Navbar from '../../components/Navbar';
import { Container, Typography, Button, Grid } from '@mui/material';

const Mainpage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to NGOFlow
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Streamlining operations, resources, and volunteer coordination for NGOs.
        </Typography>
        <Button variant="contained" color="primary" size="large" style={{ marginTop: '1rem' }}>
          Get Started
        </Button>
      </Container>
      
      <Container maxWidth="lg" style={{ marginTop: '4rem' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" component="h2">
              Manage Projects
            </Typography>
            <Typography variant="body1">
              Easily create, manage, and track the progress of your NGO projects.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" component="h2">
              Coordinate Volunteers
            </Typography>
            <Typography variant="body1">
              Efficiently manage volunteers and their tasks with our streamlined tools.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" component="h2">
              Track Donations
            </Typography>
            <Typography variant="body1">
              Keep track of donations and fundraising efforts with real-time analytics.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Mainpage;