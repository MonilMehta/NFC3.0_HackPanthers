import React, { useState, useEffect, useRef } from 'react';
import ProjectForm from './ProjectForm';

const AdminProjects = () => {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showMembers, setShowMembers] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(new Set());
  const projectRefs = useRef({});

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
    
    // Trigger initial load animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const projectId = entry.target.dataset.projectId;
          if (projectId) {
            if (entry.isIntersecting) {
              // Card is entering viewport
              setVisibleProjects(prev => new Set([...prev, projectId]));
            } else {
              // Card is leaving viewport - remove it for re-animation
              setVisibleProjects(prev => {
                const newSet = new Set(prev);
                newSet.delete(projectId);
                return newSet;
              });
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '100px 0px -100px 0px'
      }
    );

    // Observe all project cards
    Object.values(projectRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [projects]);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleToggleMembers = (projectId) => {
    setShowMembers((prevState) => ({
      ...prevState,
      [projectId]: !prevState[projectId],
    }));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 mt-16 sm:mt-20 lg:mt-24">
      {/* Header with fade-in animation */}
      <div 
        className={`text-center mb-6 sm:mb-8 transition-all duration-1000 ease-out ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
          Project Management
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
          Manage your projects efficiently. Add, view, and manage all project details in one place.
        </p>
      </div>
      
      {/* Add Project Button with delayed fade-in */}
      <button
        onClick={handleShowForm}
        className={`w-full sm:w-auto bg-[#003E1F] hover:bg-[#004A25] text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-700 ease-out mb-6 sm:mb-8 hover:scale-105 ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '0.2s' }}
      >
        Add Project
      </button>
      
      {/* Project Form with slide-in animation */}
      {showForm && (
        <div className="animate-fadeInScale">
          <ProjectForm onClose={handleCloseForm} />
        </div>
      )}

      {/* Projects Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {projects.map((project, index) => (
          <div
            key={project._id}
            ref={el => projectRefs.current[project._id] = el}
            data-project-id={project._id}
            className={`w-full max-w-md mx-auto md:mx-0 md:max-w-none min-h-[26rem] sm:min-h-[28rem] bg-[#003E1F] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg flex flex-col transition-all duration-1000 ease-out hover:scale-105 hover:shadow-2xl transform-gpu ${
              visibleProjects.has(project._id)
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-16 scale-95'
            }`}
            style={{ 
              transitionDelay: visibleProjects.has(project._id) ? `${(index % 3) * 0.15}s` : '0s',
              willChange: 'transform, opacity'
            }}
          >
            {/* Main content */}
            <div className="text-white flex-1 flex flex-col">
              {/* Project Name */}
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white leading-tight">
                {project.projectName}
              </h2>
              
              {/* Description */}
              <div className="mb-4 flex-1">
                <p className="text-sm sm:text-base leading-relaxed opacity-90">
                  {project.description}
                </p>
              </div>
              
              {/* Project Details */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm opacity-90">
                  <span className="font-semibold">Status:</span> 
                  <span className="text-[#32CD32] ml-2">{project.status}</span>
                </p>
                <p className="text-xs sm:text-sm opacity-90">
                  <span className="font-semibold">Budget:</span> 
                  <span className="text-[#32CD32] ml-2">${project.allocated}</span>
                </p>
                <p className="text-xs sm:text-sm opacity-90">
                  <span className="font-semibold">Start:</span> 
                  <span className="ml-2">{new Date(project.startDate).toLocaleDateString()}</span>
                </p>
                <p className="text-xs sm:text-sm opacity-90">
                  <span className="font-semibold">End:</span> 
                  <span className="ml-2">{new Date(project.endDate).toLocaleDateString()}</span>
                </p>
              </div>
              
              {/* Members Toggle Button */}
              <button 
                onClick={() => handleToggleMembers(project._id)}
                className="w-full bg-[#004A25] hover:bg-[#005A2D] text-white font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 ease-out flex items-center justify-between mt-auto hover:scale-105"
              >
                <span className="text-sm sm:text-base">
                  {showMembers[project._id] ? 'Hide Members' : 'Show Members'}
                </span>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#32CD32] rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300">
                  <svg 
                    width="10" 
                    height="10" 
                    className={`sm:w-3 sm:h-3 transition-transform duration-300 ${
                      showMembers[project._id] ? 'rotate-90' : 'rotate-0'
                    }`} 
                    viewBox="0 0 12 12" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d={showMembers[project._id] ? "M8 4L4 8" : "M4 2L8 6L4 10"} 
                      stroke="#003E1F" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </div>
            
            {/* Members List with slide-down animation */}
            {showMembers[project._id] && (
              <div className="mt-3 sm:mt-4 bg-[#004A25] rounded-xl sm:rounded-2xl p-3 sm:p-4 animate-slideDown">
                <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Team Members:</h3>
                <ul className="space-y-1">
                  {project.teamMembers.map((member, memberIndex) => (
                    <li 
                      key={member._id} 
                      className="text-white text-xs sm:text-sm opacity-90 break-words transition-all duration-300 ease-out"
                      style={{ 
                        animationDelay: `${memberIndex * 0.1}s`,
                        animation: 'fadeInUp 0.5s ease-out forwards'
                      }}
                    >
                      {member.firstName} {member.lastName} - {member.email}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 500px;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes cardSlideOut {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-40px) scale(0.95);
          }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.5s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out forwards;
          overflow: hidden;
        }

        .animate-cardSlideIn {
          animation: cardSlideIn 0.8s ease-out forwards;
        }

        .animate-cardSlideOut {
          animation: cardSlideOut 0.6s ease-out forwards;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced hover effects */
        .hover\\:scale-105:hover {
          transform: scale(1.02);
        }

        /* Optimized transforms */
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Stagger animation for multiple cards */
        .stagger-animation {
          animation-fill-mode: both;
        }

        /* Enhanced shadow transition */
        .shadow-transition {
          transition: box-shadow 0.3s ease-out;
        }

        .shadow-transition:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default AdminProjects;