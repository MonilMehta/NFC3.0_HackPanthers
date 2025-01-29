import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import ApexCharts from 'react-apexcharts';

// Function to generate a random date within the last year
const generateRandomDate = () => {
  const start = new Date();
  const end = new Date(start.setFullYear(start.getFullYear() - 1));
  const randomTime = Math.random() * (start - end) + end;
  return new Date(randomTime);
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
        const response = await fetch('https://nurturenest-cvqz.onrender.com/donates/getDonarDetails');
        if (!response.ok) {
          throw new Error('Failed to fetch donation details');
        }
        const data = await response.json();
        console.log(data)
        console.log('Fetched Data:', data); // Log the data to check its structure
        
        // Ensure each donation has a valid date
        const updatedDonations = data.donars.map(donation => ({
          ...donation,
          date: donation.donationDate ? new Date(donation.donationDate) : generateRandomDate()
        }));

        setDonations(updatedDonations.reverse()); // Reverse the order of donations
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
    <Container className="max-w-4xl mx-auto py-8">
      <Typography
        variant="h2"
        align="center"
        className="mb-8 text-3xl font-extrabold text-[#204E4A] font-sans"
      >
        Admin Donations Page
      </Typography>
      {loading && <Typography align="center" className="text-lg font-medium text-[#297045]">Loading...</Typography>}
      {error && <Typography color="error" align="center" className="text-lg font-medium">{error}</Typography>}
      {!loading && !error && donations.length > 0 && (
        <>
          <TableContainer component={Paper} className="shadow-lg rounded-lg bg-white">
            <Table>
              <TableHead className="bg-[#81C14B] text-white">
                <TableRow>
                  <TableCell className="font-semibold text-lg">First Name</TableCell>
                  <TableCell className="font-semibold text-lg">Last Name</TableCell>
                  <TableCell className="font-semibold text-lg">Email</TableCell>
                  <TableCell className="font-semibold text-lg">Phone Number</TableCell>
                  <TableCell className="font-semibold text-lg">Amount</TableCell>
                  <TableCell className="font-semibold text-lg">Message</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation._id} className="hover:bg-[#F0F0F0]">
                    <TableCell className="text-[#204E4A]">{donation.firstName}</TableCell>
                    <TableCell className="text-[#204E4A]">{donation.lastName}</TableCell>
                    <TableCell className="text-[#204E4A]">{donation.donarEmail}</TableCell>
                    <TableCell className="text-[#204E4A]">{donation.donarPhoneNo}</TableCell>
                    <TableCell className="text-[#297045]">${donation.amount}</TableCell>
                    <TableCell className="text-[#204E4A]">{donation.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h6" align="center" className="mt-8 text-xl font-semibold text-[#297045]">
            Total Donation Amount: ${totalAmount}
          </Typography>
          <Box className="mt-8">
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
        <Typography align="center" className="text-lg font-medium text-[#204E4A]">No donation records found.</Typography>
      )}
    </Container>
  );
};

export default AdminDonations;
