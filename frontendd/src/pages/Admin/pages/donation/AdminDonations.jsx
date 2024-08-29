import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
        setDonations(data.donars); // Extract the donations from the 'donars' key
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h4" align="center" sx={{ margin: '2rem 0' }}>
        Admin Donations Page
      </Typography>
      {loading && <Typography align="center">Loading...</Typography>}
      {error && <Typography color="error" align="center">{error}</Typography>}
      {!loading && !error && donations.length > 0 && (
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
      )}
      {!loading && !error && donations.length === 0 && (
        <Typography align="center">No donation records found.</Typography>
      )}
    </Container>
  );
};

export default AdminDonations;
