import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";

const AddStaff = ({ staff, onClose }) => {
  const [staffData, setStaffData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_no: "",
    date_of_birth: "",
  });
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (staff) {
      // Convert date to YYYY-MM-DD format if it's in a different format
      const formattedDateOfBirth = staff.date_of_birth
        ? new Date(staff.date_of_birth).toISOString().split('T')[0]
        : "";
      setStaffData({
        ...staff,
        date_of_birth: formattedDateOfBirth,
      });
    } else {
      setStaffData({
        firstName: "",
        lastName: "",
        email: "",
        phone_no: "",
        date_of_birth: "",
      });
    }
  }, [staff]);

  const handleEmailChange = async (e) => {
    const { value } = e.target;
    setStaffData((prevData) => ({
      ...prevData,
      email: value,
    }));

    if (!value || value.trim() === "") {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://nurturenest-cvqz.onrender.com/users/getUser/${value.trim()}`);
      if (response.ok) {
        const userData = await response.json();
        // Convert date to YYYY-MM-DD format
        const formattedDateOfBirth = userData.date_of_birth
          ? new Date(userData.date_of_birth).toISOString().split('T')[0]
          : "";
        setStaffData({
          ...userData,
          date_of_birth: formattedDateOfBirth,
          email: value,
        });
        setIsExistingUser(true);
      } else {
        setStaffData((prevData) => ({
          ...prevData,
          firstName: "",
          lastName: "",
          phone_no: "",
          date_of_birth: "",
        }));
        setIsExistingUser(false);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const method = staff ? "PUT" : "POST";
      
      const response = await fetch("https://nurturenest-cvqz.onrender.com/events/addStaff", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: staffData.firstName,
          lastName: staffData.lastName,
          email: staffData.email,
          phone_no: staffData.phone_no,
          date_of_birth: staffData.date_of_birth
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (typeof onClose === "function") {
          onClose(result);
        }
      } else {
        console.error("Error in submitting staff data:", response.statusText);
      }
    } catch (error) {
      console.error("Error in submitting staff data:", error);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={() => typeof onClose === "function" && onClose(null)}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle className="text-xl font-bold text-204E4A">{staff ? "Edit Staff" : "Add Staff"}</DialogTitle>
      <DialogContent>
        <Divider sx={{ marginBottom: "16px" }} />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          value={staffData.email}
          onChange={handleChange}
          onBlur={handleEmailChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "16px" }}
        />
        <TextField
          margin="dense"
          label="First Name"
          name="firstName"
          value={staffData.firstName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "16px" }}
          disabled={isExistingUser}
        />
        <TextField
          margin="dense"
          label="Last Name"
          name="lastName"
          value={staffData.lastName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "16px" }}
          disabled={isExistingUser}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          name="phone_no"
          value={staffData.phone_no}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "16px" }}
        />
        <TextField
          margin="dense"
          label="Date of Birth"
          name="date_of_birth"
          value={staffData.date_of_birth}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginBottom: "16px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => typeof onClose === "function" && onClose(null)}
          color="secondary"
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {staff ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStaff;
