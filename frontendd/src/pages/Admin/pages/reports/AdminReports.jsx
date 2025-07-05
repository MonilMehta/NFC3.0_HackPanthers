import React, { useState, useEffect } from 'react';

const AdminReports = () => {
  // State for event details
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventAddress, setEventAddress] = useState('');
  const [eventCity, setEventCity] = useState('');
  const [eventState, setEventState] = useState('');
  const [eventZipCode, setEventZipCode] = useState('');
  const [eventCountry, setEventCountry] = useState('');
  const [eventOrganizer, setEventOrganizer] = useState('');
  const [description, setDescription] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [staff, setStaff] = useState([{ name: '', phone: '' }]);
  const [volunteers, setVolunteers] = useState([{ name: '', phone: '' }]);
  const [images, setImages] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleGeneratePDF = () => {
    // Note: jsPDF functionality would need to be imported in a real implementation
    console.log('Generating PDF with data:', {
      eventName,
      eventDate,
      eventAddress,
      eventCity,
      eventState,
      eventZipCode,
      eventCountry,
      eventOrganizer,
      description,
      conclusion,
      staff,
      volunteers,
      images
    });
    alert('PDF generation functionality would be implemented here');
  };

  const addStaff = () => setStaff([...staff, { name: '', phone: '' }]);
  const removeStaff = (index) => setStaff(staff.filter((_, i) => i !== index));
  const handleStaffChange = (index, field, value) => {
    const updatedStaff = [...staff];
    updatedStaff[index][field] = value;
    setStaff(updatedStaff);
  };

  const addVolunteer = () => setVolunteers([...volunteers, { name: '', phone: '' }]);
  const removeVolunteer = (index) => setVolunteers(volunteers.filter((_, i) => i !== index));
  const handleVolunteerChange = (index, field, value) => {
    const updatedVolunteers = [...volunteers];
    updatedVolunteers[index][field] = value;
    setVolunteers(updatedVolunteers);
  };

  const handleSelectStaffChange = (event) => {
    setSelectedStaff(event.target.value);
  };

  useEffect(() => {
    // Mock staff data for demo
    setStaffList([
      { id: 1, name: 'John Doe', phone: '555-0123' },
      { id: 2, name: 'Jane Smith', phone: '555-0456' }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-white py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 mt-24">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4" style={{ color: '#003E1F' }}>
            Create Event Report
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4">
            Generate comprehensive event reports with detailed information and documentation
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Event Details Section */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border-2" style={{ borderColor: '#003E1F' }}>
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3" style={{ color: '#003E1F' }}>
              <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#003E1F" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="#003E1F" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="#003E1F" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="#003E1F" strokeWidth="2"/>
              </svg>
              Event Details
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                  Event Name *
                </label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Enter event name"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400 text-sm sm:text-base"
                  style={{ borderColor: '#003E1F', color: '#003E1F' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                  Event Date *
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white text-sm sm:text-base"
                  style={{ borderColor: '#003E1F', color: '#003E1F' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                  Organizer *
                </label>
                <input
                  type="text"
                  value={eventOrganizer}
                  onChange={(e) => setEventOrganizer(e.target.value)}
                  placeholder="Enter organizer name"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400 text-sm sm:text-base"
                  style={{ borderColor: '#003E1F', color: '#003E1F' }}
                />
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                  Address *
                </label>
                <input
                  type="text"
                  value={eventAddress}
                  onChange={(e) => setEventAddress(e.target.value)}
                  placeholder="Enter address"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400 text-sm sm:text-base"
                  style={{ borderColor: '#003E1F', color: '#003E1F' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                  City *
                </label>
                <input
                  type="text"
                  value={eventCity}
                  onChange={(e) => setEventCity(e.target.value)}
                  placeholder="Enter city"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400 text-sm sm:text-base"
                  style={{ borderColor: '#003E1F', color: '#003E1F' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                  State *
                </label>
                <input
                  type="text"
                  value={eventState}
                  onChange={(e) => setEventState(e.target.value)}
                  placeholder="Enter state"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400 text-sm sm:text-base"
                  style={{ borderColor: '#003E1F', color: '#003E1F' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                  Zip Code *
                </label>
                <input
                  type="text"
                  value={eventZipCode}
                  onChange={(e) => setEventZipCode(e.target.value)}
                  placeholder="Enter zip code"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400 text-sm sm:text-base"
                  style={{ borderColor: '#003E1F', color: '#003E1F' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                  Country *
                </label>
                <input
                  type="text"
                  value={eventCountry}
                  onChange={(e) => setEventCountry(e.target.value)}
                  placeholder="Enter country"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400 text-sm sm:text-base"
                  style={{ borderColor: '#003E1F', color: '#003E1F' }}
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter event description"
                rows={4}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 resize-none bg-white placeholder-gray-400 text-sm sm:text-base"
                style={{ borderColor: '#003E1F', color: '#003E1F' }}
              />
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                Conclusion *
              </label>
              <textarea
                value={conclusion}
                onChange={(e) => setConclusion(e.target.value)}
                placeholder="Enter event conclusion"
                rows={4}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 resize-none bg-white placeholder-gray-400 text-sm sm:text-base"
                style={{ borderColor: '#003E1F', color: '#003E1F' }}
              />
            </div>
          </div>

          {/* Staff Members Section */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border-2" style={{ borderColor: '#003E1F' }}>
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3" style={{ color: '#003E1F' }}>
              <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Staff Members
            </h2>
            
            <div className="space-y-4">
              {staff.map((member, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl">
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleStaffChange(index, 'name', e.target.value)}
                    placeholder="Staff member name"
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400 text-sm sm:text-base"
                    style={{ borderColor: '#003E1F', color: '#003E1F' }}
                  />
                  <input
                    type="text"
                    value={member.phone}
                    onChange={(e) => handleStaffChange(index, 'phone', e.target.value)}
                    placeholder="Phone number"
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400 text-sm sm:text-base"
                    style={{ borderColor: '#003E1F', color: '#003E1F' }}
                  />
                  <button
                    onClick={() => removeStaff(index)}
                    className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-red-500 text-white rounded-lg sm:rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto sm:mx-0">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
              
              <button
                onClick={addStaff}
                className="w-full py-3 sm:py-4 px-4 sm:px-6 border-2 border-dashed rounded-xl sm:rounded-2xl text-center transition-all duration-300 hover:bg-gray-50 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                style={{ borderColor: '#003E1F', color: '#003E1F' }}
              >
                <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add Staff Member
              </button>
            </div>
          </div>

          {/* Volunteers Section */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border-2" style={{ borderColor: '#003E1F' }}>
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
              {volunteers.map((volunteer, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl">
                  <input
                    type="text"
                    value={volunteer.name}
                    onChange={(e) => handleVolunteerChange(index, 'name', e.target.value)}
                    placeholder="Volunteer name"
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400 text-sm sm:text-base"
                    style={{ borderColor: '#003E1F', color: '#003E1F' }}
                  />
                  <input
                    type="text"
                    value={volunteer.phone}
                    onChange={(e) => handleVolunteerChange(index, 'phone', e.target.value)}
                    placeholder="Phone number"
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400 text-sm sm:text-base"
                    style={{ borderColor: '#003E1F', color: '#003E1F' }}
                  />
                  <button
                    onClick={() => removeVolunteer(index)}
                    className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-red-500 text-white rounded-lg sm:rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto sm:mx-0">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
              
              <button
                onClick={addVolunteer}
                className="w-full py-3 sm:py-4 px-4 sm:px-6 border-2 border-dashed rounded-xl sm:rounded-2xl text-center transition-all duration-300 hover:bg-gray-50 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                style={{ borderColor: '#003E1F', color: '#003E1F' }}
              >
                <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add Volunteer
              </button>
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border-2" style={{ borderColor: '#003E1F' }}>
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3" style={{ color: '#003E1F' }}>
              <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#003E1F" strokeWidth="2"/>
                <circle cx="8.5" cy="8.5" r="1.5" stroke="#003E1F" strokeWidth="2"/>
                <path d="M21 15L16 10L5 21" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Event Images
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 sm:mb-3" style={{ color: '#003E1F' }}>
                Upload Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-dashed rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-lg sm:file:rounded-xl file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 text-sm sm:text-base"
                style={{ borderColor: '#003E1F', color: '#003E1F' }}
              />
            </div>
            
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {images.map((src, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={src}
                      alt={`Event ${index + 1}`}
                      className="w-full h-20 sm:h-24 object-cover rounded-xl sm:rounded-2xl border-2 shadow-md transition-all duration-300 group-hover:scale-105"
                      style={{ borderColor: '#003E1F' }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl sm:rounded-2xl transition-all duration-300"></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Generate Report Button */}
          <div className="flex justify-center pt-6 sm:pt-8">
            <button
              onClick={handleGeneratePDF}
              className="w-full sm:w-auto text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
              style={{ backgroundColor: '#003E1F' }}
            >
              <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Generate Event Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;