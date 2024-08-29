import React from 'react';
import { Calendar, Heart, DollarSign } from 'lucide-react';

const CustomCard = ({ image, title, date, description, isDonation, goal, current }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-56 object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          {date && (
            <div className="flex items-center text-white mb-2">
              <Calendar size={16} className="mr-2" />
              <span>{date}</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{description}</p>
        {isDonation && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">Raised: ${current}</span>
              <span className="text-sm font-semibold text-gray-600">Goal: ${goal}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#4CAF50] to-[#6BCB80] h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(current / goal) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        <button className="w-full bg-[#003E1F] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#4CAF50] transition-colors duration-300 flex items-center justify-center">
          {isDonation ? (
            <>
              <DollarSign size={18} className="mr-2" />
              Donate Now
            </>
          ) : (
            <>
              <Heart size={18} className="mr-2" />
              Learn More
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CustomCard;