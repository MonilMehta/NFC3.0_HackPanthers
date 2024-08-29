import React, { useState, useEffect } from 'react';
import ProjectForm from './ProjectForm'; 

const AdminProjects = () => {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMembers, setShowMembers] = useState({});

  useEffect(() => {
    // Fetch projects data
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8000/projects/getProjectDetails');
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleToggleMembers = (projectId) => {
    setShowMembers((prevState) => ({
      ...prevState,
      [projectId]: !prevState[projectId],
    }));
  };

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

      <div style={{ marginTop: '20px' }}>
        {projects.map((project) => (
          <div key={project._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h2>{project.projectName}</h2>
            <p>{project.description}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Allocated Budget:</strong> ${project.allocated}</p>
            <p><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}</p>

            <button
              onClick={() => handleToggleMembers(project._id)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#007BFF' }}
            >
              {showMembers[project._id] ? 'Hide Members' : 'Show Members'}
            </button>

            {showMembers[project._id] && (
              <ul>
                {project.teamMembers.map((member) => (
                  <li key={member._id}>
                    {member.firstName} {member.lastName} - {member.email}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminProjects;
