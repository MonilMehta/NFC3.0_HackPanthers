import React, { useEffect, useState, useRef } from "react";
import EventCard from "./EventCard"; // Component to display basic event details
import EventForm from "./EventForm"; // Modal form component
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import CloseIcon from "@mui/icons-material/Close"; // Icon to close the modal

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false); // State for modal visibility
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState(new Set());
  const eventRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all events from the API
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://nurturenest-backend.onrender.com/events/getEventsDetails"
        ); // Adjust the API endpoint as needed
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
    
    // Trigger initial load animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const eventId = entry.target.dataset.eventId;
          if (eventId) {
            if (entry.isIntersecting) {
              // Card is entering viewport
              setVisibleEvents(prev => new Set([...prev, eventId]));
            } else {
              // Card is leaving viewport - remove it for re-animation
              setVisibleEvents(prev => {
                const newSet = new Set(prev);
                newSet.delete(eventId);
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

    // Observe all event cards
    Object.values(eventRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [events]);

  const handleEventClick = (eventId) => {
    // Navigate to a new page with more details about the event
    navigate(`/event-details/${eventId}`);
  };

  const handleOpen = () => setOpen(true); // Open the modal
  const handleClose = () => setOpen(false); // Close the modal

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header with fade-in animation */}
      <div 
        className={`text-center mb-8 mt-16 sm:mt-20 lg:mt-24 transition-all duration-1000 ease-out ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
          Event Management
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
          Manage and view all ongoing events. Click on an event to see more details or add a new event.
        </p>
      </div>

      {/* Events Grid with animated cards */}
      <Grid container spacing={3} className="mb-8">
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={event._id}>
            <div
              ref={el => eventRefs.current[event._id] = el}
              data-event-id={event._id}
              className={`transition-all duration-1000 ease-out transform-gpu hover:scale-105 cursor-pointer ${
                visibleEvents.has(event._id)
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-16 scale-95'
              }`}
              style={{ 
                transitionDelay: visibleEvents.has(event._id) ? `${(index % 4) * 0.15}s` : '0s',
                willChange: 'transform, opacity'
              }}
              onClick={() => handleEventClick(event._id)}
            >
              <EventCard
                event={event}
                onClick={() => handleEventClick(event._id)}
              />
            </div>
          </Grid>
        ))}
      </Grid>

      {/* Add Event Button with delayed fade-in */}
      <div 
        className={`mt-10 flex justify-center transition-all duration-700 ease-out ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '0.3s' }}
      >
        <button
          onClick={handleOpen}
          className="bg-[#003E1F] hover:bg-[#004A25] text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 hover:shadow-2xl"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 hover:rotate-90"
          >
            <path 
              d="M12 5V19M5 12H19" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          Add Event
        </button>
      </div>

      {/* Modal for EventForm with slide-in animation */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="md" 
        fullWidth
        className="animate-modal"
        PaperProps={{
          className: open ? 'animate-modalSlideIn' : 'animate-modalSlideOut'
        }}
      >
        <DialogTitle className="flex justify-between items-center bg-[#204E4A] text-white">
          <span className="text-xl font-semibold">Add New Event</span>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            className="text-white hover:bg-white/10 transition-all duration-200 hover:scale-110"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="bg-white p-6">
          <div className={open ? 'animate-formSlideIn' : ''}>
            <EventForm onClose={handleClose} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes modalSlideOut {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
        }

        @keyframes formSlideIn {
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

        .animate-modalSlideIn {
          animation: modalSlideIn 0.4s ease-out forwards;
        }

        .animate-modalSlideOut {
          animation: modalSlideOut 0.3s ease-out forwards;
        }

        .animate-formSlideIn {
          animation: formSlideIn 0.5s ease-out forwards;
          animation-delay: 0.1s;
          animation-fill-mode: both;
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

        /* Optimized transforms */
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Enhanced hover effects */
        .hover\\:scale-105:hover {
          transform: scale(1.02);
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

        /* Modal backdrop animation */
        .animate-modal .MuiBackdrop-root {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Button hover effects */
        button:hover svg {
          transform: rotate(90deg);
        }

        /* Grid item animations */
        .MuiGrid-item {
          transition: all 0.3s ease-out;
        }

        /* Enhanced card wrapper */
        .event-card-wrapper {
          transition: all 0.3s ease-out;
          border-radius: 16px;
          overflow: hidden;
        }

        .event-card-wrapper:hover {
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default AdminEvents;