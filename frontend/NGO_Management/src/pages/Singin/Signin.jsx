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

const defaultTheme = createTheme();

export default function Signin() {
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const email = data.get('email');
    const password = data.get('password');

    const errors = {};

    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email address. It must contain an @ sign.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log({
        email,
        password,
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme} style={{width:'100vw',height:'100vh'}}>
      <Box 
        sx={{ 
          backgroundColor: '#0b1d41', 
          minHeight: '100vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '2rem',
          color: '#fff',
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid #1c336b',
              borderRadius: '12px',
              padding: '3rem 2rem',
              boxShadow: '0 0 40px rgba(255, 255, 255, 0.1)',
              backgroundColor: '#1c336b',
            }}
          >
            <Typography 
              component="h1" 
              variant="h4" 
              sx={{ 
                color: '#ffffff', 
                marginBottom: '1.5rem', 
                fontWeight: 600,
                letterSpacing: '0.5px',
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
                  style: { color: '#b0bec5' },
                }}
                InputProps={{
                  style: { 
                    color: '#fff', 
                    backgroundColor: '#2b3a67', 
                    borderRadius: '6px', 
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
                  style: { color: '#b0bec5' },
                }}
                InputProps={{
                  style: { 
                    color: '#fff', 
                    backgroundColor: '#2b3a67', 
                    borderRadius: '6px', 
                    padding: '10px 15px',
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{ color: '#b0bec5', marginTop: '1rem' }}
              />
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
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    color: '#1c336b',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
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
                      color: '#ffffff', 
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
