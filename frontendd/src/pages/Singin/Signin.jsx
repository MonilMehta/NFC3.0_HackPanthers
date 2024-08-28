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
import { Link as Lk, useNavigate } from 'react-router-dom';

const googleTheme = createTheme({
  palette: {
    primary: {
      main: '#4285f4', // Google Blue
    },
    secondary: {
      main: '#34a853', // Google Green
    },
    text: {
      primary: '#202124', // Google Dark Gray
      secondary: '#5f6368', // Google Light Gray
    },
    background: {
      default: '#f5f5f5', // Google Light Gray Background
    },
  },
  shape: {
    borderRadius: 4, // Slightly rounded corners
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function Signin() {
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const email = data.get('email');
    const password = data.get('password');

    const errors = {};

    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Redirect to the main page if there are no validation errors
      navigate('/main');
    }
  };

  return (
    <ThemeProvider theme={googleTheme}>
      <Box
        sx={{
          backgroundColor: '#f5f5f5', // Light gray background
          minWidth: '100vw',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid #ddd', // Light gray border
              borderRadius: '8px',
              padding: '3rem 2rem',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#fff', // White background for the form
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                color: '#202124', // Dark gray text
                marginBottom: '1.5rem',
                fontWeight: 500,
              }}
            >
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ width: '100%' }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={!!validationErrors.email}
                helperText={validationErrors.email}
                InputLabelProps={{
                  style: { color: '#5f6368' }, // Light gray label
                }}
                InputProps={{
                  style: {
                    color: '#202124', // Dark gray text
                    backgroundColor: '#fff', // White background
                    borderRadius: '4px',
                    padding: '10px 15px',
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!validationErrors.password}
                helperText={validationErrors.password}
                InputLabelProps={{
                  style: { color: '#5f6368' }, // Light gray label
                }}
                InputProps={{
                  style: {
                    color: '#202124', // Dark gray text
                    backgroundColor: '#fff', // White background
                    borderRadius: '4px',
                    padding: '10px 15px',
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{ color: '#5f6368', marginTop: '1rem' }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#4285f4', // Google Blue
                  color: '#fff', // White text
                  fontWeight: 500,
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#357ae8', // Darker blue for hover
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Grid item>
                  <Lk
                    to="/signup"
                    style={{
                      textDecoration: 'none',
                      color: '#4285f4', // Google Blue
                      fontWeight: 500,
                    }}
                  >
                    Don't have an account? Sign Up
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
