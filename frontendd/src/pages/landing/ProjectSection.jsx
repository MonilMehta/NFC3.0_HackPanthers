import React from 'react';
import { ChevronRight } from 'lucide-react';
import Proj1 from '../../assets/Proj1.png';
import Proj2 from '../../assets/Proj2.jpg';
import Proj3 from '../../assets/Proj3.jpg';
import Proj4 from '../../assets/Proj4.png';
import Proj5 from '../../assets/Proj5.jpg';
import Proj6 from '../../assets/Proj6.jpg';

const ProjectsSection = () => (
  <div className="bg-gray-50">
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-[#003E1F] sm:text-5xl">
          Child Welfare Projects
        </h2>
        <p className="mt-6 max-w-3xl mx-auto text-xl text-[#003E1F]">
          Our mission is to uplift the lives of children by addressing their needs in education, health, and well-being.
        </p>
      </div>
      <div className="mt-16 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: 'Child Education Support', description: 'Ensuring access to quality education for underprivileged children.', image: Proj1 },
          { title: 'Healthcare for Kids', description: 'Providing essential healthcare services to children in need.', image: Proj2 },
          { title: 'Nutritional Programs', description: 'Addressing malnutrition and promoting healthy development for children.', image:  Proj3 },
          { title: 'Child Protection Services', description: 'Working to safeguard children from abuse and exploitation.', image: Proj4 },
          { title: 'Recreational Programs', description: 'Encouraging physical and mental development through play and activities.', image: Proj5 },
          { title: 'Foster Care Support', description: 'Supporting foster care systems to provide safe and nurturing homes for children.', image: Proj6 },
        ].map((project, index) => (
          <div key={index} className="relative bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-64 bg-gray-200">
              {/* Placeholder for image */}
              <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
              <p className="mt-4 text-gray-600 text-lg">{project.description}</p>
              <a href="#" className="mt-6 inline-flex items-center font-medium text-indigo-600 hover:text-indigo-500">
                View details <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProjectsSection;
