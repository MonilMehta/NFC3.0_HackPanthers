import React, { useState } from 'react';
import jsPDF from 'jspdf';
import displayRazorPay from './razorpay';

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
        const response = await fetch('https://nurturenest-backend.onrender.com/donates/donate', {
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
    <div className="h-full py-8">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4" style={{ color: '#003E1F' }}>
            Make a Donation
          </h1>
          <p className="text-gray-600 text-base">
            Your generous contribution helps us make a positive impact in the lives of children in need
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border-2" style={{ borderColor: '#003E1F' }}>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: '#003E1F' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Donation Information
          </h2>

          <div className="space-y-4">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#003E1F' }}>
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400"
                  style={{ 
                    borderColor: validationErrors.firstName ? '#EF4444' : '#003E1F', 
                    color: '#003E1F' 
                  }}
                />
                {validationErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#003E1F' }}>
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-3 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400"
                  style={{ 
                    borderColor: validationErrors.lastName ? '#EF4444' : '#003E1F', 
                    color: '#003E1F' 
                  }}
                />
                {validationErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#003E1F' }}>
                Email Address *
              </label>
              <input
                type="email"
                name="donarEmail"
                value={formData.donarEmail}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400"
                style={{ 
                  borderColor: validationErrors.donarEmail ? '#EF4444' : '#003E1F', 
                  color: '#003E1F' 
                }}
              />
              {validationErrors.donarEmail && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.donarEmail}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#003E1F' }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="donarPhoneNo"
                value={formData.donarPhoneNo}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400"
                style={{ 
                  borderColor: validationErrors.donarPhoneNo ? '#EF4444' : '#003E1F', 
                  color: '#003E1F' 
                }}
              />
              {validationErrors.donarPhoneNo && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.donarPhoneNo}</p>
              )}
            </div>

            {/* Donation Amount */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#003E1F' }}>
                Donation Amount ($) *
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter donation amount"
                min="1"
                step="0.01"
                className="w-full px-4 py-3 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400"
                style={{ 
                  borderColor: validationErrors.amount ? '#EF4444' : '#003E1F', 
                  color: '#003E1F' 
                }}
              />
              {validationErrors.amount && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.amount}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#003E1F' }}>
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Leave a message with your donation"
                rows={3}
                className="w-full px-4 py-3 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 resize-none bg-white placeholder-gray-400"
                style={{ borderColor: '#003E1F', color: '#003E1F' }}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="text-white font-bold py-3 px-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{ backgroundColor: '#003E1F' }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Submit Donation
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {submissionError && (
              <div className="mt-4 p-3 bg-red-50 border-2 border-red-200 rounded-2xl">
                <p className="text-red-600 text-center font-medium">{submissionError}</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Your donation is secure and will be processed safely. Thank you for your generosity!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;