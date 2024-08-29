import React, { useState, useEffect } from 'react';
import AddStaff from './AddStaff';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from '@mui/material';

const Staff = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    // Fetch the list of all staff members when the component mounts
    const fetchStaffList = async () => {
      try {
        const response = await fetch('http://localhost:8000/events/getStaff'); // Adjust the API endpoint as necessary
        const data = await response.json();
        setStaffList(data);
      } catch (error) {
        console.error('Error fetching staff list:', error);
      }
    };

    fetchStaffList();
  }, []);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = (staffData) => {
    setIsDialogOpen(false);
    if (staffData) {
      console.log('Staff data:', staffData);
      setStaffList([...staffList, staffData]); // Add the new staff member to the list
    }
  };

  return (
    <>
      <h1>Staff Page</h1>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpenDialog}
      >
        Add Staff
      </Button>
      {isDialogOpen && <AddStaff onClose={handleCloseDialog} />}
      
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffList.map((staff, index) => (
              <TableRow key={index}>
                <TableCell>{staff.firstName}</TableCell>
                <TableCell>{staff.lastName}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.phone_no}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Staff;
