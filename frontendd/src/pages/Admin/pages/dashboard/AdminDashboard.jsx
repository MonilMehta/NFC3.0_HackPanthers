import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

// Pie Chart Data
const generatePieData = (event) => {
  const staffCount = event.staff.length;
  const volunteerCount = event.volunteers.length;

  // Log staff and volunteer counts
  console.log(`Event: ${event.eventName}`);
  console.log(`Staff Count: ${staffCount}`);
  console.log(`Volunteer Count: ${volunteerCount}`);

  return {
    series: [staffCount, volunteerCount],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Staff", "Volunteers"],
      colors: ["#FF4560", "#00E396"],
      legend: {
        position: "bottom",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
            labels: {
              show: true,
            },
          },
        },
      },
      title: {
        text: `${event.eventName} Distribution`,
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          color: "#297045",
        },
      },
    },
  };
};

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://nurturenest-cvqz.onrender.com/events/getEventsDetails"
        ); // Use the correct URL
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const ongoingEvents = data.events.filter(
          (event) => event.status === "Ongoing"
        );
        setEvents(ongoingEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "flex-start",
        minHeight: "100vh", // Ensures it only takes up the full height if needed
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 2,
          fontFamily: "Arial, sans-serif",
          fontSize: "36px",
          fontWeight: "bold",
          color: "#204E4A",
        }}
      >
        Admin Dashboard
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {events.length > 0 ? (
          events.map((event) => (
            <Card key={event._id} sx={{ width: "48%", height: "auto", mb: 2 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    mb: 2,
                    fontFamily: "Arial, sans-serif",
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#2E933C",
                  }}
                >
                  {event.eventName} (Donut Chart)
                </Typography>
                <ApexCharts
                  options={generatePieData(event).options}
                  series={generatePieData(event).series}
                  type="donut"
                  height={300}
                />
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography
            sx={{
              fontFamily: "Arial, sans-serif",
              fontSize: "20px",
              fontWeight: "500",
              color: "#204E4A",
            }}
          >
            No ongoing events to display.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
