import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReportIcon from "@mui/icons-material/Report";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";

const AdminSidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        minWidth: 250, // Ensures a fixed width
        maxWidth: 250, // Ensures a fixed width
        bgcolor: "#1e1e2d",
        minheight: "200vh", // Full viewport height
        color: "#ecf0f1",
      }}
    >
      <List>
        <ListItem 
          button 
          component={Link} 
          to="/admin/"
          sx={{
            '&:hover': {
              bgcolor: '#ecf0f1',
              color: '#1e1e2d',
            },
          }}
        >
          <ListItemIcon 
            sx={{
              color: 'inherit',
              '&:hover': {
                color: '#1e1e2d',
              },
            }}
          >
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            sx={{
              color: 'inherit',
              '&:hover': {
                color: '#1e1e2d',
              },
              whiteSpace: 'nowrap', // Prevents text wrapping
            }}
          />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/admin/projects"
          sx={{
            '&:hover': {
              bgcolor: '#ecf0f1',
              color: '#1e1e2d',
            },
          }}
        >
          <ListItemIcon 
            sx={{
              color: 'inherit',
              '&:hover': {
                color: '#1e1e2d',
              },
            }}
          >
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText
            primary="Projects"
            sx={{
              color: 'inherit',
              '&:hover': {
                color: '#1e1e2d',
              },
              whiteSpace: 'nowrap', // Prevents text wrapping
            }}
          />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/admin/donations"
          sx={{
            '&:hover': {
              bgcolor: '#ecf0f1',
              color: '#1e1e2d',
            },
          }}
        >
          <ListItemIcon 
            sx={{
              color: 'inherit',
              '&:hover': {
                color: '#1e1e2d',
              },
            }}
          >
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText
            primary="Donations"
            sx={{
              color: 'inherit',
              '&:hover': {
                color: '#1e1e2d',
              },
              whiteSpace: 'nowrap', // Prevents text wrapping
            }}
          />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/admin/reports"
          sx={{
            '&:hover': {
              bgcolor: '#ecf0f1',
              color: '#1e1e2d',
            },
          }}
        >
          <ListItemIcon 
            sx={{
              color: 'inherit',
              '&:hover': {
                color: '#1e1e2d',
              },
            }}
          >
            <ReportIcon />
          </ListItemIcon>
          <ListItemText
            primary="Reports"
            sx={{
              color: 'inherit',
              '&:hover': {
                color: '#1e1e2d',
              },
              whiteSpace: 'nowrap', // Prevents text wrapping
            }}
          />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/admin/events"
          sx={{
            '&:hover': {
              bgcolor: '#ecf0f1',
              color: '#1e1e2d',
            },
          }}
        >
          <ListItemIcon 
            sx={{
              color: 'inherit',
              '&:hover': {
                color: '#1e1e2d',
              },
            }}
          >
            <EventIcon />
          </ListItemIcon>
          <ListItemText
            primary="Events"
            sx={{
              color: 'inherit',
              '&:hover': {
                color: '#1e1e2d',
              },
              whiteSpace: 'nowrap', // Prevents text wrapping
            }}
          />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/admin/staff"
          sx={{
            '&:hover': {
              bgcolor: '#ecf0f1',
              color: '#1e1e2d',
            },
          }}
        >
          <ListItemIcon 
            sx={{
              color: 'inherit',
              '&:hover': {
                color: '#1e1e2d',
              },
            }}
          >
            <GroupIcon />
          </ListItemIcon>
          <ListItemText
            primary="Staff"
            sx={{
              color: 'inherit',
              '&:hover': {
                color: '#1e1e2d',
              },
              whiteSpace: 'nowrap', // Prevents text wrapping
            }}
          />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/admin/notifications"
          sx={{
            '&:hover': {
              bgcolor: '#ecf0f1',
              color: '#1e1e2d',
            },
          }}
        >
          <ListItemIcon 
            sx={{
              color: 'inherit',
              '&:hover': {
                color: '#1e1e2d',
              },
            }}
          >
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText
            primary="Notification Messages"
            sx={{
              color: 'inherit',
              '&:hover': {
                color: '#1e1e2d',
              },
              whiteSpace: 'nowrap', // Prevents text wrapping
            }}
          />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};

export default AdminSidebar;
