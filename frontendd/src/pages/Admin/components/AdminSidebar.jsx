import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReportIcon from "@mui/icons-material/Report";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";

const AdminSidebar = () => {
  const location = useLocation();

  const getActiveStyle = (path) => ({
    bgcolor: location.pathname === path ? "#81C14B" : "inherit",
    color: location.pathname === path ? "black" : "inherit",
    '&:hover': {
      bgcolor: '#81C16B',
      color: 'white',
    },
  });

  return (
    <Box
      sx={{
        width: 250,
        minWidth: 250,
        maxWidth: 250,
        bgcolor: "#204E4A",
        minHeight: "200vh",
        color: "#ecf0f1",
      }}
    >
      <List>
        <ListItem 
          button 
          component={Link} 
          to="/admin/"
          sx={getActiveStyle("/admin/")}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: 'inherit' }} />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/admin/projects"
          sx={getActiveStyle("/admin/projects")}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Projects" sx={{ color: 'inherit' }} />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/admin/donations"
          sx={getActiveStyle("/admin/donations")}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Donations" sx={{ color: 'inherit' }} />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/admin/reports"
          sx={getActiveStyle("/admin/reports")}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" sx={{ color: 'inherit' }} />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/admin/events"
          sx={getActiveStyle("/admin/events")}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Events" sx={{ color: 'inherit' }} />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/admin/staff"
          sx={getActiveStyle("/admin/staff")}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Staff" sx={{ color: 'inherit' }} />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/admin/notifications"
          sx={getActiveStyle("/admin/notifications")}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notification Messages" sx={{ color: 'inherit' }} />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};

export default AdminSidebar;
