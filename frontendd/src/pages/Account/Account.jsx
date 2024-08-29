import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
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

export default function Account() {
  return (
    <Box sx={{ flex: 1, width: '100%', bgcolor: '#ffffff', color: '#2c3e50', height: '100vh' }}>
      <Box
        sx={{
          position: 'sticky',
          top: { sm: -100, md: -110 },
          bgcolor: '#e8f5e9',
          zIndex: 9995,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2, color: '#2e7d32' }}>
            My Profile
          </Typography>
        </Box>
        <Tabs defaultValue={0} sx={{ bgcolor: 'transparent' }}>
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
        <Card sx={{ bgcolor: '#f1f8e9', color: '#2c3e50' }}>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md" sx={{ color: '#2e7d32' }}>Personal Info</Typography>
          </Box>
          <Divider sx={{ bgcolor: '#2e7d32' }} />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
          >
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel sx={{ color: '#2c3e50' }}>Name</FormLabel>
                <FormControl
                  sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                >
                  <Input size="sm" placeholder="First name" sx={{ bgcolor: '#ffffff', color: '#2c3e50' }} />
                  <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1, bgcolor: '#ffffff', color: '#2c3e50' }} />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel sx={{ color: '#2c3e50' }}>Date of Birth</FormLabel>
                  <Input
                    size="sm"
                    type="date"
                    startDecorator={<CalendarTodayRoundedIcon />}
                    sx={{ bgcolor: '#ffffff', color: '#2c3e50' }}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel sx={{ color: '#2c3e50' }}>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="email"
                    defaultValue="siriwatk@test.com"
                    sx={{ flexGrow: 1, bgcolor: '#ffffff', color: '#2c3e50' }}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel sx={{ color: '#2c3e50' }}>Phone Number</FormLabel>
                  <Input
                    size="sm"
                    type="tel"
                    startDecorator={<PhoneRoundedIcon />}
                    placeholder="(123) 456-7890"
                    sx={{ flexGrow: 1, bgcolor: '#ffffff', color: '#2c3e50' }}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
        </Card>

        {/* Badges Section */}
        <Card sx={{ bgcolor: '#f1f8e9', color: '#2c3e50' }}>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md" sx={{ color: '#2e7d32' }}>
              <BadgeIcon sx={{ mr: 1 }} /> Badges
            </Typography>
          </Box>
          <Divider sx={{ bgcolor: '#2e7d32' }} />
          <Typography sx={{ my: 2 }}>You have earned 5 badges for outstanding performance!</Typography>
          <Stack direction="row" spacing={2}>
            <img src="https://example.com/badge1.png" alt="Badge 1" style={{ width: '50px', height: '50px' }} />
            <img src="https://example.com/badge2.png" alt="Badge 2" style={{ width: '50px', height: '50px' }} />
            {/* Add more badge images as needed */}
          </Stack>
        </Card>

        {/* Events Section */}
        <Card sx={{ bgcolor: '#f1f8e9', color: '#2c3e50' }}>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md" sx={{ color: '#2e7d32' }}>
              <EventIcon sx={{ mr: 1 }} /> Events
            </Typography>
          </Box>
          <Divider sx={{ bgcolor: '#2e7d32' }} />
          <Typography sx={{ my: 2 }}>You have participated in 3 events this year:</Typography>
          <ul>
            <li>Hackathon 2024</li>
            <li>CodeFest 2024</li>
            <li>Open Source Summit</li>
          </ul>
        </Card>

        {/* Donations Section */}
        <Card sx={{ bgcolor: '#f1f8e9', color: '#2c3e50' }}>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md" sx={{ color: '#2e7d32' }}>
              <VolunteerActivismIcon sx={{ mr: 1 }} /> Donations
            </Typography>
          </Box>
          <Divider sx={{ bgcolor: '#2e7d32' }} />
          <Typography sx={{ my: 2 }}>You have donated a total of $500 to various causes this year.</Typography>
        </Card>
      </Stack>
    </Box>
  );
}
