import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import jsPDF from 'jspdf';
import displayRazorPay from './razorpay'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Soft green
    },
    secondary: {
      main: '#FFC107', // Amber
    },
    background: {
      default: '#FAFAFA', // Light gray background
    },
    text: {
      primary: '#333333', // Darker text for readability
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h5: {
      fontWeight: 700,
    },
  },
});

const DonationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    donarEmail: '',
    donarPhoneNo: '',
    amount: '',
    message: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [submissionError, setSubmissionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d+$/;
    const amountRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

    const errors = {};

    if (!formData.firstName) {
      errors.firstName = 'First name is required.';
    }

    if (!formData.lastName) {
      errors.lastName = 'Last name is required.';
    }

    if (!emailRegex.test(formData.donarEmail)) {
      errors.donarEmail = 'Invalid email address.';
    }

    if (!phoneRegex.test(formData.donarPhoneNo)) {
      errors.donarPhoneNo = 'Invalid phone number. Only numbers are allowed.';
    }

    if (!amountRegex.test(formData.amount) || parseFloat(formData.amount) <= 0) {
      errors.amount = 'Amount must be a positive number.';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        setIsSubmitting(true);
        const response = await fetch('http://localhost:8000/donates/donate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to submit donation');
        }

        await response.json();
        generatePDF(); // Call the function to generate the PDF

        // Call Razorpay payment function
        displayRazorPay(parseFloat(formData.amount));

        // Reset form data after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          donarEmail: '',
          donarPhoneNo: '',
          amount: '',
          message: '',
        });
        setSubmissionError('');
      } catch (error) {
        setSubmissionError('There was an error submitting the form. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const { firstName, lastName, amount } = formData;

    doc.setFontSize(16);
    doc.text('Donation Confirmation', 20, 20);
    doc.setFontSize(12);
    doc.text(`Dear ${firstName} ${lastName},`, 20, 30);
    doc.text(`Thank you for your generous donation of $${amount} to our NGO organization.`, 20, 40);
    doc.text('Your support helps us continue our work and make a positive impact in the lives of children in need.', 20, 50);
    doc.text('We are deeply grateful for your contribution and commitment.', 20, 60);
    doc.text('Sincerely,', 20, 70);
    doc.text('The Children Welfare Oriented Team', 20, 80);

    doc.save('donation-card.pdf');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            padding: '2rem 3rem',
            backgroundColor: '#e9ecef',
            marginTop: '2rem',
            marginBottom: '2rem',
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            align="center"
            sx={{
              color: '#333333',
              marginBottom: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            Donation Form
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!validationErrors.firstName}
                  helperText={validationErrors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  required
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!validationErrors.lastName}
                  helperText={validationErrors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="donarEmail"
                  required
                  fullWidth
                  label="Email Address"
                  value={formData.donarEmail}
                  onChange={handleChange}
                  error={!!validationErrors.donarEmail}
                  helperText={validationErrors.donarEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="donarPhoneNo"
                  required
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  value={formData.donarPhoneNo}
                  onChange={handleChange}
                  error={!!validationErrors.donarPhoneNo}
                  helperText={validationErrors.donarPhoneNo}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="amount"
                  required
                  fullWidth
                  label="Donation Amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  error={!!validationErrors.amount}
                  helperText={validationErrors.amount}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="message"
                  fullWidth
                  label="Message (optional)"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: '#4CAF50',
                  color: '#ffffff',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#388E3C',
                    transform: 'translateY(-2px)',
                  },
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>

              {submissionError && (
                <Typography color="error" align="center" sx={{ mt: 2 }}>
                  {submissionError}
                </Typography>
              )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default DonationForm;
