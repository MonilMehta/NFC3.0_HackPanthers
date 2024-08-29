import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AdminReports = () => {
  // Dummy event data
  const event = {
    name: 'Community Clean-Up Drive',
    location: 'Central Park, New York, NY',
    organizer: 'Green Earth Foundation',
    staff: [
      { name: 'John Doe', phone: '123-456-7890' },
      { name: 'Jane Smith', phone: '234-567-8901' },
      { name: 'Emily Johnson', phone: '345-678-9012' },
    ],
    volunteers: [
      { name: 'Alice Brown', phone: '456-789-0123' },
      { name: 'Bob White', phone: '567-890-1234' },
      { name: 'Charlie Black', phone: '678-901-2345' },
    ],
  };

  const [description, setDescription] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [images, setImages] = useState([]);

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
    doc.text(event.name, 14, 40);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Location:', 14, 50);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(event.location, 14, 58);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Organizer:', 14, 68);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(event.organizer, 14, 76);

    // Add description
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Description:', 14, 86);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(description, 14, 94, { maxWidth: 180 });

    // Add staff members table
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Staff Members:', 14, 110);
    doc.autoTable({
      startY: 118,
      head: [['Name', 'Phone Number']],
      body: event.staff.map((staff) => [staff.name, staff.phone]),
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
      body: event.volunteers.map((volunteer) => [volunteer.name, volunteer.phone]),
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

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Reports</h1>

      <div style={styles.card}>
        <h2 style={styles.eventName}>{event.name}</h2>
        <p style={styles.eventDetails}><strong>Location:</strong> {event.location}</p>
        <p style={styles.eventDetails}><strong>Organizer:</strong> {event.organizer}</p>

        <h3 style={styles.subheading}>Description</h3>
        <textarea
          style={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter event description..."
        />

        <h3 style={styles.subheading}>Add Images</h3>
        <input type="file" multiple onChange={handleImageUpload} style={styles.fileInput} />
        <div style={styles.imagePreviewContainer}>
          {images.map((src, index) => (
            <img key={index} src={src} alt={`upload-${index}`} style={styles.imagePreview} />
          ))}
        </div>

        <h3 style={styles.subheading}>Staff Members</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {event.staff.map((member, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{member.name}</td>
                <td style={styles.tableCell}>{member.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={styles.subheading}>Volunteers</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {event.volunteers.map((volunteer, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{volunteer.name}</td>
                <td style={styles.tableCell}>{volunteer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={styles.subheading}>Conclusion</h3>
        <textarea
          style={styles.textarea}
          value={conclusion}
          onChange={(e) => setConclusion(e.target.value)}
          placeholder="Enter conclusion..."
        />

        <button style={styles.reportButton} onClick={handleGeneratePDF}>
          Create Report
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  card: {
    display: 'inline-block',
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
    width: '500px',
  },
  eventName: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  eventDetails: {
    fontSize: '16px',
    marginBottom: '8px',
  },
  subheading: {
    fontSize: '20px',
    marginTop: '20px',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    minHeight: '80px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '20px',
    fontSize: '16px',
    boxSizing: 'border-box',
    overflow: 'auto',
  },
  fileInput: {
    display: 'block',
    marginBottom: '20px',
  },
  imagePreviewContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
  },
  imagePreview: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  reportButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#007acc',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    marginTop: '20px',
  },
};

export default AdminReports;
