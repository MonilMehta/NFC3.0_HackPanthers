import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/Navbar';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch('https://nurturenest-backend.onrender.com/projects/getProjectDetails');
                
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched Project Data:', data);
          setProjects(data.projects);
        } else {
          console.error('Error fetching project details:', response.statusText);
          setError('Error fetching project details. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
        setError('Error fetching project details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, []);

  useEffect(() => {
    const observers = [];
    
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Add card to visible set when it enters viewport
                setVisibleCards(prev => new Set([...prev, index]));
              } else {
                // Remove card from visible set when it leaves viewport
                setVisibleCards(prev => {
                  const newSet = new Set(prev);
                  newSet.delete(index);
                  return newSet;
                });
              }
            });
          },
          {
            threshold: 0.1, // Trigger when 10% of the card is visible
            rootMargin: '50px 0px' // Start animation 50px before card enters viewport
          }
        );
        
        observer.observe(ref);
        observers.push(observer);
      }
    });

    // Cleanup observers on component unmount
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [projects]); // Re-run when projects change

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003E1F]"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-600 text-lg">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-5 py-8" style={{ marginTop: '80px' }}>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Projects 
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our ongoing projects that aim to make a difference in the lives of children and communities. Each project is a step towards a brighter future.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project._id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`w-full h-[32rem] bg-[#003E1F] rounded-3xl p-6 shadow-lg flex flex-col transform transition-all duration-700 ease-out ${
                visibleCards.has(index)
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{
                transitionDelay: visibleCards.has(index) ? `${(index % 3) * 150}ms` : '0ms'
              }}
            >
              <div className="text-white flex-1 flex flex-col">
                {/* Project Title */}
                <h2 className="text-3xl font-bold mb-4">
                  {project.projectName}
                </h2>
                
                {/* Project Details */}
                <div className="text-sm leading-relaxed mb-4 opacity-90 flex-1 overflow-y-auto">
                  <p className="mb-3">
                    <span className="font-medium">Description:</span> {project.description}
                  </p>
                  
                  <p className="mb-2">
                    <span className="font-medium">Start Date:</span> {new Date(project.startDate).toLocaleDateString()}
                  </p>
                  
                  <p className="mb-2">
                    <span className="font-medium">End Date:</span> {new Date(project.endDate).toLocaleDateString()}
                  </p>
                  
                  <p className="mb-2">
                    <span className="font-medium">Status:</span> {project.status}
                  </p>
                  
                  <p className="mb-3">
                    <span className="font-medium">Allocated Budget:</span> ${project.allocated}
                  </p>
                  
                  <div className="mb-2">
                    <span className="font-medium">Team Members:</span>
                    <div className="mt-2 space-y-1">
                      {project.teamMembers.map((member) => (
                        <div key={member._id} className="bg-[#004A25] rounded-lg p-2 text-xs">
                          <p className="font-medium">{`${member.firstName} ${member.lastName}`}</p>
                          <p className="opacity-75">{member.email}</p>
                          <p className="opacity-75">{member.phone_no}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;