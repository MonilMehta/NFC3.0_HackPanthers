import React, { useState, useEffect, useRef } from 'react';
import AddStaff from './AddStaff';

const StaffCard = ({ staff, isVisible, delay }) => {
  return (
    <div 
      className={`w-80 h-72 bg-[#003E1F] rounded-3xl p-6 shadow-lg flex flex-col transition-all duration-1000 ease-out transform-gpu hover:scale-105 hover:shadow-2xl ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-16 scale-95'
      }`}
      style={{ 
        transitionDelay: isVisible ? `${delay}s` : '0s',
        willChange: 'transform, opacity'
      }}
    >
      {/* Main content */}
      <div className="text-white flex-1 flex flex-col">
        {/* Name/Header */}
        <h2 className="text-2xl font-bold mb-4">
          {staff.firstName} {staff.lastName}
        </h2>
        
        {/* Contact Details */}
        <div className="flex-1 space-y-3">
          <div className="opacity-90">
            <p className="text-sm font-medium text-[#32CD32] mb-1">Email</p>
            <p className="text-base">{staff.email}</p>
          </div>
          <div className="opacity-90">
            <p className="text-sm font-medium text-[#32CD32] mb-1">Phone</p>
            <p className="text-base">{staff.phone_no}</p>
          </div>
        </div>
        
        {/* Action Button */}
        <button className="w-full bg-[#004A25] hover:bg-[#005A2D] text-white font-medium py-3 px-6 rounded-2xl transition-all duration-300 ease-out flex items-center justify-between mt-4 hover:scale-105">
          <span>View Profile</span>
          <div className="w-6 h-6 bg-[#32CD32] rounded-full flex items-center justify-center transition-transform duration-300">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 2L8 6L4 10" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

const Staff = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleStaff, setVisibleStaff] = useState(new Set());
  const staffRefs = useRef({});

  useEffect(() => {
    // Fetch the list of all staff members when the component mounts
    const fetchStaffList = async () => {
      try {
        const response = await fetch('http://localhost:8000/events/getStaff'); // Adjust the API endpoint as necessary
        const data = await response.json();
        setStaffList(data);
      } catch (error) {
        console.error('Error fetching staff list:', error);
      }
    };

    fetchStaffList();
    
    // Trigger initial load animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const staffId = entry.target.dataset.staffId;
          if (staffId) {
            if (entry.isIntersecting) {
              // Card is entering viewport
              setVisibleStaff(prev => new Set([...prev, staffId]));
            } else {
              // Card is leaving viewport - remove it for re-animation
              setVisibleStaff(prev => {
                const newSet = new Set(prev);
                newSet.delete(staffId);
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

    // Observe all staff cards
    Object.values(staffRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [staffList]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = (staffData) => {
    setIsDialogOpen(false);
    if (staffData) {
      console.log('Staff data:', staffData);
      setStaffList([...staffList, staffData]); // Add the new staff member to the list
    }
  };

  return (
    <div className="p-6 bg-white mt-24 min-h-screen">
      {/* Header with fade-in animation */}
      <div 
        className={`text-center mb-8 transition-all duration-1000 ease-out ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
          Staff Management
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
          Manage your staff members efficiently. Add, view, and manage all staff details in one place.
        </p>
      </div>

      {/* Add Staff Button with delayed fade-in */}
      <div 
        className={`flex justify-between items-center mb-8 transition-all duration-700 ease-out ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '0.2s' }}
      >
        <button 
          onClick={handleOpenDialog}
          className="bg-[#003E1F] hover:bg-[#004A25] text-white px-6 py-3 rounded-2xl transition-all duration-300 ease-out flex items-center gap-2 font-medium hover:scale-105 hover:shadow-lg"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 hover:rotate-90"
          >
            <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add Staff
        </button>
      </div>
      
      {/* Add Staff Dialog with slide-in animation */}
      {isDialogOpen && (
        <div className="animate-fadeInScale">
          <AddStaff onClose={handleCloseDialog} />
        </div>
      )}
      
      {/* Cards Grid with scroll animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {staffList.map((staff, index) => (
          <div
            key={index}
            ref={el => staffRefs.current[`staff-${index}`] = el}
            data-staff-id={`staff-${index}`}
          >
            <StaffCard 
              staff={staff} 
              isVisible={visibleStaff.has(`staff-${index}`)}
              delay={(index % 4) * 0.15}
            />
          </div>
        ))}
      </div>
      
      {/* Empty State with fade-in animation */}
      {staffList.length === 0 && (
        <div 
          className={`flex flex-col items-center justify-center py-16 transition-all duration-1000 ease-out ${
            isLoaded 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.4s' }}
        >
          <div className="w-24 h-24 bg-[#003E1F] rounded-full flex items-center justify-center mb-4 transition-all duration-500 ease-out hover:scale-110">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#32CD32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="#32CD32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[#204E4A] mb-2">No Staff Members Found</h3>
          <p className="text-gray-600">Add your first staff member to get started.</p>
        </div>
      )}

      {/* Custom CSS for animations */}
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

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.5s ease-out forwards;
        }

        .animate-cardSlideIn {
          animation: cardSlideIn 0.8s ease-out forwards;
        }

        .animate-cardSlideOut {
          animation: cardSlideOut 0.6s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
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

        /* Button hover effects */
        button:hover svg {
          transform: rotate(90deg);
        }

        /* Card hover effects */
        .staff-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px -12px rgba(0, 62, 31, 0.3);
        }

        /* Enhanced grid animations */
        .grid > div {
          transition: all 0.3s ease-out;
        }

        /* Loading state animations */
        .loading-skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* Enhanced empty state */
        .empty-state-icon {
          transition: all 0.3s ease-out;
        }

        .empty-state-icon:hover {
          transform: scale(1.1) rotate(5deg);
        }
      `}</style>
    </div>
  );
};

export default Staff;