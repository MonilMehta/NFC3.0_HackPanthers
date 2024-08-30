import React, { useState, useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import { tabClasses } from '@mui/joy/Tab';
import Card from '@mui/joy/Card';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import BadgeIcon from '@mui/icons-material/Badge'; // Badge icon
import EventIcon from '@mui/icons-material/Event'; // Event icon
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'; // Donation icon
import Rotationdoner from './Roationdoner';
import RotationVol from './RotationVol';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Account() {
  const [user, setUser] = useState(null); 
  const [render, setRender] = useState(false);

  useEffect(() => {
    const email = Cookies.get('email');
    axios.get(`http://localhost:8000/users/getUser/${email}`)
      .then(response => {
        setUser(response.data);
        setRender(true);
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  if (!render) {
    return <Typography>Loading...</Typography>; // Simple loading message
  }

  return (
    <Box sx={{ flex: 1, width: '100%', bgcolor: '#ffffff', color: '#2c3e50', height: '100vh' }}>
      <Box
        sx={{
          position: 'sticky',
          top: { sm: -100, md: -110 },
          bgcolor: '#e8f5e9',
          zIndex: 9995,
          transition: 'background-color 0.3s ease',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Typography
            level="h2"
            component="h1"
            sx={{ mt: 1, mb: 2, color: '#2e7d32', fontSize: '2rem', fontWeight: '700', transition: 'color 0.3s ease' }}
          >
            My Profile
          </Typography>
        </Box>
        <Tabs defaultValue={0} sx={{ bgcolor: 'transparent', transition: 'background-color 0.3s ease' }}>
          <TabList
            tabFlex={1}
            size="sm"
            sx={{
              pl: { xs: 0, md: 4 },
              justifyContent: 'left',
              [`&& .${tabClasses.root}`]: {
                fontWeight: '600',
                flex: 'initial',
                color: '#2c3e50',
                fontSize: '1rem',
                transition: 'color 0.3s ease',
                [`&.${tabClasses.selected}`]: {
                  bgcolor: 'transparent',
                  color: '#2e7d32',
                  '&::after': {
                    height: '2px',
                    bgcolor: '#2e7d32',
                  },
                },
              },
            }}
          >
          </TabList>
        </Tabs>
      </Box>
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        {/* Personal Info Section */}
        <Card
          sx={{
            bgcolor: '#f1f8e9',
            color: '#2c3e50',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Typography
              level="title-md"
              sx={{ color: '#2e7d32', fontSize: '1.25rem', fontWeight: '600' }}
            >
              Personal Info
            </Typography>
          </Box>
          <Divider sx={{ bgcolor: '#2e7d32' }} />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
          >
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel sx={{ color: '#2c3e50', fontSize: '1rem', fontWeight: '500' }}>Name</FormLabel>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ display: { sm: 'flex', md: 'flex' }, gap: 2 }}
                >
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#2c3e50',
                      padding: '8px',
                      borderRadius: '4px',
                      flex: 1,
                      fontSize: '1rem',
                      fontWeight: '400',
                    }}
                  >
                    {user.firstName || 'First Name'}
                  </div>
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#2c3e50',
                      padding: '8px',
                      borderRadius: '4px',
                      flex: 1,
                      fontSize: '1rem',
                      fontWeight: '400',
                    }}
                  >
                    {user.lastName || 'Last Name'}
                  </div>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <div style={{ flexGrow: 1 }}>
                  <FormLabel sx={{ color: '#2c3e50', fontSize: '1rem', fontWeight: '500' }}>Date of Birth</FormLabel>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#ffffff',
                      color: '#2c3e50',
                      padding: '8px',
                      borderRadius: '4px',
                      fontSize: '1rem',
                      fontWeight: '400',
                    }}
                  >
                    <CalendarTodayRoundedIcon sx={{ mr: 1 }} />
                    {user.date_of_birth ? user.date_of_birth.substring(0, 10) : 'N/A'}
                  </div>
                </div>
                <div style={{ flexGrow: 1 }}>
                  <FormLabel sx={{ color: '#2c3e50', fontSize: '1rem', fontWeight: '500' }}>Email</FormLabel>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#ffffff',
                      color: '#2c3e50',
                      padding: '8px',
                      borderRadius: '4px',
                      fontSize: '1rem',
                      fontWeight: '400',
                    }}
                  >
                    <EmailRoundedIcon sx={{ mr: 1 }} />
                    {user.email || 'N/A'}
                  </div>
                </div>
              </Stack>
              <Stack direction="row" spacing={2}>
                <div style={{ flexGrow: 1 }}>
                  <FormLabel sx={{ color: '#2c3e50', fontSize: '1rem', fontWeight: '500' }}>Phone Number</FormLabel>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#ffffff',
                      color: '#2c3e50',
                      padding: '8px',
                      borderRadius: '4px',
                      fontSize: '1rem',
                      fontWeight: '400',
                    }}
                  >
                    <PhoneRoundedIcon sx={{ mr: 1 }} />
                    {user.phone_no || 'N/A'}
                  </div>
                </div>
              </Stack>
            </Stack>
          </Stack>
        </Card>

        {/* Badges Section */}
        <Card
          sx={{
            bgcolor: '#f1f8e9',
            color: '#2c3e50',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Typography
              level="title-md"
              sx={{ color: '#2e7d32', fontSize: '1.25rem', fontWeight: '600' }}
            >
              <BadgeIcon sx={{ mr: 1 }} /> Badges Earned
            </Typography>
          </Box>
          <Divider sx={{ bgcolor: '#2e7d32' }} />
          <Stack direction="row" spacing={2}>
            {/* Add more badge images as needed */}
            {user.volunteeredEvents.length > 0 && <RotationVol />}
            {user.amountDonated > 0 && <Rotationdoner />}
          </Stack>
        </Card>

        {/* Events Section */}
        <Card
          sx={{
            bgcolor: '#f1f8e9',
            color: '#2c3e50',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Typography
              level="title-md"
              sx={{ color: '#2e7d32', fontSize: '1.25rem', fontWeight: '600' }}
            >
              <EventIcon sx={{ mr: 1 }} /> Events Volunteered
            </Typography>
          </Box>
          <Divider sx={{ bgcolor: '#2e7d32' }} />
          <ul style={{ padding: 0, margin: 0 }}>
            {user.volunteeredEvents && user.volunteeredEvents.map((event, index) => (
              <li key={index} style={{ listStyleType: 'none', padding: '8px 0', transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: '#e8f5e9' } }}>
                {event.eventName}
              </li>
            ))}
          </ul>
        </Card>

        {/* Donations Section */}
        <Card
          sx={{
            bgcolor: '#f1f8e9',
            color: '#2c3e50',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Typography
              level="title-md"
              sx={{ color: '#2e7d32', fontSize: '1.25rem', fontWeight: '600' }}
            >
              <VolunteerActivismIcon sx={{ mr: 1 }} /> Donations
            </Typography>
          </Box>
          <Divider sx={{ bgcolor: '#2e7d32' }} />
          <Typography sx={{ my: 2, fontSize: '1rem' }}>
            You have donated a total of ${user.amountDonated || 0} to various causes this year.
          </Typography>
        </Card>
      </Stack>
    </Box>
  );
}
