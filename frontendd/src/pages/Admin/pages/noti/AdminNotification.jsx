import React, { useState } from 'react';

const AdminNotification = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendMessage = async () => {
    try {
      const response = await fetch('https://nurturenest-cvqz.onrender.com/message/sendMessage', {  // Change to HTTP if needed
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
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-204E4A mb-4">Admin Notifications Page</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="10"
        placeholder="Type your message here..."
        className="w-full p-4 mb-4 border border-gray-300 rounded-md resize-none"
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