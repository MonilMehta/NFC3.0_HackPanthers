import React from 'react';
import { Link } from 'react-router-dom'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#1e1e2d',
  boxShadow: 'none',
  borderBottom: '1px solid #34495e',
});

const StyledButton = styled(Button)({
  color: '#ecf0f1',
  fontWeight: '500',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#ecf0f1',
    color: '#1e1e2d',
  },
  margin: '0 10px',
});

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openNotification, setOpenNotification] = React.useState(false);
  const [notificationMessages, setNotificationMessages] = React.useState([]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNotificationClick = async () => {
    setOpenNotification(!openNotification);

    if (!openNotification) {
      try {
        const response = await fetch('http://localhost:8000/message/getMessage');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Messages:', data.message); // Log the fetched messages to console

        // Set the array of messages to notificationMessages state
        setNotificationMessages(data.message);

      } catch (error) {
        console.error('Error fetching messages:', error);
        setNotificationMessages([{ message: 'Failed to load messages' }]);
      }
    }
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  const notificationStyle = {
    position: 'absolute',
    top: '60px', // Adjust as needed
    right: '0',
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px', // Increased padding
    borderRadius: '8px', // Increased border radius
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', // Increased shadow
    width: '300px',
    height: '350px', // Increased width
    fontSize: '16px', // Increased font size
    display: openNotification ? 'block' : 'none',
    zIndex: 1300, // Ensure it appears above other content
    overflowY: 'auto', // Allow scrolling if content overflows
  };

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <VolunteerActivismIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#f39c12' }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ChildCare NGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/donate" style={{ textDecoration: 'none', color: '#2c3e50' }}>
                  <Typography sx={{ textAlign: 'center' }}>Donate</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/events" style={{ textDecoration: 'none', color: '#2c3e50' }}>
                  <Typography sx={{ textAlign: 'center' }}>Events</Typography>
                </Link>
              </MenuItem>     
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/projects" style={{ textDecoration: 'none', color: '#2c3e50' }}>
                  <Typography sx={{ textAlign: 'center' }}>Projects</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <VolunteerActivismIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#ecf0f1' }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NGOFlow
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <StyledButton component={Link} to="/donate">Donate</StyledButton>
            <StyledButton component={Link} to="/events">Events</StyledButton>
            <StyledButton component={Link} to="/projects">Projects</StyledButton>
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', position: 'relative' }}>
            <IconButton size="large" color="inherit" onClick={handleNotificationClick}>
              <NotificationsIcon />
            </IconButton>
            <Box sx={notificationStyle}>
              {notificationMessages.length > 0 ? (
                notificationMessages.map((msg, index) => (
                  <Typography key={msg._id || index} sx={{ marginBottom: '10px' }}>
                    {msg.message}
                  </Typography>
                ))
              ) : (
                <Typography>No new notifications</Typography>
              )}
              <IconButton
                size="small"
                onClick={handleCloseNotification}
                sx={{ position: 'absolute', top: '5px', right: '5px' }}
              >
                &times;
              </IconButton>
            </Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Profile" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link to="/account" style={{ textDecoration: 'none', color: '#2c3e50' }}>
                  <Typography sx={{ textAlign: 'center' }}>Account</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link to="/" style={{ textDecoration: 'none', color: '#2c3e50' }}>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
