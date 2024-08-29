import React, { useState } from 'react';
import ProjectForm from './ProjectForm'; 

const AdminProjects = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const buttonStyle = {
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <>
      <h1>Admin Projects</h1>
      <button
        onClick={handleShowForm}
        style={buttonStyle}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
      >
        Add Project
      </button>
      {showForm && <ProjectForm onClose={handleCloseForm} />}
    </>
  );
};

export default AdminProjects;
