import React from 'react';

const DonationText = () => {
  return (
    <div className="h-full py-8">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4" style={{ color: '#003E1F' }}>
            Support Children's Futures Today
          </h1>
          <p className="text-gray-600 text-base">
            Your donation is instrumental in improving the lives of children in need
          </p>
        </div>

        {/* Main Content Container */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border-2" style={{ borderColor: '#003E1F' }}>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: '#003E1F' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Making a Difference Together
          </h2>

          <div className="space-y-6">
            {/* Impact Section */}
            <div className="bg-gray-50 rounded-2xl p-4 border-l-4" style={{ borderLeftColor: '#003E1F' }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#003E1F' }}>
                Your Impact
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Each contribution helps us provide essential services such as education, healthcare, 
                and emotional support to vulnerable children. With your support, we can address urgent needs 
                and create a brighter future for every child. No matter the size, your donation has a profound impact.
              </p>
            </div>

            {/* Community Section */}
            <div className="bg-gray-50 rounded-2xl p-4 border-l-4" style={{ borderLeftColor: '#003E1F' }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#003E1F' }}>
                Community & Collective Action
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We believe in the power of community and collective action. Every donation enables us to fund 
                programs that nurture and protect children, helping them reach their full potential. By supporting us, 
                you join a network of compassionate individuals committed to making a difference in the lives of children.
              </p>
            </div>

            {/* Transparency Section */}
            <div className="bg-gray-50 rounded-2xl p-4 border-l-4" style={{ borderLeftColor: '#003E1F' }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#003E1F' }}>
                Transparency & Accountability
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our organization is dedicated to transparency and effective use of resources. We ensure that 
                every donation is directed towards initiatives that deliver real, positive outcomes for children. 
                You can be assured that your support is making a meaningful difference in building a better world for all.
              </p>
            </div>

            {/* Gratitude Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border-2" style={{ borderColor: '#003E1F' }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#003E1F' }}>
                Our Gratitude
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Thank you for your invaluable contribution and for standing with us in our mission. Your support 
                drives our efforts and brings hope to countless children. We are deeply grateful for your commitment 
                and generosity, which empower us to continue our work.
              </p>
            </div>

            {/* Contact Section */}
            <div className="text-center p-4 bg-white rounded-2xl border-2" style={{ borderColor: '#003E1F' }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#003E1F' }}>
                Questions? We're Here to Help
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions or need more information about our programs or how your donation is utilized, 
                please feel free to reach out. We are here to provide any additional details you need and to ensure 
                a fulfilling giving experience.
              </p>
              
              <div className="flex justify-center">
                <button 
                  className="text-white font-bold py-3 px-6 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                  style={{ backgroundColor: '#003E1F' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  info@nurturenest.org
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Together, let's continue to make a difference and create a brighter future for every child.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationText;