import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';

const EventUser = () => {
  const [events, setEvents] = useState([]);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const navigate = useNavigate();
  const cardRefs = useRef([]);

  useEffect(() => {
    axios.get('https://nurturenest-backend.onrender.com/events/getEventsDetails')
      .then(response => {
        setEvents(response.data.events);
      })
      .catch(error => {
        console.error('There was an error fetching the event data!', error);
      });
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
  }, [events]); // Re-run when events change

  const handleBecomeVolunteer = (eventId) => {
    const userId = Cookies.get('userId'); // Retrieve userId from cookie

    if (!userId) {
      console.error('User not logged in');
      return;
    }

    axios.post('https://nurturenest-backend.onrender.com/events/addVolunteer', {
      userId,
      eventId
    })
    .then(response => {
      console.log('Successfully became a volunteer:', response.data);
    })
    .catch(error => {
      console.error('There was an error becoming a volunteer!', error);
    });
  };

  if (events.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="text-center mb-8 mt-28">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Events
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our events that aim to make a difference in the lives of children and communities. Each event is a step towards a brighter future.
        </p>
      </div>
      <div className="p-5 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={event._id}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`w-full min-h-[36rem] bg-[#003E1F] rounded-3xl p-6 shadow-lg flex flex-col transform transition-all duration-700 ease-out ${
              visibleCards.has(index)
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{
              transitionDelay: visibleCards.has(index) ? `${(index % 3) * 150}ms` : '0ms'
            }}
          >
            {/* Main content */}
            <div className="text-white flex-1 flex flex-col">
              {/* Title/Header */}
              <h2 className="text-3xl font-bold mb-6">
                {event.eventName}
              </h2>
              
              {/* Event Details */}
              <div className="text-base leading-relaxed mb-6 opacity-90 flex-1">
                <div className="space-y-4">
                  <p>
                    <span className="font-semibold text-[#32CD32]">Organizer:</span> 
                    <span className="ml-2">{event.organizer}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-[#32CD32]">Description:</span> 
                    <span className="ml-2">{event.description}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-[#32CD32]">Address:</span> 
                    <span className="ml-2">{event.location?.address || 'N/A'}, {event.location?.city || 'N/A'}, {event.location?.country || 'N/A'}, {event.location?.zip || 'N/A'}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-[#32CD32]">Date:</span> 
                    <span className="ml-2">{new Date(event.date).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>
              
              {/* Action Button */}
              <button 
                onClick={() => handleBecomeVolunteer(event._id)}
                className="w-full bg-[#004A25] hover:bg-[#005A2D] text-white font-medium py-4 px-6 rounded-2xl transition-colors duration-200 flex items-center justify-between mt-auto"
              >
                <span>Become a Volunteer</span>
                <div className="w-6 h-6 bg-[#32CD32] rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 2L8 6L4 10" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EventUser;