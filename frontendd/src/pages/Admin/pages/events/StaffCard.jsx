import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const EventCard = () => {
  const theme = useTheme();

  // Dummy data
  const eventData = {
    name: 'Annual Tech Conference',
    description: 'A conference showcasing the latest in tech.',
    date: '2024-10-15',
    location: {
      address: '123 Tech Street',
      city: 'Techville',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    },
    organizer: 'Tech Corp'
  };

  const staffData = [
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNo: '(555) 987-6543',
      role: 'Senior Developer'
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNo: '(555) 123-4567',
      role: 'Project Manager'
    },
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      phoneNo: '(555) 234-5678',
      role: 'UI/UX Designer'
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2,maxWidth:'650' }}>

      {/* Staff Table */}
      <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
        Staff Information
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>First Name</strong></TableCell>
              <TableCell><strong>Last Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone No</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffData.map((staff, index) => (
              <TableRow key={index}>
                <TableCell>{staff.firstName}</TableCell>
                <TableCell>{staff.lastName}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.phoneNo}</TableCell>
                <TableCell>{staff.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EventCard;
