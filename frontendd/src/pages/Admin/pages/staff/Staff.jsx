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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-204E4A mb-4">Staff Page</h1>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpenDialog}
        className="mb-4 bg-204E4A hover:bg-2E933C text-white"
      >
        Add Staff
      </Button>
      {isDialogOpen && <AddStaff onClose={handleCloseDialog} />}
      
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold text-204E4A">First Name</TableCell>
              <TableCell className="font-semibold text-204E4A">Last Name</TableCell>
              <TableCell className="font-semibold text-204E4A">Email</TableCell>
              <TableCell className="font-semibold text-204E4A">Phone Number</TableCell>
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
    </div>
  );
};

export default Staff;
