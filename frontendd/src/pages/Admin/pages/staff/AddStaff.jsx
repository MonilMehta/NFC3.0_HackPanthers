import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';

const AddStaff = ({ staff, onClose }) => {
  const [staffData, setStaffData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    role: ''
  });

  useEffect(() => {
    if (staff) {
      setStaffData(staff);
    } else {
      setStaffData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        role: ''
      });
    }
  }, [staff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (typeof onClose === 'function') {
      onClose(staffData);
    } else {
      console.error('onClose is not a function');
    }
  };

  return (
    <Dialog open={true} onClose={() => typeof onClose === 'function' && onClose(null)} maxWidth="xs" fullWidth>
      <DialogTitle>{staff ? 'Edit Staff' : 'Add Staff'}</DialogTitle>
      <DialogContent>
        <Divider sx={{ marginBottom: '16px' }} />
        <TextField
          margin="dense"
          label="First Name"
          name="firstName"
          value={staffData.firstName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          margin="dense"
          label="Last Name"
          name="lastName"
          value={staffData.lastName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          value={staffData.email}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          name="phoneNo"
          value={staffData.phoneNo}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          margin="dense"
          label="Role"
          name="role"
          value={staffData.role}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => typeof onClose === 'function' && onClose(null)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {staff ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStaff;
