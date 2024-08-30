import React, { useState } from 'react';

const AdminNotification = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendMessage = async () => {
    try {
      const response = await fetch('http://localhost:8000/message/sendMessage', {  // Change to HTTP if needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageContent: message }), // Adjust to match backend
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log(result);
      setSuccess('Message sent successfully!');
      setMessage('');  // Clear message input
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Notifications Page</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Type your message here..."
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <br />
      <button
        onClick={handleSendMessage}
        style={{
          backgroundColor: '#1e1e2d',
          color: '#ecf0f1',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Send
      </button>
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          {success}
        </div>
      )}
    </div>
  );
};

export default AdminNotification;
