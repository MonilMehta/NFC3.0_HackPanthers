import React from 'react';
import { Calendar, Heart, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomCard = ({ image, title, date, description, isDonation, goal, current }) => {
  return (
    <div className="cursor-pointer">
      <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
        {/* Background Image with Black & White Filter */}
        <img
          className="absolute inset-0 h-full w-full object-cover filter grayscale brightness-50"
          src={image}
          alt={title}
        />
        
        {/* Dark Overlay for better contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Top Section - Date */}
          {date && (
            <div className="flex items-center text-white">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white bg-opacity-20 backdrop-blur-sm mr-3">
                <Calendar size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-100">{date}</span>
            </div>
          )}
          
          {/* Bottom Section - Main Content */}
          <div className="text-white">
            {/* Title */}
            <h3 className="text-2xl font-bold mb-3 leading-tight text-white">
              {title}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-gray-100 leading-relaxed line-clamp-3 opacity-90 mb-4">
              {description}
            </p>
            
            {/* Donation Progress Bar */}
            {isDonation && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-200 mb-2">
                  <span>Raised: ${current}</span>
                  <span>Goal: ${goal}</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2 backdrop-blur-sm">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(current / goal) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {/* Button */}
            {isDonation ? (
              <Link 
                to="/donation" 
                className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white font-medium text-sm transition duration-300 hover:bg-opacity-30 z-10 relative"
              >
                <DollarSign size={18} className="mr-2" />
                Donate Now
              </Link>
            ) : (
              <Link 
                to="/events" 
                className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white font-medium text-sm transition duration-300 hover:bg-opacity-30 z-10 relative"
              >
                <Heart size={18} className="mr-2" />
                Learn More
              </Link>
            )}
          </div>
        </div>
        
        {/* Border */}
        <div className="absolute inset-0 border-2 border-transparent rounded-2xl"></div>
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

export default CustomCard;