import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  // Dummy data for the charts
  const eventData = {
    labels: ['Event 1', 'Event 2', 'Event 3'],
    datasets: [
      {
        label: 'Staff Count',
        data: [10, 20, 15],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Volunteer Count',
        data: [30, 40, 35],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      }
    ]
  };

  const fundraisingData = {
    labels: ['Event 1', 'Event 2', 'Event 3'],
    datasets: [
      {
        label: 'Funds Raised',
        data: [5000, 7000, 6000],
        fill: false,
        borderColor: '#742774',
        tension: 0.1
      }
    ]
  };

  const pieChartData = {
    labels: ['Staff', 'Volunteers'],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Admin Dashboard
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Staff and Volunteer Distribution (Pie Chart)
        </Typography>
        <Pie data={pieChartData} />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Staff and Volunteer Counts (Bar Chart)
        </Typography>
        <Line data={eventData} options={{ scales: { x: { stacked: true }, y: { stacked: true } } }} />
      </Box>

      <Box>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Fundraising Over Time (Line Chart)
        </Typography>
        <Line data={fundraisingData} />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
