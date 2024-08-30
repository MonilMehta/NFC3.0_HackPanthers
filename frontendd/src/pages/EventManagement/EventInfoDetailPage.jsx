import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import Navbar from "../../components/Navbar";
import axios from "axios";

const EventInfoDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/events/getEvent/${eventId}`)
      .then((response) => {
        if (response.data) {
          console.log(response)
          setEvent({
            name: response.data.eventName,
            organizer: response.data.organizer,
            date: response.data.date,
            description: response.data.description,
            location: {
              address: response.data.location.address,
              city: response.data.location.city,
              state: response.data.location.state,
              zipCode: response.data.location.zipCode,
              country: response.data.location.country,
            },
            volunteers: response.data.volunteers,
            staff: response.data.staff,
          });
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the event data!", error);
      });
  }, [eventId]);

  const handleVolunteerClick = () => {
    if (event) {
      const doc = new jsPDF();
  
      doc.setFontSize(22);
      doc.text("Certificate of Appreciation", 20, 30);
      doc.setFontSize(16);
      doc.text(`This is to certify that you have volunteered for the event:`, 20, 50);
      doc.text(event.name, 20, 60);
      doc.text(`Organized by: ${event.organizer}`, 20, 70);
      doc.text(`Date: ${event.date}`, 20, 80);
  
      doc.setFontSize(12);
      doc.text(
        `Location: ${event.location.address}, ${event.location.city}, ${event.location.state}, ${event.location.zipCode}, ${event.location.country}`,
        20,
        90
      );
  
      doc.setFontSize(16);
      doc.text("Thank you for your contribution!", 20, 110);
  
      doc.save("appreciation-certificate.pdf");
    }
  };

  return (
    <>
      <Navbar />
      {event ? (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#004d00",
            minHeight: "100vh",
          }}
        >
          <h1 style={{ textAlign: "center", color: "#ffffff" }}>
            {event.name}
          </h1>

          <div
            style={{
              maxWidth: "800px",
              margin: "20px auto",
              backgroundColor: "#006400",
              padding: "20px",
              borderRadius: "8px",
              color: "#ffffff",
            }}
          >
            <h2>{event.name}</h2>
            <p>Organizer: {event.organizer}</p>
            <p>Date: {event.date}</p>
            <p>
              Address: {event.location.address}, {event.location.city},{" "}
              {event.location.state}, {event.location.zipCode},{" "}
              {event.location.country}
            </p>
            <p>Description: {event.description}</p>
          </div>

          <div
            style={{
              maxWidth: "800px",
              margin: "20px auto",
              backgroundColor: "#006400",
              padding: "20px",
              borderRadius: "8px",
              color: "#ffffff",
            }}
          >
            <h2 style={{ textAlign: "center", color: "#ffffff" }}>
              Staff Members
            </h2>
            <table
              style={{
                width: "100%",
                margin: "0 auto",
                borderCollapse: "collapse",
                color: "#ffffff",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#004d00" }}>
                  <th style={{ padding: "10px", border: "1px solid #ffffff" }}>
                    First Name
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ffffff" }}>
                    Last Name
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ffffff" }}>
                    Email
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ffffff" }}>
                    Phone Number
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ffffff" }}>
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {event.staff.map((member, index) => (
                  <tr key={index}>
                    <td
                      style={{ padding: "10px", border: "1px solid #ffffff" }}
                    >
                      {member.firstName}
                    </td>
                    <td
                      style={{ padding: "10px", border: "1px solid #ffffff" }}
                    >
                      {member.lastName}
                    </td>
                    <td
                      style={{ padding: "10px", border: "1px solid #ffffff" }}
                    >
                      {member.email}
                    </td>
                    <td
                      style={{ padding: "10px", border: "1px solid #ffffff" }}
                    >
                      {member.phoneNo}
                    </td>
                    <td
                      style={{ padding: "10px", border: "1px solid #ffffff" }}
                    >
                      {member.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              maxWidth: "800px",
              margin: "20px auto",
              backgroundColor: "#006400",
              padding: "20px",
              borderRadius: "8px",
              color: "#ffffff",
            }}
          >
            <h2 style={{ textAlign: "center", color: "#ffffff" }}>
              Volunteers
            </h2>
            <table
              style={{
                width: "100%",
                margin: "0 auto",
                borderCollapse: "collapse",
                color: "#ffffff",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#004d00" }}>
                  <th style={{ padding: "10px", border: "1px solid #ffffff" }}>
                    Volunteer Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {event.volunteers.map((volunteer, index) => (
                  <tr key={index}>
                    <td
                      style={{ padding: "10px", border: "1px solid #ffffff" }}
                    >
                      {volunteer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={handleVolunteerClick}
              style={{
                backgroundColor: "#006400",
                color: "#ffffff",
                border: "none",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Generate Certificate
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default EventInfoDetailsPage;
