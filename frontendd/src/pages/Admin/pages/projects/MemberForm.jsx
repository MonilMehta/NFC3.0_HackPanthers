import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';

const StaffForm = ({ member, onClose }) => {
  const [memberData, setmemberData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    role: ''
  });

  useEffect(() => {
    if (member) {
      setmemberData(member);
    } else {
      setmemberData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        role: ''
      });
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setmemberData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onClose(memberData);
  };

  return (
    <Dialog open={true} onClose={() => onClose(null)} maxWidth="xs" fullWidth>
      <DialogTitle>{member ? 'Edit member' : 'Add member'}</DialogTitle>
      <DialogContent>
        {/* <Typography variant="h6" gutterBottom>
          {member ? 'Edit Staff Details' : 'Add New Staff'}
        </Typography> */}
        <Divider sx={{ marginBottom: '16px' }} />
        <TextField
          margin="dense"
          label="First Name"
          name="firstName"
          value={memberData.firstName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          margin="dense"
          label="Last Name"
          name="lastName"
          value={memberData.lastName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          value={memberData.email}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          name="phoneNo"
          value={memberData.phoneNo}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          margin="dense"
          label="Role"
          name="role"
          value={memberData.role}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {member ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StaffForm;
