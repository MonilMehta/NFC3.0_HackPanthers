import React from 'react';
import jsPDF from 'jspdf';
import Navbar from '../../components/Navbar';

const eventDetailsData = {
  id: '1',
  name: 'Charity Gala',
  organizer: 'John Doe',
  date: '2024-12-10',
  location: {
    address: '123 Charity Lane',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62704',
    country: 'USA',
  },
  description: 'A grand event to raise funds for children’s education.',
  staff: [
    { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', phoneNo: '123-456-7890', role: 'Coordinator' },
    { firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', phoneNo: '234-567-8901', role: 'Volunteer Manager' },
    { firstName: 'Carol', lastName: 'Williams', email: 'carol@example.com', phoneNo: '345-678-9012', role: 'Marketing Lead' },
    { firstName: 'David', lastName: 'Brown', email: 'david@example.com', phoneNo: '456-789-0123', role: 'Logistics Manager' },
    { firstName: 'Eve', lastName: 'Davis', email: 'eve@example.com', phoneNo: '567-890-1234', role: 'Fundraising Coordinator' }
  ],
  volunteers: ['George', 'Hannah', 'Ivy', 'Jack', 'Karen']
};

const EventInfoDetailsPage = () => {
  const event = eventDetailsData;

  const handleVolunteerClick = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('Certificate of Appreciation', 20, 30);
    doc.setFontSize(16);
    doc.text(`This is to certify that you have volunteered for the event:`, 20, 50);
    doc.text(event.name, 20, 60);
    doc.text(`Organized by: ${event.organizer}`, 20, 70);
    doc.text(`Date: ${event.date}`, 20, 80);

    doc.setFontSize(12);
    doc.text(`Location: ${event.location.address}, ${event.location.city}, ${event.location.state}, ${event.location.zipCode}, ${event.location.country}`, 20, 90);

    doc.setFontSize(16);
    doc.text('Thank you for your contribution!', 20, 110);

    doc.save('appreciation-certificate.pdf');
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px', backgroundColor: '#004d00', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', color: '#ffffff' }}>{event.name}</h1>
        
        <div style={{ maxWidth: '800px', margin: '20px auto', backgroundColor: '#006400', padding: '20px', borderRadius: '8px', color: '#ffffff' }}>
          <h2>{event.name}</h2>
          <p>Organizer: {event.organizer}</p>
          <p>Date: {event.date}</p>
          <p>Address: {event.location.address}, {event.location.city}, {event.location.state}, {event.location.zipCode}, {event.location.country}</p>
          <p>Description: {event.description}</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '20px auto', backgroundColor: '#006400', padding: '20px', borderRadius: '8px', color: '#ffffff' }}>
          <h2 style={{ textAlign: 'center', color: '#ffffff' }}>Staff Members</h2>
          <table style={{ width: '100%', margin: '0 auto', borderCollapse: 'collapse', color: '#ffffff' }}>
            <thead>
              <tr style={{ backgroundColor: '#004d00' }}>
                <th style={{ padding: '10px', border: '1px solid #ffffff' }}>First Name</th>
                <th style={{ padding: '10px', border: '1px solid #ffffff' }}>Last Name</th>
                <th style={{ padding: '10px', border: '1px solid #ffffff' }}>Email</th>
                <th style={{ padding: '10px', border: '1px solid #ffffff' }}>Phone Number</th>
                <th style={{ padding: '10px', border: '1px solid #ffffff' }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {event.staff.map((member, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', border: '1px solid #ffffff' }}>{member.firstName}</td>
                  <td style={{ padding: '10px', border: '1px solid #ffffff' }}>{member.lastName}</td>
                  <td style={{ padding: '10px', border: '1px solid #ffffff' }}>{member.email}</td>
                  <td style={{ padding: '10px', border: '1px solid #ffffff' }}>{member.phoneNo}</td>
                  <td style={{ padding: '10px', border: '1px solid #ffffff' }}>{member.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ maxWidth: '800px', margin: '20px auto', backgroundColor: '#006400', padding: '20px', borderRadius: '8px', color: '#ffffff' }}>
          <h2 style={{ textAlign: 'center', color: '#ffffff' }}>Volunteers</h2>
          <table style={{ width: '100%', margin: '0 auto', borderCollapse: 'collapse', color: '#ffffff' }}>
            <thead>
              <tr style={{ backgroundColor: '#004d00' }}>
                <th style={{ padding: '10px', border: '1px solid #ffffff' }}>Volunteer Name</th>
              </tr>
            </thead>
            <tbody>
              {event.volunteers.map((volunteer, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', border: '1px solid #ffffff' }}>{volunteer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            onClick={handleVolunteerClick}
            style={{ 
              backgroundColor: '#006400', 
              color: '#ffffff', 
              border: 'none', 
              padding: '10px 20px', 
              fontSize: '16px', 
              cursor: 'pointer', 
              borderRadius: '4px' 
            }}
          >
            Volunteer Now
          </button>
        </div>
      </div>
    </>
  );
};

export default EventInfoDetailsPage;
