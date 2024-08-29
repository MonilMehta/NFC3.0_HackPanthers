import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, CardMedia, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, Avatar } from '@mui/material';
import { CalendarToday, Assignment, Forum, Favorite } from '@mui/icons-material';

const MainPage = () => {
  const events = [
    { id: 1, title: 'Community Cleanup', date: '2024-09-15', image: '/api/placeholder/300/200' },
    { id: 2, title: 'Fundraising Gala', date: '2024-09-22', image: '/api/placeholder/300/200' },
    { id: 3, title: 'Education Workshop', date: '2024-09-30', image: '/api/placeholder/300/200' },
  ];

  const tasks = [
    { id: 1, title: 'Complete orientation', completed: false },
    { id: 2, title: 'Submit availability for next month', completed: true },
    { id: 3, title: 'Review safety guidelines', completed: false },
  ];

  const forumPosts = [
    { id: 1, author: 'Admin', title: 'Important: New volunteering guidelines', preview: 'Please review the updated...' },
    { id: 2, author: 'Coordinator', title: 'Upcoming training sessions', preview: 'We have scheduled new training...' },
  ];

  const donationPrograms = [
    { id: 1, title: 'Education for All', goal: 10000, current: 7500, image: '/api/placeholder/300/200' },
    { id: 2, title: 'Clean Water Initiative', goal: 15000, current: 9000, image: '/api/placeholder/300/200' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar position="static" className="bg-green-600">
        <Toolbar>
          <Typography variant="h6">NGOFlow - Volunteer Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="mt-8">
        <Typography variant="h4" className="mb-6 text-green-800">Welcome, Volunteer!</Typography>
        
        {/* Upcoming Events */}
        <section className="mb-12">
          <Typography variant="h5" className="mb-4 flex items-center text-green-700">
            <CalendarToday className="mr-2" /> Upcoming Events
          </Typography>
          <Grid container spacing={4}>
            {events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={event.image}
                    alt={event.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.date}
                    </Typography>
                  </CardContent>
                  <Button variant="contained" color="primary" fullWidth>
                    Volunteer
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>

        {/* My Tasks */}
        <section className="mb-12 bg-green-50 p-6 rounded-lg">
          <Typography variant="h5" className="mb-4 flex items-center text-green-700">
            <Assignment className="mr-2" /> My Tasks
          </Typography>
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.completed}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={task.title} />
              </ListItem>
            ))}
          </List>
        </section>

        {/* Community Forum */}
        <section className="mb-12">
          <Typography variant="h5" className="mb-4 flex items-center text-green-700">
            <Forum className="mr-2" /> Community Forum
          </Typography>
          <Card>
            <List>
              {forumPosts.map((post) => (
                <ListItem key={post.id} alignItems="flex-start">
                  <ListItemIcon>
                    <Avatar>{post.author[0]}</Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={post.title}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {post.author}
                        </Typography>
                        {" — " + post.preview}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Button color="primary" fullWidth>View All Posts</Button>
          </Card>
        </section>

        {/* Donation Programs */}
        <section>
          <Typography variant="h5" className="mb-4 flex items-center text-green-700">
            <Favorite className="mr-2" /> Donation Programs
          </Typography>
          <Grid container spacing={4}>
            {donationPrograms.map((program) => (
              <Grid item xs={12} sm={6} key={program.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={program.image}
                    alt={program.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {program.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Goal: ${program.goal} | Raised: ${program.current}
                    </Typography>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: `${(program.current / program.goal) * 100}%` }}
                      ></div>
                    </div>
                  </CardContent>
                  <Button variant="contained" color="primary" fullWidth>
                    Donate Now
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>
      </Container>
    </div>
  );
};

export default MainPage;
