import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

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
      const response = await fetch(`http://localhost:8000/users/getUser/${value.trim()}`);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = staff ? "PUT" : "POST";
      
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
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          margin: { xs: 1, sm: 2 },
          width: { xs: 'calc(100% - 16px)', sm: 'calc(100% - 32px)' },
          maxHeight: { xs: 'calc(100% - 16px)', sm: 'calc(100% - 64px)' }
        }
      }}
    >
      <DialogTitle className="flex justify-between items-center bg-204E4A text-black px-4 sm:px-6 py-3 sm:py-4">
        <span className="text-lg sm:text-xl font-semibold">
          {staff ? "Edit Staff" : "Add Staff"}
        </span>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => typeof onClose === "function" && onClose(null)}
          aria-label="close"
          className="text-white"
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="bg-white p-2 sm:p-6 overflow-y-auto">
        <div className="p-4 sm:p-8 bg-white rounded-xl sm:rounded-3xl shadow-xl border-2" style={{ borderColor: '#003E1F' }}>
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={staffData.email}
                onChange={handleChange}
                onBlur={handleEmailChange}
                required
                className="w-full px-4 py-3 sm:px-6 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400 text-sm sm:text-base"
                style={{ borderColor: '#003E1F', color: '#003E1F' }}
                placeholder="Enter email address"
              />
              {isLoading && (
                <p className="text-xs sm:text-sm mt-2 text-gray-600">Checking for existing user...</p>
              )}
              {isExistingUser && (
                <p className="text-xs sm:text-sm mt-2 text-green-600">✓ Existing user found - details auto-filled</p>
              )}
            </div>

            {/* Personal Information Section */}
            <div className="bg-white rounded-xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2" style={{ borderColor: '#003E1F' }}>
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3" style={{ color: '#003E1F' }}>
                <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={staffData.firstName}
                    onChange={handleChange}
                    required
                    disabled={isExistingUser}
                    className={`w-full px-4 py-3 sm:px-6 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 placeholder-gray-400 text-sm sm:text-base ${
                      isExistingUser ? 'bg-gray-100' : 'bg-white'
                    }`}
                    style={{ borderColor: '#003E1F', color: '#003E1F' }}
                    placeholder="Enter first name"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={staffData.lastName}
                    onChange={handleChange}
                    required
                    disabled={isExistingUser}
                    className={`w-full px-4 py-3 sm:px-6 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 placeholder-gray-400 text-sm sm:text-base ${
                      isExistingUser ? 'bg-gray-100' : 'bg-white'
                    }`}
                    style={{ borderColor: '#003E1F', color: '#003E1F' }}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-white rounded-xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2" style={{ borderColor: '#003E1F' }}>
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3" style={{ color: '#003E1F' }}>
                <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59344 1.99522 8.06477 2.16708 8.43517 2.48353C8.80558 2.79999 9.04225 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2002 21.5265 15.5775C21.8437 15.9547 22.0122 16.4326 22 16.92Z" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone_no"
                    value={staffData.phone_no}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400 text-sm sm:text-base"
                    style={{ borderColor: '#003E1F', color: '#003E1F' }}
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={staffData.date_of_birth}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white text-sm sm:text-base"
                    style={{ borderColor: '#003E1F', color: '#003E1F' }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6">
              <button
                type="button"
                onClick={() => typeof onClose === "function" && onClose(null)}
                className="w-full sm:w-auto text-gray-700 font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-xl sm:rounded-2xl border-2 border-gray-300 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base order-1 sm:order-2"
                style={{ backgroundColor: '#003E1F' }}
              >
                <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {staff ? "Update Staff" : "Add Staff"}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddStaff;