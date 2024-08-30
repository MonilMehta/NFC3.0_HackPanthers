import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Box, Typography, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';

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
    const doc = new jsPDF();

    // Add event report heading
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('EVENT REPORT', 14, 22);

    // Add event details
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Event Name:', 14, 32);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(eventName, 14, 40);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Date:', 14, 50);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(eventDate, 14, 58);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Location:', 14, 68);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`${eventAddress}, ${eventCity}, ${eventState} ${eventZipCode}, ${eventCountry}`, 14, 76);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Organizer:', 14, 88);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(eventOrganizer, 14, 96);

    // Add description
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Description:', 14, 106);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(description, 14, 114, { maxWidth: 180 });

    // Add staff members table
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Staff Members:', 14, 130);
    doc.autoTable({
      startY: 138,
      head: [['Name', 'Phone Number']],
      body: staff.map((member) => [member.name, member.phone]),
      theme: 'striped',
      headStyles: { fillColor: [0, 122, 204] },
      margin: { left: 14 },
    });

    // Add volunteers table
    const staffTableEndY = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Volunteers:', 14, staffTableEndY + 10);
    doc.autoTable({
      startY: staffTableEndY + 18,
      head: [['Name', 'Phone Number']],
      body: volunteers.map((volunteer) => [volunteer.name, volunteer.phone]),
      theme: 'striped',
      headStyles: { fillColor: [0, 122, 204] },
      margin: { left: 14 },
    });

    // Add conclusion
    const volunteersTableEndY = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Conclusion:', 14, volunteersTableEndY + 10);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(conclusion, 14, volunteersTableEndY + 18, { maxWidth: 180 });

    // Positioning for the images
    let currentYPosition = doc.autoTable.previous.finalY + 20;
    const imageWidth = 70; // Increased the width of the images
    const imageHeight = 70; // Increased the height of the images
    const pageHeight = doc.internal.pageSize.height;

    images.forEach((src, index) => {
      if (currentYPosition + imageHeight > pageHeight - 20) {
        // If the current position is near the bottom, add a new page
        doc.addPage();
        currentYPosition = 20; // Reset position for new page
      }

      // Add image to the PDF
      doc.addImage(src, 'JPEG', 14, currentYPosition, imageWidth, imageHeight);
      currentYPosition += imageHeight + 10; // Move position down for the next image
    });

    doc.save('event-report.pdf');
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

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-4xl font-bold mb-6 text-[#204E4A]">
        Create Event Report
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
        <Typography variant="h6" className="text-xl font-semibold mb-4 text-2E933C">
          Event Details
        </Typography>
        <label className="block text-sm font-medium mb-2 text-297045">Event Name</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
          className="w-full p-2 mb-4 border rounded-md border-gray-300"
        />
        <label className="block text-sm font-medium mb-2 text-297045">Event Date</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md border-gray-300"
        />
        <label className="block text-sm font-medium mb-2 text-297045">Address</label>
        <input
          type="text"
          value={eventAddress}
          onChange={(e) => setEventAddress(e.target.value)}
          placeholder="Address"
          className="w-full p-2 mb-4 border rounded-md border-gray-300"
        />
        <label className="block text-sm font-medium mb-2 text-297045">City</label>
        <input
          type="text"
          value={eventCity}
          onChange={(e) => setEventCity(e.target.value)}
          placeholder="City"
          className="w-full p-2 mb-4 border rounded-md border-gray-300"
        />
        <label className="block text-sm font-medium mb-2 text-297045">State</label>
        <input
          type="text"
          value={eventState}
          onChange={(e) => setEventState(e.target.value)}
          placeholder="State"
          className="w-full p-2 mb-4 border rounded-md border-gray-300"
        />
        <label className="block text-sm font-medium mb-2 text-297045">Zip Code</label>
        <input
          type="text"
          value={eventZipCode}
          onChange={(e) => setEventZipCode(e.target.value)}
          placeholder="Zip Code"
          className="w-full p-2 mb-4 border rounded-md border-gray-300"
        />
        <label className="block text-sm font-medium mb-2 text-297045">Country</label>
        <input
          type="text"
          value={eventCountry}
          onChange={(e) => setEventCountry(e.target.value)}
          placeholder="Country"
          className="w-full p-2 mb-4 border rounded-md border-gray-300"
        />
        <label className="block text-sm font-medium mb-2 text-297045">Organizer</label>
        <input
          type="text"
          value={eventOrganizer}
          onChange={(e) => setEventOrganizer(e.target.value)}
          placeholder="Organizer"
          className="w-full p-2 mb-4 border rounded-md border-gray-300"
        />
        <label className="block text-sm font-medium mb-2 text-297045">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 mb-4 border rounded-md border-gray-300"
        />
        <label className="block text-sm font-medium mb-2 text-297045">Conclusion</label>
        <textarea
          value={conclusion}
          onChange={(e) => setConclusion(e.target.value)}
          placeholder="Conclusion"
          className="w-full p-2 mb-4 border rounded-md border-gray-300"
        />
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
        <Typography variant="h6" className="text-xl font-semibold mb-4 text-2E933C">
          Staff Members
        </Typography>
        {staff.map((member, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <input
              type="text"
              value={member.name}
              onChange={(e) => handleStaffChange(index, 'name', e.target.value)}
              placeholder="Name"
              className="w-full p-2 border rounded-md border-gray-300"
            />
            <input
              type="text"
              value={member.phone}
              onChange={(e) => handleStaffChange(index, 'phone', e.target.value)}
              placeholder="Phone"
              className="w-full p-2 border rounded-md border-gray-300"
            />
            <button
              onClick={() => removeStaff(index)}
              className="p-2 bg-red-500 text-white rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addStaff}
          className="bg-green-500 text-white py-2 px-4 rounded-md"
        >
          Add Staff
        </button>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
        <Typography variant="h6" className="text-xl font-semibold mb-4 text-2E933C">
          Volunteers
        </Typography>
        {volunteers.map((volunteer, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <input
              type="text"
              value={volunteer.name}
              onChange={(e) => handleVolunteerChange(index, 'name', e.target.value)}
              placeholder="Name"
              className="w-full p-2 border rounded-md border-gray-300"
            />
            <input
              type="text"
              value={volunteer.phone}
              onChange={(e) => handleVolunteerChange(index, 'phone', e.target.value)}
              placeholder="Phone"
              className="w-full p-2 border rounded-md border-gray-300"
            />
            <button
              onClick={() => removeVolunteer(index)}
              className="p-2 bg-red-500 text-white rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addVolunteer}
          className="bg-green-500 text-white py-2 px-4 rounded-md"
        >
          Add Volunteer
        </button>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
        <Typography variant="h6" className="text-xl font-semibold mb-4 text-2E933C">
          Images
        </Typography>
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          className="mb-4"
        />
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Event ${index}`}
            className="w-16 h-16 object-cover mb-4 mr-4 border rounded"
          />
        ))}
      </div>

      <button
        onClick={handleGeneratePDF}
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Generate Report
      </button>
    </div>
  );
};

export default AdminReports;
