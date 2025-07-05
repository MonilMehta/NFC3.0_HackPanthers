import React, { useState, useEffect, useRef } from 'react';
import ApexCharts from 'react-apexcharts';

// Function to generate a random date within the last year
const generateRandomDate = () => {
  const start = new Date();
  const end = new Date(start.setFullYear(start.getFullYear() - 1));
  const randomTime = Math.random() * (start - end) + end;
  return new Date(randomTime);
};

// ApexCharts Data
const chartData = (donations) => {
  const dates = donations.map(donation => new Date(donation.donationDate).toLocaleDateString());
  const amounts = donations.map(donation => donation.amount);

  return {
    series: [
      {
        name: 'Donation Amount',
        data: amounts
      }
    ],
    options: {
      chart: {
        type: 'line',
        height: 350,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
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
      grid: {
        borderColor: '#e7e7e7',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
      },
      xaxis: {
        categories: dates,
        title: {
          text: 'Date',
          style: {
            color: '#003E1F',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600
          }
        },
        labels: {
          rotate: -45,
          rotateAlways: true,
          style: {
            colors: '#666',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif'
          }
        },
        axisBorder: {
          show: true,
          color: '#003E1F'
        },
        axisTicks: {
          show: true,
          color: '#003E1F'
        }
      },
      yaxis: {
        title: {
          text: 'Amount ($)',
          style: {
            color: '#003E1F',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600
          }
        },
        labels: {
          style: {
            colors: '#666',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif'
          },
          formatter: (val) => `$${val.toLocaleString()}`
        }
      },
      title: {
        text: 'Donation Cash Flow Over Time',
        align: 'center',
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
          fontFamily: 'Inter, sans-serif',
          color: '#003E1F'
        },
        margin: 20
      },
      colors: ['#32CD32'],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      markers: {
        size: 6,
        colors: ['#32CD32'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 8
        }
      },
      tooltip: {
        theme: 'light',
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif'
        },
        y: {
          formatter: (val) => `$${val.toLocaleString()}`
        },
        marker: {
          show: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      }
    }
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

const DonationCard = ({ donation, index }) => {
  const [ref, isVisible] = useIntersectionObserver(0.1);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      ref={ref}
      className={`w-full max-w-sm mx-auto bg-[#003E1F] rounded-3xl p-4 sm:p-6 shadow-lg flex flex-col min-h-[350px] sm:min-h-[384px] transform transition-all duration-1000 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-20 opacity-0 scale-95'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none'
      }}
    >
      {/* Header with donor name and amount */}
      <div className={`text-white mb-4 transform transition-all duration-800 ease-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 150 + 200}ms` }}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-2 break-words">
          {donation.firstName} {donation.lastName}
        </h2>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-[#32CD32] transition-all duration-500 hover:scale-110">
            ${donation.amount.toLocaleString()}
          </span>
          <span className="text-xs sm:text-sm opacity-75">
            {formatDate(donation.donationDate)}
          </span>
        </div>
      </div>

      {/* Contact Information */}
      <div className={`text-white mb-4 flex-1 transform transition-all duration-800 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 150 + 400}ms` }}
      >
        <div className="mb-2">
          <span className="text-xs sm:text-sm opacity-75">Email:</span>
          <p className="text-xs sm:text-sm truncate">{donation.donarEmail}</p>
        </div>
        <div className="mb-4">
          <span className="text-xs sm:text-sm opacity-75">Phone:</span>
          <p className="text-xs sm:text-sm break-all">{donation.donarPhoneNo}</p>
        </div>
        
        {/* Message */}
        <div>
          <span className="text-xs sm:text-sm opacity-75">Message:</span>
          <p className="text-xs sm:text-sm leading-relaxed opacity-90 mt-1">
            {donation.message ? 
              (donation.message.length > 80 ? 
                `${donation.message.substring(0, 80)}...` : 
                donation.message) : 
              'No message provided'}
          </p>
        </div>
      </div>
    </div>
  );
};

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('http://localhost:8000/donates/getDonarDetails');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        console.log('Fetched Data:', data); // Log the data to check its structure
        
        // Ensure each donation has a valid date
        const updatedDonations = data.donars.map(donation => ({
          ...donation,
          date: donation.donationDate ? new Date(donation.donationDate) : generateRandomDate()
        }));

        setDonations(updatedDonations.reverse()); // Reverse the order of donations
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        // Trigger fade-in animation after data loads
        setTimeout(() => setFadeIn(true), 100);
      }
    };

    fetchDonations();
  }, []);

  // Calculate the total donation amount
  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003E1F]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-4 sm:py-8 px-4 sm:px-6 mt-16 sm:mt-24">
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

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-12 transform transition-all duration-1000 ease-out ${
          fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 animate-fadeInDown" style={{ color: '#003E1F' }}>
            Donation Records
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg px-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Comprehensive overview of all donations and contribution trends
          </p>
        </div>
        
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 sm:p-8 max-w-md mx-auto animate-scaleIn">
              <div className="text-base sm:text-lg font-medium text-red-600 mb-2">Error Loading Data</div>
              <div className="text-red-500 text-sm sm:text-base">{error}</div>
            </div>
          </div>
        )}
        
        {!loading && !error && donations.length > 0 && (
          <>
            {/* Total Amount Summary */}
            <div className={`text-center mb-8 sm:mb-12 transform transition-all duration-1000 ease-out ${
              fadeIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            style={{ transitionDelay: '0.3s' }}
            >
              <div className="inline-block bg-white rounded-3xl p-4 sm:p-8 shadow-xl border-2 w-full max-w-sm transition-all duration-500 hover:scale-105" style={{ borderColor: '#003E1F' }}>
                <div className="flex items-center gap-3 sm:gap-4 justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#003E1F] rounded-2xl flex items-center justify-center flex-shrink-0 transform transition-all duration-500 hover:scale-110 hover:rotate-12">
                    <svg width="24" height="24" className="sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6" stroke="#32CD32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Donations</div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#32CD32] transition-all duration-500 hover:scale-110">${totalAmount.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <div className={`bg-white rounded-3xl shadow-xl border-2 p-4 sm:p-8 mb-8 sm:mb-12 transform transition-all duration-1000 ease-out ${
              fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ borderColor: '#003E1F', transitionDelay: '0.5s' }}
            >
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#003E1F] rounded-2xl flex items-center justify-center flex-shrink-0 transform transition-all duration-500 hover:scale-110 hover:rotate-12">
                  <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3V21H21" stroke="#32CD32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 9L12 6L16 10L21 5" stroke="#32CD32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold truncate" style={{ color: '#003E1F' }}>
                    Donation Trends
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">Track donation patterns and cash flow</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-3 sm:p-6">
                <ApexCharts
                  options={chartData(donations).options}
                  series={chartData(donations).series}
                  type="line"
                  height={300}
                />
              </div>
            </div>

            {/* Donation Cards Grid */}
            <div className={`bg-white rounded-3xl shadow-xl border-2 p-4 sm:p-8 transform transition-all duration-1000 ease-out ${
              fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ borderColor: '#003E1F', transitionDelay: '0.7s' }}
            >
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#003E1F] rounded-2xl flex items-center justify-center flex-shrink-0 transform transition-all duration-500 hover:scale-110 hover:rotate-12">
                  <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#32CD32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="7" r="4" stroke="#32CD32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 21V19C22 18.1645 21.7155 17.3541 21.2094 16.6977C20.7033 16.0414 19.9996 15.5743 19.2 15.3706" stroke="#32CD32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 3.13C15.8003 3.33256 16.5056 3.79955 17.0134 4.45606C17.5212 5.11256 17.8066 5.92299 17.8066 6.76C17.8066 7.59701 17.5212 8.40744 17.0134 9.06394C16.5056 9.72045 15.8003 10.1874 15 10.39" stroke="#32CD32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold truncate" style={{ color: '#003E1F' }}>
                    Donor Details
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">Individual donor information and contributions</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {donations.map((donation, index) => (
                  <DonationCard key={donation._id} donation={donation} index={index} />
                ))}
              </div>
            </div>
          </>
        )}
        
        {!loading && !error && donations.length === 0 && (
          <div className={`text-center py-12 transform transition-all duration-1000 ease-out ${
            fadeIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}>
            <div className="bg-white rounded-3xl shadow-xl border-2 p-8 sm:p-12 max-w-md mx-auto animate-scaleIn" style={{ borderColor: '#003E1F' }}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-all duration-500 hover:scale-110 hover:rotate-12">
                <svg width="24" height="24" className="sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#003E1F" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-base sm:text-lg font-medium text-[#003E1F] animate-fadeInUp" style={{ animationDelay: '0.2s' }}>No donation records found</div>
              <div className="text-gray-600 mt-2 text-sm sm:text-base animate-fadeInUp" style={{ animationDelay: '0.4s' }}>Check back later for new donations</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDonations;