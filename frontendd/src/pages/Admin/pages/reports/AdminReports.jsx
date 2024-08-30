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
    <div style={styles.container}>
      <h1 style={styles.heading}>Create Event Report</h1>

      <div style={styles.card}>
        <h2 style={styles.subheading}>Event Details</h2>
        <label style={styles.label}>Event Name</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
          style={styles.input}
        />
        <label style={styles.label}>Event Date</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Address</label>
        <input
          type="text"
          value={eventAddress}
          onChange={(e) => setEventAddress(e.target.value)}
          placeholder="Address"
          style={styles.input}
        />
        <label style={styles.label}>City</label>
        <input
          type="text"
          value={eventCity}
          onChange={(e) => setEventCity(e.target.value)}
          placeholder="City"
          style={styles.input}
        />
        <label style={styles.label}>State</label>
        <input
          type="text"
          value={eventState}
          onChange={(e) => setEventState(e.target.value)}
          placeholder="State"
          style={styles.input}
        />
        <label style={styles.label}>Zip Code</label>
        <input
          type="text"
          value={eventZipCode}
          onChange={(e) => setEventZipCode(e.target.value)}
          placeholder="Zip Code"
          style={styles.input}
        />
        <label style={styles.label}>Country</label>
        <input
          type="text"
          value={eventCountry}
          onChange={(e) => setEventCountry(e.target.value)}
          placeholder="Country"
          style={styles.input}
        />
        <label style={styles.label}>Organizer</label>
        <input
          type="text"
          value={eventOrganizer}
          onChange={(e) => setEventOrganizer(e.target.value)}
          placeholder="Organizer"
          style={styles.input}
        />
      </div>

      <div style={styles.card}>
        <h2 style={styles.subheading}>Description</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event Description"
          style={styles.textarea}
        />
      </div>

      <div style={styles.card}>
        <h2 style={styles.subheading}>Staff Members</h2>
        {staff.map((member, index) => (
          <div key={index} style={styles.tableRow}>
            <input
              type="text"
              value={member.name}
              onChange={(e) => handleStaffChange(index, 'name', e.target.value)}
              placeholder="Name"
              style={styles.tableInput}
            />
            <input
              type="text"
              value={member.phone}
              onChange={(e) => handleStaffChange(index, 'phone', e.target.value)}
              placeholder="Phone Number"
              style={styles.tableInput}
            />
            <button onClick={() => removeStaff(index)} style={styles.removeButton}>Remove</button>
          </div>
        ))}
        <button onClick={addStaff} style={styles.addButton}>Add Staff</button>
      </div>

      <div style={styles.card}>
        <h2 style={styles.subheading}>Volunteers</h2>
        {volunteers.map((volunteer, index) => (
          <div key={index} style={styles.tableRow}>
            <input
              type="text"
              value={volunteer.name}
              onChange={(e) => handleVolunteerChange(index, 'name', e.target.value)}
              placeholder="Name"
              style={styles.tableInput}
            />
            <input
              type="text"
              value={volunteer.phone}
              onChange={(e) => handleVolunteerChange(index, 'phone', e.target.value)}
              placeholder="Phone Number"
              style={styles.tableInput}
            />
            <button onClick={() => removeVolunteer(index)} style={styles.removeButton}>Remove</button>
          </div>
        ))}
        <button onClick={addVolunteer} style={styles.addButton}>Add Volunteer</button>
      </div>

      <div style={styles.card}>
        <h2 style={styles.subheading}>Add Images</h2>
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          style={styles.fileInput}
        />
        <div style={styles.imagePreview}>
          {images.map((src, index) => (
            <img key={index} src={src} alt={`Preview ${index}`} style={styles.image} />
          ))}
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.subheading}>Conclusion</h2>
        <textarea
          value={conclusion}
          onChange={(e) => setConclusion(e.target.value)}
          placeholder="Conclusion"
          style={styles.textarea}
        />
      </div>

      <button onClick={handleGeneratePDF} style={styles.generateButton}>Create Report</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  card: {
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  subheading: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    minHeight: '100px',
  },
  tableRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  tableInput: {
    flex: 1,
    padding: '8px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  addButton: {
    marginTop: '10px',
    padding: '10px 20px',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  removeButton: {
    marginLeft: '10px',
    padding: '10px 20px',
    borderRadius: '4px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  fileInput: {
    marginBottom: '10px',
  },
  imagePreview: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  image: {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    marginRight: '10px',
    marginBottom: '10px',
  },
  generateButton: {
    padding: '10px 20px',
    borderRadius: '4px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default AdminReports;
