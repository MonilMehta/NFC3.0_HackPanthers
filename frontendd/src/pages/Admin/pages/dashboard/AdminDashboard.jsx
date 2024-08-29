import React from 'react';
import ApexCharts from 'react-apexcharts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AdminDashboard = () => {
  // Dummy data for the charts (single event)
  const eventData = {
    series: [{
      name: 'Staff Count',
      data: [10]  
    }, {
      name: 'Volunteer Count',
      data: [30]  
    }],
    options: {
      chart: { type: 'bar' },
      xaxis: { categories: ['Event 1'] },
      colors: ['#00E396', '#0099FF'],
      plotOptions: {
        bar: { horizontal: false, columnWidth: '50%' }
      },
      legend: { position: 'top' },
      title: { text: 'Event 1' }
    }
  };

  const fundraisingData = {
    series: [{
      name: 'Funds Raised',
      data: [5000, 6000, 7000, 8000, 5500, 7200, 6800, 7500, 7800, 8100, 7000, 7300]  // Data for one month
    }],
    options: {
      chart: { type: 'line', zoom: { enabled: false } },
      xaxis: { categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'] },
      colors: ['#FF4560'],
      stroke: { curve: 'smooth', width: 3 },
      markers: { size: 5 },
      grid: { borderColor: '#e0e0e0' },
      tooltip: { y: { formatter: val => `$${val}` } },
      title: { text: 'Funds Raised Over the Last Month' }
    }
  };

  const pieChartData = {
    series: [70, 30],
    options: {
      chart: { type: 'pie' },
      labels: ['Staff', 'Volunteers'],
      colors: ['#FF4560', '#00E396'],
      legend: { position: 'bottom' },
      title: { text: 'Staff and Volunteer Distribution' }
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Admin Dashboard
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <Box sx={{ width: '50%', height: '300px' }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Staff and Volunteer Distribution (Pie Chart)
          </Typography>
          <ApexCharts options={pieChartData.options} series={pieChartData.series} type="pie" height={300} />
        </Box>

        <Box sx={{ width: '50%', height: '300px' }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Staff and Volunteer Counts (Bar Chart)
          </Typography>
          <ApexCharts options={eventData.options} series={eventData.series} type="bar" height={300} />
        </Box>
      </Box>

      <Box sx={{ width: '100%', height: '400px', paddingTop: '50px' }}>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          Fundraising Over the Last Month (Line Chart)
        </Typography>
        <ApexCharts options={fundraisingData.options} series={fundraisingData.series} type="line" height={400} />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
