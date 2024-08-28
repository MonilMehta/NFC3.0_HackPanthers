import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as Lk } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0b1d41',
    },
    secondary: {
      main: '#1c336b',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          textTransform: 'none',
          boxShadow: 'none',
          padding: '12px 24px',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#ffffff',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffffff',
            },
            '&:hover fieldset': {
              borderColor: '#b0bec5',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff',
            },
          },
        },
      },
    },
  },
});

export default function Signup() {
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const email = data.get('email');
    const phoneNumber = data.get('phoneNumber');
    const dob = data.get('dob');
    const password = data.get('password');

    const errors = {};

    if (!nameRegex.test(firstName)) {
      errors.firstName = 'Invalid first name. Only letters are allowed.';
    }

    if (!nameRegex.test(lastName)) {
      errors.lastName = 'Invalid last name. Only letters are allowed.';
    }

    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email address. It must contain an @ sign.';
    }

    if (!phoneRegex.test(phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number. It must contain only numbers.';
    }

    if (!passwordRegex.test(password)) {
      errors.password =
        'Invalid password. It must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log({
        firstName,
        lastName,
        email,
        phoneNumber,
        dob,
        password,
      });
    }
  };

  return (
    <ThemeProvider theme={theme} style={{width:'100vw',height:'100vh'}}>
      <Box
        sx={{
          backgroundColor: '#0b1d41',
          minHeight: '100vh',
          minWidth: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 0',
        }}
      >
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              backgroundColor: '#1c336b',
              padding: '2.5rem 3rem',
              borderRadius: '15px',
              boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.6)',
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              align="center"
              sx={{ 
                color: '#ffffff', 
                marginBottom: '2rem', 
                fontWeight: 'bold',
                letterSpacing: '0.7px',
              }}
            >
              Create an Account
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={!!validationErrors.firstName}
                    helperText={validationErrors.firstName}
                    InputLabelProps={{
                      style: { color: '#b0bec5' },
                    }}
                    InputProps={{
                      style: { color: '#ffffff' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    error={!!validationErrors.lastName}
                    helperText={validationErrors.lastName}
                    InputLabelProps={{
                      style: { color: '#b0bec5' },
                    }}
                    InputProps={{
                      style: { color: '#ffffff' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={!!validationErrors.email}
                    helperText={validationErrors.email}
                    InputLabelProps={{
                      style: { color: '#b0bec5' },
                    }}
                    InputProps={{
                      style: { color: '#ffffff' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    error={!!validationErrors.phoneNumber}
                    helperText={validationErrors.phoneNumber}
                    InputLabelProps={{
                      style: { color: '#b0bec5' },
                    }}
                    InputProps={{
                      style: { color: '#ffffff' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="dob"
                    label="Date of Birth"
                    type="date"
                    id="dob"
                    InputLabelProps={{
                      style: { color: '#b0bec5' },
                      shrink: true,
                    }}
                    InputProps={{
                      style: { color: '#ffffff' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={!!validationErrors.password}
                    helperText={validationErrors.password}
                    InputLabelProps={{
                      style: { color: '#b0bec5' },
                    }}
                    InputProps={{
                      style: { color: '#ffffff' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions, and updates via email."
                    sx={{ color: '#b0bec5' }}
                  />
                </Grid>
              </Grid>
              {Object.keys(validationErrors).length > 0 && (
                <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                  Please fix the errors before submitting.
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#ffffff',
                  color: '#0b1d41',
                  fontWeight: 700,
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    color: '#1c336b',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Lk to="/signin" style={{ textDecoration: 'none', color: '#b0bec5', fontWeight: 500 }}>
                    Already have an account? Sign in
                  </Lk>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
