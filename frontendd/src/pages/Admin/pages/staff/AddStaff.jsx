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
      setStaffData(staff);
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

    // Avoid making a request with an empty or incomplete email
    if (!value || value.trim() === "") {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/users/getUser/${value.trim()}`);
      if (response.ok) {
        const userData = await response.json();
        setStaffData({
          ...userData,
          email: value, // Ensure email field is up-to-date
        });
        setIsExistingUser(true);
      } else {
        // Clear other fields if no user is found
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
      const method = "POST";
      
      const response = await fetch("http://localhost:8000/events/addStaff", {
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
        console.log(response)
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
      <DialogTitle>{staff ? "Edit Staff" : "Add Staff"}</DialogTitle>
      <DialogContent>
        <Divider sx={{ marginBottom: "16px" }} />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          value={staffData.email}
          onChange={handleChange} // Handle input change
          onBlur={handleEmailChange} // Trigger API call onBlur
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
          disabled={isExistingUser} // Disable editing if it's an existing user
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
          disabled={isExistingUser} // Disable editing if it's an existing user
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
