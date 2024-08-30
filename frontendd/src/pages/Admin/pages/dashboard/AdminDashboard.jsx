import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

// Pie Chart Data
const generatePieData = (event) => {
  const staffCount = event.staff.length;
  const volunteerCount = event.volunteers.length;

  // Log staff and volunteer counts
  console.log(`Event: ${event.eventName}`);
  console.log(`Staff Count: ${staffCount}`);
  console.log(`Volunteer Count: ${volunteerCount}`);

  return {
    series: [staffCount, volunteerCount],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Staff', 'Volunteers'],
      colors: ['#FF4560', '#00E396'],
      legend: {
        position: 'bottom',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
            },
          },
        },
      },
      title: {
        text: `${event.eventName} Distribution`,
      },
    },
  };
};

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8000/events/getEventsDetails'); // Use the correct URL
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const ongoingEvents = data.events.filter(event => event.status === 'Ongoing');
        setEvents(ongoingEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Admin Dashboard
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {events.length > 0 ? (
          events.map((event) => (
            <Box key={event._id} sx={{ width: '50%', height: '300px' }}>
              <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                {event.eventName} (Donut Chart)
              </Typography>
              <ApexCharts
                options={generatePieData(event).options}
                series={generatePieData(event).series}
                type="donut"
                height={300}
              />
            </Box>
          ))
        ) : (
          <Typography>No ongoing events to display.</Typography>
        )}
      </Box>
    </Box>
  );
}
