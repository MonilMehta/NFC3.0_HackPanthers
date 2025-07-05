import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const handleViewDetails = () => {
    // Navigate to the event details page
    navigate(`/event-details/${event._id}`);
  };

  // Use the actual event data passed as props
  const eventData = event || {
    eventName: "Turkey-Syria Earthquake Relief",
    description: "17 Thousand People Died, Thousand Injured, Houses and Buildings Destroyed. Turkey-Syria Grieves",
    date: "2024-02-15",
    _id: "sample-event-id"
  };

  return (
    <div className="w-80 h-96 bg-[#003E1F] rounded-3xl p-6 shadow-lg flex flex-col">
      {/* Main content */}
      
      <div className="text-white flex-1 flex flex-col">
        {/* Title/Header */}
        <h2 className="text-4xl font-bold mb-4">
          {eventData.eventName}
        </h2>
        
        {/* Description */}
        <p className="text-lg leading-relaxed mb-8 opacity-90 flex-1">
          {eventData.description.substring(0, 100)}...
        </p>
        
        {/* Action Button */}
        <button 
          onClick={handleViewDetails}
          className="w-full bg-[#004A25] hover:bg-[#005A2D] text-white font-medium py-4 px-6 rounded-2xl transition-colors duration-200 flex items-center justify-between mt-auto"
        >
          <span>View Details</span>
          <div className="w-6 h-6 bg-[#32CD32] rounded-full flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 2L8 6L4 10" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default EventCard;