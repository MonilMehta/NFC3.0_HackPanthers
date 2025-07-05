import React, { useState, useEffect, useRef } from 'react';

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

const AdminNotification = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [headerRef, headerVisible] = useIntersectionObserver(0.1);
  const [formRef, formVisible] = useIntersectionObserver(0.1);

  useEffect(() => {
    // Trigger initial fade-in animation
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError('Please enter a message before sending.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:8000/message/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageContent: message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      setSuccess('Message sent successfully to all users!');
      setMessage(''); // Clear message input
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white min-h-screen mt-16 sm:mt-20 lg:mt-24">
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
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div 
          ref={headerRef}
          className={`mb-6 sm:mb-8 transform transition-all duration-1000 ease-out ${
            headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 transform transition-all duration-800 ease-out ${
            fadeIn ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`} 
          style={{ color: '#003E1F', transitionDelay: '0.2s' }}
          >
            Send Notifications
          </h1>
          <p className={`text-gray-600 text-sm sm:text-base lg:text-lg transform transition-all duration-800 ease-out ${
            fadeIn ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}
          style={{ transitionDelay: '0.4s' }}
          >
            Send important messages and updates to all users
          </p>
        </div>

        {/* Main Form Card */}
        <div 
          ref={formRef}
          className={`bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 p-4 sm:p-6 lg:p-8 transform transition-all duration-1000 ease-out hover:shadow-2xl hover:scale-[1.02] ${
            formVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
          }`} 
          style={{ borderColor: '#003E1F', transitionDelay: '0.3s' }}
        >
          <div className="space-y-6 sm:space-y-8">
            
            {/* Message Section */}
            <div className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2 transform transition-all duration-800 ease-out hover:shadow-xl hover:scale-[1.01] ${
              formVisible ? 'translate-y-0 opacity-100' : 'translate-y-15 opacity-0'
            }`} 
            style={{ borderColor: '#003E1F', transitionDelay: '0.5s' }}
            >
              <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 transform transition-all duration-600 ease-out ${
                formVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`} 
              style={{ color: '#003E1F', transitionDelay: '0.7s' }}
              >
                <svg width="20" height="20" className="sm:w-6 sm:h-6 transition-all duration-300 hover:scale-110 hover:rotate-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-base sm:text-lg lg:text-xl">Notification</span>
              </h3>
              
              <div className={`transform transition-all duration-800 ease-out ${
                formVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '0.9s' }}
              >
                <label className="block text-xs sm:text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                  Message Content *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={8}
                  required
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 resize-none bg-white placeholder-gray-400 text-sm sm:text-base hover:shadow-lg focus:scale-[1.01] transform"
                  style={{ borderColor: '#003E1F', color: '#003E1F' }}
                  placeholder="Type your notification message here... This message will be sent to all users."
                />
                <div className="mt-2 text-xs sm:text-sm text-gray-500 flex items-center gap-1 sm:gap-2 transition-all duration-300 hover:text-gray-700">
                  <svg width="14" height="14" className="sm:w-4 sm:h-4 transition-all duration-300 hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Character count: {message.length}
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-start sm:items-center gap-2 sm:gap-3 animate-fadeInUp transform transition-all duration-500 hover:scale-[1.02]">
                <svg width="20" height="20" className="sm:w-6 sm:h-6 flex-shrink-0 mt-0.5 sm:mt-0 animate-pulse-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#dc2626" strokeWidth="2"/>
                  <line x1="15" y1="9" x2="9" y2="15" stroke="#dc2626" strokeWidth="2"/>
                  <line x1="9" y1="9" x2="15" y2="15" stroke="#dc2626" strokeWidth="2"/>
                </svg>
                <span className="text-red-700 font-medium text-sm sm:text-base">{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-start sm:items-center gap-2 sm:gap-3 animate-fadeInUp transform transition-all duration-500 hover:scale-[1.02]">
                <svg width="20" height="20" className="sm:w-6 sm:h-6 flex-shrink-0 mt-0.5 sm:mt-0 animate-pulse-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4905 2.02168 11.3363C2.16356 9.18219 2.99721 7.13619 4.39828 5.49696C5.79935 3.85773 7.69279 2.71867 9.79619 2.24618C11.8996 1.77369 14.1003 1.98492 16.07 2.85" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,4 12,14.01 9,11.01" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-green-700 font-medium text-sm sm:text-base">{success}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 transform transition-all duration-800 ease-out ${
              formVisible ? 'translate-y-0 opacity-100' : 'translate-y-15 opacity-0'
            }`}
            style={{ transitionDelay: '1.1s' }}
            >
              <button
                type="button"
                onClick={() => {
                  setMessage('');
                  setError('');
                  setSuccess('');
                }}
                className="w-full sm:w-auto text-gray-700 font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-xl sm:rounded-2xl border-2 border-gray-300 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base order-2 sm:order-1"
              >
                Clear Message
              </button>
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={isLoading || !message.trim()}
                className={`w-full sm:w-auto text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base order-1 sm:order-2 ${
                  isLoading || !message.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-800'
                }`}
                style={{ backgroundColor: '#003E1F' }}
              >
                {isLoading ? (
                  <>
                    <svg width="16" height="16" className="sm:w-5 sm:h-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="31.416" strokeDashoffset="31.416">
                        <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                        <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                      </circle>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" className="sm:w-5 sm:h-5 transition-all duration-300 hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2"/>
                      <polygon points="22,2 15,22 11,13 2,9 22,2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>Send Notification</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotification;