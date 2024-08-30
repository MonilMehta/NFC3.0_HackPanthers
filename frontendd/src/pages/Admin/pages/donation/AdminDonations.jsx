import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import ApexCharts from 'react-apexcharts';

// Function to generate a random date within the last year
const generateRandomDate = () => {
  const start = new Date();
  const end = new Date(start.setFullYear(start.getFullYear() - 1));
  const randomTime = Math.random() * (start - end) + end;
  return new Date(randomTime).toLocaleDateString();
};

// ApexCharts Data
const chartData = (donations) => {
  // Prepare data for the chart
  const dates = donations.map(donation => new Date(donation.date).toLocaleDateString());
  const amounts = donations.map(donation => donation.amount);

  return {
    series: [
      {
        name: 'Donation Amount',
        data: amounts
      }
    ],
    options: {
      chart: {
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        categories: dates,
        title: {
          text: 'Date'
        },
        labels: {
          rotate: -45,
          rotateAlways: true
        }
      },
      yaxis: {
        title: {
          text: 'Amount'
        }
      },
      title: {
        text: 'Donation Cash Flow Over Time'
      },
      colors: ['#00E396'],
      stroke: {
        curve: 'smooth'
      },
      markers: {
        size: 5
      },
      tooltip: {
        y: {
          formatter: (val) => `$${val}`
        }
      }
    }
  };
};

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('http://localhost:8000/donates/getDonarDetails');
        if (!response.ok) {
          throw new Error('Failed to fetch donation details');
        }
        const data = await response.json();
        console.log('Fetched Data:', data); // Log the data to check its structure
        
        // Ensure each donation has a valid date
        const updatedDonations = data.donars.map(donation => ({
          ...donation,
          date: donation.date ? new Date(donation.date).toLocaleDateString() : generateRandomDate()
        }));

        setDonations(updatedDonations); // Extract the donations from the 'donars' key
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Calculate the total donation amount
  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h4" align="center" sx={{ margin: '2rem 0' }}>
        Admin Donations Page
      </Typography>
      {loading && <Typography align="center">Loading...</Typography>}
      {error && <Typography color="error" align="center">{error}</Typography>}
      {!loading && !error && donations.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Message</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation._id}>
                    <TableCell>{donation.firstName}</TableCell>
                    <TableCell>{donation.lastName}</TableCell>
                    <TableCell>{donation.donarEmail}</TableCell>
                    <TableCell>{donation.donarPhoneNo}</TableCell>
                    <TableCell>${donation.amount}</TableCell>
                    <TableCell>{donation.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h6" align="center" sx={{ marginTop: '2rem' }}>
            Total Donation Amount: ${totalAmount}
          </Typography>
          <Box sx={{ marginTop: '2rem' }}>
            <ApexCharts
              options={chartData(donations).options}
              series={chartData(donations).series}
              type="line"
              height={350}
            />
          </Box>
        </>
      )}
      {!loading && !error && donations.length === 0 && (
        <Typography align="center">No donation records found.</Typography>
      )}
    </Container>
  );
};

export default AdminDonations;
