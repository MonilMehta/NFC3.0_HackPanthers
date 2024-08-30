import React, { useState, useEffect } from 'react';
import ProjectForm from './ProjectForm';

const AdminProjects = () => {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
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

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-[#204E4A] mb-4">Admin Projects</h1>
      <button
        onClick={handleShowForm}
        className="bg-[#297045] hover:bg-[#2E933C] text-white font-semibold py-2 px-4 rounded transition duration-300"
      >
        Add Project
      </button>
      {showForm && <ProjectForm onClose={handleCloseForm} />}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="border border-gray-300 rounded-lg p-4 shadow-lg transform transition duration-300 hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-[#81C14B] mb-2">{project.projectName}</h2>
            <p className="text-gray-700">{project.description}</p>
            <p className="font-semibold text-[#297045] mt-2">Status: <span className="text-[#2E933C]">{project.status}</span></p>
            <p className="font-semibold text-[#297045]">Allocated Budget: <span className="text-[#2E933C]">${project.allocated}</span></p>
            <p className="font-semibold text-[#297045]">Start Date: <span className="text-[#2E933C]">{new Date(project.startDate).toLocaleDateString()}</span></p>
            <p className="font-semibold text-[#297045]">End Date: <span className="text-[#2E933C]">{new Date(project.endDate).toLocaleDateString()}</span></p>

            <button
              onClick={() => handleToggleMembers(project._id)}
              className="mt-2 text-[#007BFF] hover:underline focus:outline-none transition duration-300"
            >
              {showMembers[project._id] ? 'Hide Members' : 'Show Members'}
            </button>

            {showMembers[project._id] && (
              <ul className="mt-2">
                {project.teamMembers.map((member) => (
                  <li key={member._id} className="text-gray-600">
                    {member.firstName} {member.lastName} - {member.email}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
