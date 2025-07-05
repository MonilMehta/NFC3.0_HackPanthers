import React, { useEffect, useState, useRef } from "react";
import ApexCharts from "react-apexcharts";

// Pie Chart Data
const generatePieData = (event) => {
  const staffCount = event.staff.length;
  const volunteerCount = event.volunteers.length;

  // Log staff and volunteer counts
  console.log(`Event: ${event.eventName}`);
  console.log(`Staff Count: ${staffCount}`);
  console.log(`Volunteer Count: ${volunteerCount}`);

  return {
    series: [staffCount, volunteerCount],
    options: {
      chart: {
        type: "donut",
        background: 'transparent',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1200,
          animateGradually: {
            enabled: true,
            delay: 300
          },
          dynamicAnimation: {
            enabled: true,
            speed: 600
          }
        }
      },
      labels: ["Staff", "Volunteers"],
      colors: ["#32CD32", "#00E396"],
      legend: {
        position: "bottom",
        labels: {
          colors: "#ffffff",
          useSeriesColors: false,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
            labels: {
              show: true,
              name: {
                show: true,
                color: "#ffffff",
              },
              value: {
                show: true,
                color: "#ffffff",
              },
            },
          },
        },
      },
      dataLabels: {
        style: {
          colors: ['#ffffff']
        }
      },
      title: {
        text: `Distribution`,
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          color: "#ffffff",
        },
      },
    },
  };
};

// Custom hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold]);

  return [elementRef, isIntersecting];
};

// Individual event card component
const EventCard = ({ event, index }) => {
  const [ref, isVisible] = useIntersectionObserver(0.1);

  return (
    <div 
      ref={ref}
      className={`w-full h-[500px] bg-[#003E1F] rounded-3xl p-6 shadow-lg flex flex-col transform transition-all duration-1000 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-20 opacity-0 scale-95'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none'
      }}
    >
      {/* Event Header */}
      <div className="text-white flex-1 flex flex-col">
        <h2 className={`text-3xl font-bold mb-4 leading-tight transform transition-all duration-800 ease-out ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 150 + 200}ms` }}
        >
          {event.eventName}
        </h2>
        
        {/* Chart Container */}
        <div className={`flex-1 flex flex-col justify-center transform transition-all duration-1000 ease-out ${
          isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 150 + 400}ms` }}
        >
          <ApexCharts
            options={generatePieData(event).options}
            series={generatePieData(event).series}
            type="donut"
            height={280}
          />
        </div>
        
        {/* Stats Summary */}
        <div className={`mt-4 p-4 bg-[#004A25] rounded-2xl transform transition-all duration-800 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 150 + 600}ms` }}
        >
          <div className="flex justify-between items-center text-white">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#32CD32] transition-all duration-500 hover:scale-110">
                {event.staff.length}
              </p>
              <p className="text-sm opacity-90">Staff</p>
            </div>
            <div className="w-px h-8 bg-white opacity-30"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#00E396] transition-all duration-500 hover:scale-110">
                {event.volunteers.length}
              </p>
              <p className="text-sm opacity-90">Volunteers</p>
            </div>
            <div className="w-px h-8 bg-white opacity-30"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white transition-all duration-500 hover:scale-110">
                {event.staff.length + event.volunteers.length}
              </p>
              <p className="text-sm opacity-90">Total</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/events/getEventsDetails"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const ongoingEvents = data.events.filter(
          (event) => event.status === "Ongoing"
        );
        setEvents(ongoingEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
        // Trigger fade-in animation after data loads
        setTimeout(() => setFadeIn(true), 100);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003E1F]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white mt-24 p-6">
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
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }
      `}</style>

      {/* Header */}
      <div className={`text-center mb-8 transform transition-all duration-1000 ease-out ${
        fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fadeInDown">
          Dashboard Analytics
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          Each event displays a pie chart showing the distribution of staff and volunteers.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length > 0 ? (
          events.map((event, index) => (
            <EventCard key={event._id} event={event} index={index} />
          ))
        ) : (
          <div className={`col-span-full flex items-center justify-center h-64 transform transition-all duration-1000 ease-out ${
            fadeIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}>
            <div className="text-center animate-scaleIn">
              <div className="w-16 h-16 bg-[#003E1F] rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-500 hover:scale-110 hover:rotate-12">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L14.5 14.5" stroke="#32CD32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="#32CD32" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#003E1F] mb-2 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                No Ongoing Events
              </h3>
              <p className="text-lg text-gray-600 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                There are currently no ongoing events to display.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}