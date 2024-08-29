import React from 'react';
import ApexCharts from 'react-apexcharts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Pie Chart Data
const pieData = {
  series: [70, 30],
  options: {
    chart: {
      type: 'donut', // Use donut for a more 3D-like effect
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
      text: 'Staff and Volunteer Distribution',
    },
  },
};

// Line Chart Data
const lineData = {
  series: [
    {
      name: 'Funds Raised',
      data: [5000, 6000, 7000, 8000, 5500, 7200, 6800, 7500, 7800, 8100, 7000, 7300],
    },
  ],
  options: {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: [
        'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 
        'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10',
        'Week 11', 'Week 12'
      ],
    },
    colors: ['#FF4560'],
    stroke: {
      curve: 'straight', // Change to 'straight' for pointed curves
      width: 3,
    },
    markers: {
      size: 5,
    },
    grid: {
      borderColor: '#e0e0e0',
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val}`,
      },
    },
    title: {
      text: 'Fundraising Over Time',
    },
  },
};

export default function AdminDashboard() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Admin Dashboard
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <Box sx={{ width: '50%', height: '300px' }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Staff and Volunteer Distribution (Donut Chart)
          </Typography>
          <ApexCharts
            options={pieData.options}
            series={pieData.series}
            type="donut"
            height={300}
          />
        </Box>

        <Box sx={{ width: '50%', height: '300px' }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Fundraising Over Time (Line Chart)
          </Typography>
          <ApexCharts
            options={lineData.options}
            series={lineData.series}
            type="line"
            height={300}
          />
        </Box>
      </Box>
    </Box>
  );
}
