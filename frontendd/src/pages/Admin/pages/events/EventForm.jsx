import React, { useState, useEffect } from 'react';

const EventForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    date: '',
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    organizer: '',
    status: 'Scheduled' // Default status
  });
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);

  useEffect(() => {
    // Fetch staff list from API
    const fetchStaffList = async () => {
      try {
        const response = await fetch('http://localhost:8000/events/getStaff');
        if (response.ok) {
          const staffData = await response.json();
          setStaffList(staffData);
        } else {
          console.error('Error fetching staff list:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching staff list:', error);
      }
    };

    fetchStaffList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value
      }
    }));
  };

  const handleStaffChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedStaff(prev => [...prev, value]);
    } else {
      setSelectedStaff(prev => prev.filter(id => id !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      date: new Date(formData.date).toISOString(), // Convert date to ISO string if needed
      staff: selectedStaff // Array of staff IDs
    };
    try {
      const response = await fetch('http://localhost:8000/events/createEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Event created successfully:', result);
        if (onClose) onClose(); // Close the modal on successful submission
      } else {
        console.error('Error creating event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="p-8 bg-white rounded-3xl shadow-xl border-2" style={{ borderColor: '#003E1F' }}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Event Name */}
        <div>
          <label className="block text-sm font-semibold mb-3" style={{ color: '#003E1F' }}>
            Event Name *
          </label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
            className="w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400"
            style={{ borderColor: '#003E1F', color: '#003E1F' }}
            placeholder="Enter event name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-3" style={{ color: '#003E1F' }}>
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 resize-none bg-white placeholder-gray-400"
            style={{ borderColor: '#003E1F', color: '#003E1F' }}
            placeholder="Enter event description"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold mb-3" style={{ color: '#003E1F' }}>
            Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white"
            style={{ borderColor: '#003E1F', color: '#003E1F' }}
          />
        </div>

        {/* Location Section */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2" style={{ borderColor: '#003E1F' }}>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: '#003E1F' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="10" r="3" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Location
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-3" style={{ color: '#003E1F' }}>
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.location.address}
                onChange={handleLocationChange}
                required
                className="w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400"
                style={{ borderColor: '#003E1F', color: '#003E1F' }}
                placeholder="Enter address"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: '#003E1F' }}>
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.location.city}
                onChange={handleLocationChange}
                required
                className="w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400"
                style={{ borderColor: '#003E1F', color: '#003E1F' }}
                placeholder="Enter city"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: '#003E1F' }}>
                State *
              </label>
              <input
                type="text"
                name="state"
                value={formData.location.state}
                onChange={handleLocationChange}
                required
                className="w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400"
                style={{ borderColor: '#003E1F', color: '#003E1F' }}
                placeholder="Enter state"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: '#003E1F' }}>
                Zip Code *
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.location.zipCode}
                onChange={handleLocationChange}
                required
                className="w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400"
                style={{ borderColor: '#003E1F', color: '#003E1F' }}
                placeholder="Enter zip code"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: '#003E1F' }}>
                Country *
              </label>
              <input
                type="text"
                name="country"
                value={formData.location.country}
                onChange={handleLocationChange}
                required
                className="w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400"
                style={{ borderColor: '#003E1F', color: '#003E1F' }}
                placeholder="Enter country"
              />
            </div>
          </div>
        </div>

        {/* Organizer */}
        <div>
          <label className="block text-sm font-semibold mb-3" style={{ color: '#003E1F' }}>
            Organizer *
          </label>
          <input
            type="text"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            required
            className="w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white placeholder-gray-400"
            style={{ borderColor: '#003E1F', color: '#003E1F' }}
            placeholder="Enter organizer name"
          />
        </div>

        {/* Staff Selection */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2" style={{ borderColor: '#003E1F' }}>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: '#003E1F' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.6977C21.7033 16.0414 20.9996 15.5743 20.2 15.3706" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.13C16.8003 3.33256 17.5056 3.79955 18.0134 4.45606C18.5212 5.11256 18.8066 5.92299 18.8066 6.76C18.8066 7.59701 18.5212 8.40744 18.0134 9.06394C17.5056 9.72045 16.8003 10.1874 16 10.39" stroke="#003E1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Staff
          </h3>
          <div className="max-h-64 overflow-y-auto border-2 rounded-2xl p-6 bg-white shadow-lg space-y-3" style={{ borderColor: '#003E1F' }}>
            {staffList.map((staff) => (
              <div key={staff._id} className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 shadow-sm">
                <input
                  type="checkbox"
                  id={`staff-${staff._id}`}
                  value={staff._id}
                  checked={selectedStaff.includes(staff._id)}
                  onChange={handleStaffChange}
                  className="w-5 h-5 border-2 rounded-lg focus:ring-green-500 focus:ring-2 transition-all duration-300"
                  style={{ accentColor: '#003E1F', borderColor: '#003E1F' }}
                />
                <label 
                  htmlFor={`staff-${staff._id}`} 
                  className="ml-4 text-sm font-medium cursor-pointer"
                  style={{ color: '#003E1F' }}
                >
                  {staff.firstName} {staff.lastName}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold mb-3" style={{ color: '#003E1F' }}>
            Event Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white"
            style={{ borderColor: '#003E1F', color: '#003E1F' }}
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="text-white font-bold py-4 px-10 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3"
            style={{ backgroundColor: '#003E1F' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;