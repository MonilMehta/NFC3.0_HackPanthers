import React, { useState } from 'react';

// Custom flow chart component
const FlowChart = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { id: 1, title: 'You Donate', description: 'Your generous contribution starts the journey' },
    { id: 2, title: 'Donation Received', description: 'We receive and process your donation securely' },
    { id: 3, title: 'ChileCare NGO', description: 'Our organization allocates funds transparently' },
    { id: 4, title: 'Events & Projects', description: 'Your donation creates real impact' }
  ];

  const renderArrow = (isActive) => (
    <div className={`flex items-center justify-center mx-4 ${isActive ? 'animate-pulse' : ''}`}>
      <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 2L38 10L30 18M2 10H38" stroke={isActive ? '#22c55e' : '#003E1F'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );

  return (
    <div className="w-full">
      {/* Desktop Flow */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between p-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div 
                className={`flex-1 max-w-xs cursor-pointer transition-all duration-300 ${
                  activeStep === index ? 'transform scale-105' : ''
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`rounded-3xl p-6 text-center shadow-lg border-2 transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-gradient-to-br from-green-50 to-green-100 shadow-xl' 
                    : 'bg-white hover:bg-gray-50'
                } border-green-800 text-white`}
                style={{ 
                  backgroundColor: activeStep === index ? undefined : '#003E1F',
                  borderColor: '#003E1F' 
                }}>
                  <h3 className={`text-lg font-bold mb-2 ${
                    activeStep === index ? 'text-green-700' : 'text-white'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm ${
                    activeStep === index ? 'text-green-600' : 'text-gray-300'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && renderArrow(activeStep === index)}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Mobile Flow */}
      <div className="md:hidden">
        <div className="space-y-6 p-4">
          {steps.map((step, index) => (
            <div key={step.id}>
              <div 
                className={`rounded-3xl p-6 shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                  activeStep === index 
                    ? 'bg-gradient-to-br from-green-50 to-green-100 shadow-xl' 
                    : 'text-white'
                }`}
                onClick={() => setActiveStep(index)}
                style={{ 
                  backgroundColor: activeStep === index ? undefined : '#003E1F',
                  borderColor: '#003E1F' 
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-1 ${
                      activeStep === index ? 'text-green-700' : 'text-white'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${
                      activeStep === index ? 'text-green-600' : 'text-gray-300'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <svg width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10L10 18L18 10M10 2V38" stroke={activeStep === index ? '#22c55e' : '#003E1F'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="flex justify-center mt-8 space-x-2">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeStep === index ? 'bg-green-500 w-8' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

function Flow() {

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3" style={{ color: '#003E1F' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 3C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.509 2.99902 7.05 3C5.591 2.99902 4.1917 3.5783 3.16 4.61C2.1283 5.6417 1.54902 7.041 1.55 8.5C1.54902 9.959 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.9379 22.4518 9.2225 22.45 8.5C22.4518 7.7775 22.3095 7.0621 22.0329 6.3947C21.7563 5.7272 21.351 5.1208 20.84 4.61Z" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Donation Flow
          </h1>
          <p className="text-gray-600 text-lg">
            See how your generous donations make a difference in our community
          </p>
        </div>

        {/* Flow Container */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2" style={{ borderColor: '#003E1F' }}>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3" style={{ color: '#003E1F' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            How Your Donation Flows
          </h2>
          
          <FlowChart />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-[#003E1F] rounded-3xl p-6 shadow-lg border-2" style={{ borderColor: '#003E1F' }}>
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2" style={{ color: '#ffffff' }}>Direct Impact</h3>
              <p className="text-white text-sm">Your donations directly fund community events and development projects that create lasting change in people's lives.</p>
            </div>
          </div>

          <div className="bg-[#003E1F] rounded-3xl p-6 shadow-lg border-2" style={{ borderColor: '#003E1F' }}>
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2" style={{ color: '#ffffff' }}>Full Transparency</h3>
              <p className="text-white text-sm">We provide complete transparency on how your donations are used, with detailed reports and regular updates on project progress.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flow;