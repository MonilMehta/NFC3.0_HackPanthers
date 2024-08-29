import React, { useState } from 'react';
import AddStaff from './AddStaff';
import { Button } from '@mui/material';

const Staff = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = (staffData) => {
    setIsDialogOpen(false);
    // Handle the staffData here if needed (e.g., add to state, make API call)
    if (staffData) {
      console.log('Staff data:', staffData);
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
    </>
  );
};

export default Staff;
