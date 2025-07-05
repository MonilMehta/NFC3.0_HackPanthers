import React from 'react';
import { ChevronRight } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    { 
      title: 'Child Education Support', 
      description: 'Ensuring access to quality education for underprivileged children.', 
      image: 'https://cdn.downtoearth.org.in/dte/userfiles/images/30(30).jpg'
    },
    { 
      title: 'Healthcare for Kids', 
      description: 'Providing essential healthcare services to children in need.', 
      image: 'https://thumbs.dreamstime.com/b/hiv-children-physician-checking-health-to-child-kolkata-based-ngo-has-developed-complete-network-services-designed-to-63979589.jpg'
    },
    { 
      title: 'Nutritional Programs', 
      description: 'Addressing malnutrition and promoting healthy development for children.', 
      image: 'https://www.manipal.edu/content/dam/manipal/mu/mcon/malpe%203.jpg'
    },
    { 
      title: 'Child Protection Services', 
      description: 'Working to safeguard children from abuse and exploitation.', 
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    { 
      title: 'Recreational Programs', 
      description: 'Encouraging physical and mental development through play and activities.', 
      image: 'https://media.istockphoto.com/id/1170754176/photo/indian-school-children-in-classroom.jpg?s=612x612&w=0&k=20&c=A8O3FTFVWOxmwZrpz_R9GUBjAHWqDEsl68x_aNYPuRU='
    },
    { 
      title: 'Foster Care Support', 
      description: 'Supporting foster care systems to provide safe and nurturing homes for children.', 
      image: 'https://media.istockphoto.com/id/870402320/photo/a-social-worker-meeting-with-a-group-of-villagers.jpg?s=612x612&w=0&k=20&c=2JlS1vqg4pU5lCp8oiFXjVgMPlHbhrmH4wmtRJdq384='
    }
  ];

  return (
    <div className="bg-white">
      <div className="max-w-full mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:py-24 lg:px-8 xl:px-16">
        <div className="px-0 sm:px-4 lg:px-8 xl:px-16">
          <h2 className="text-3xl font-extrabold text-[#003E1F] sm:text-4xl lg:text-5xl">
            Child Welfare Projects
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-[#003E1F] sm:text-xl">
            Our mission is to uplift the lives of children by addressing their needs in education, health, and well-being.
          </p>
        </div>
        
        <div className="mt-12 px-0 sm:px-4 lg:px-8 xl:px-16 sm:mt-16 lg:mt-20">
          <div className="grid gap-4 grid-cols-1 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative h-80 sm:h-96 lg:h-[420px] w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                  {/* Background Image with Black & White Filter */}
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110 filter grayscale brightness-50" 
                  />
                  
                  {/* Dark Overlay for better contrast */}
                  <div className="absolute inset-0 bg-black bg-opacity-60 transition duration-300 group-hover:bg-opacity-70"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                    <div className="text-white">
                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 leading-tight text-white">
                        {project.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-100 leading-relaxed mb-3 sm:mb-4 opacity-90 line-clamp-3">
                        {project.description}
                      </p>
                      
                    
                    </div>
                  </div>
                  
                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent rounded-xl sm:rounded-2xl transition duration-300 group-hover:border-white group-hover:border-opacity-50"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProjectsSection;