import React from 'react';


const ResourcesSection = () => (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Educational Resources
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Explore our comprehensive collection of materials to learn more about genocide prevention.
          </p>
        </div>
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {['Historical Timelines', 'Survivor Testimonies', 'Academic Papers', 'Interactive Maps', 'Educational Videos', 'Teaching Guides'].map((resource) => (
            <div key={resource} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{resource}</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Access in-depth information and learning materials.</p>
                </div>
                <div className="mt-3 text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

export default ResourcesSection;