import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import axios from "axios";
import AdminNavbar from "../Admin/components/AdminNavbar";

const EventInfoDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);

  // Refs for animated elements
  const headerRef = useRef(null);
  const staffRef = useRef(null);
  const volunteersRef = useRef(null);
  const certificateRef = useRef(null);

  useEffect(() => {
    axios
      .get(`https://nurturenest-backend.onrender.com/events/getEvent/${eventId}`)
      .then((response) => {
        if (response.data) {
          console.log(response)
          setEvent({
            name: response.data.eventName,
            organizer: response.data.organizer,
            date: response.data.date,
            description: response.data.description,
            location: {
              address: response.data.location.address,
              city: response.data.location.city,
              state: response.data.location.state,
              zipCode: response.data.location.zipCode,
              country: response.data.location.country,
            },
            volunteers: response.data.volunteers,
            staff: response.data.staff,
          });
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the event data!", error);
      });
  }, [eventId]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px', // Trigger when element is 10% visible
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const elementId = entry.target.dataset.animateId;
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          setVisibleElements(prev => new Set([...prev, elementId]));
        } else if (entry.intersectionRatio <= 0.05) {
          setVisibleElements(prev => {
            const newSet = new Set(prev);
            newSet.delete(elementId);
            return newSet;
          });
        }
      });
    }, observerOptions);

    const elementsToObserve = [headerRef, staffRef, volunteersRef, certificateRef];
    elementsToObserve.forEach((ref) => {
      if (ref.current) {
        observerRef.current.observe(ref.current);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [event]);

  const handleVolunteerClick = () => {
    if (event) {
      const doc = new jsPDF();
  
      doc.setFontSize(22);
      doc.text("Certificate of Appreciation", 20, 30);
      doc.setFontSize(16);
      doc.text(`This is to certify that you have volunteered for the event:`, 20, 50);
      doc.text(event.name, 20, 60);
      doc.text(`Organized by: ${event.organizer}`, 20, 70);
      doc.text(`Date: ${event.date}`, 20, 80);
  
      doc.setFontSize(12);
      doc.text(
        `Location: ${event.location.address}, ${event.location.city}, ${event.location.state}, ${event.location.zipCode}, ${event.location.country}`,
        20,
        90
      );
  
      doc.setFontSize(16);
      doc.text("Thank you for your contribution!", 20, 110);
  
      doc.save("appreciation-certificate.pdf");
    }
  };

  // Animation classes
  const getAnimationClass = (elementId) => {
    return visibleElements.has(elementId) 
      ? 'animate-fade-in-up' 
      : 'animate-fade-out-down';
  };

  return (
    <>
      <AdminNavbar />
      {event ? (
        <div className="min-h-screen bg-white py-8 px-4 mt-24">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Event Header Card */}
            <div 
              ref={headerRef}
              data-animate-id="header"
              className={`bg-[#003E1F] rounded-3xl p-8 text-white shadow-lg transition-all duration-1000 ease-out ${getAnimationClass('header')}`}
            >
              <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg opacity-90">
                <div>
                  <p className="mb-2">
                    <span className="font-medium">Organizer:</span> {event.organizer}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Date:</span> {event.date}
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <span className="font-medium">Location:</span>
                  </p>
                  <p className="text-sm opacity-80">
                    {event.location.address}, {event.location.city},{" "}
                    {event.location.state}, {event.location.zipCode},{" "}
                    {event.location.country}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <p className="font-medium mb-2">Description:</p>
                <p className="text-base opacity-90 leading-relaxed">{event.description}</p>
              </div>
            </div>

            {/* Staff Members Card */}
            <div 
              ref={staffRef}
              data-animate-id="staff"
              className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border-2 transition-all duration-1000 ease-out delay-200 ${getAnimationClass('staff')}`}
              style={{ borderColor: '#003E1F' }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3" style={{ color: '#003E1F' }}>
                <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Staff Members
              </h2>
              
              <div className="space-y-4">
                {event.staff.map((member, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center p-4 sm:p-6 bg-gray-50 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 hover:shadow-md hover:bg-gray-100" style={{ borderColor: '#003E1F' }}>
                    <div className="flex-1">
                      <p className="font-semibold text-sm sm:text-base" style={{ color: '#003E1F' }}>
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {member.role}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base text-gray-700">
                        {member.email}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {member.phoneNo}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium rounded-full text-white" style={{ backgroundColor: '#003E1F' }}>
                        {member.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Volunteers Card */}
            <div 
              ref={volunteersRef}
              data-animate-id="volunteers"
              className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border-2 transition-all duration-1000 ease-out delay-400 ${getAnimationClass('volunteers')}`}
              style={{ borderColor: '#003E1F' }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3" style={{ color: '#003E1F' }}>
                <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H4C2.93913 15 1.92172 15.4214 1.17157 16.1716C0.421427 16.9217 0 17.9391 0 19V21" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="8" cy="7" r="4" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 21V19C22 18.1645 21.7155 17.3541 21.2094 16.6977C20.7033 16.0414 19.9996 15.5743 19.2 15.3706" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 3.13C15.8003 3.33256 16.5056 3.79955 17.0134 4.45606C17.5212 5.11256 17.8066 5.92299 17.8066 6.76C17.8066 7.59701 17.5212 8.40744 17.0134 9.06394C16.5056 9.72045 15.8003 10.1874 15 10.39" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Volunteers
              </h2>
              
              <div className="space-y-4">
                {event.volunteers.map((volunteer, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center p-4 sm:p-6 bg-gray-50 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 hover:shadow-md hover:bg-gray-100" style={{ borderColor: '#003E1F' }}>
                    <div className="flex-1">
                      <p className="font-semibold text-sm sm:text-base" style={{ color: '#003E1F' }}>
                        {volunteer}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        Volunteer
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium rounded-full text-white" style={{ backgroundColor: '#32CD32' }}>
                        Volunteer
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate Generation Card */}
            <div 
              ref={certificateRef}
              data-animate-id="certificate"
              className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border-2 text-center transition-all duration-1000 ease-out delay-600 ${getAnimationClass('certificate')}`}
              style={{ borderColor: '#003E1F' }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center justify-center gap-2 sm:gap-3" style={{ color: '#003E1F' }}>
                <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H9H8" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Generate Certificate
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 px-4">
                Download your certificate of appreciation for volunteering at this event.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleVolunteerClick}
                  className="text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
                  style={{ backgroundColor: '#003E1F' }}
                >
                  <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16L7 11L8.4 9.6L11 12.2L11 4L13 4L13 12.2L15.6 9.6L17 11L12 16Z" fill="currentColor"/>
                    <path d="M5 20V18H19V20H5Z" fill="currentColor"/>
                  </svg>
                  Generate Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border-2 animate-pulse" style={{ borderColor: '#003E1F' }}>
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#003E1F' }}></div>
              <p className="text-lg sm:text-xl font-medium" style={{ color: '#003E1F' }}>Loading event details...</p>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeOutDown {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-30px);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        
        .animate-fade-out-down {
          animation: fadeOutDown 0.5s ease-in forwards;
        }
        
        /* Initial state for elements */
        [data-animate-id] {
          opacity: 0;
          transform: translateY(30px);
        }
      `}</style>
    </>
  );
};

export default EventInfoDetailsPage;