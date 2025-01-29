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
import { styled } from '@mui/material/styles';
import { HeartHandshake, Bell, X } from 'lucide-react'; // Lucide icons

// Color scheme
const themeColors = {
  primary: '#2A6B48',
  secondary: '#83C5BE',
  accent: '#FFD166',
  background: '#F8F9FA',
  text: '#343A40'
};

const StyledAppBar = styled(AppBar)({
  backgroundColor: themeColors.primary,
  backgroundImage: 'linear-gradient(135deg, #2A6B48 0%, #83C5BE 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
});

const StyledButton = styled(Button)(({ theme }) => ({
  color: themeColors.background,
  fontWeight: '600',
  fontSize: '15px',
  letterSpacing: '0.5px',
  margin: '0 12px',
  padding: '8px 20px',
  borderRadius: '8px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: themeColors.accent,
    color: themeColors.text,
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${themeColors.accent}40`
  },
}));

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
    top: '60px',
    right: '20px',
    backgroundColor: themeColors.background,
    color: themeColors.text,
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    width: '360px',
    maxHeight: '480px',
    fontSize: '15px',
    display: openNotification ? 'block' : 'none',
    zIndex: 1300,
    overflowY: 'auto',
    border: `1px solid ${themeColors.secondary}20`
  };

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HeartHandshake 
            size={32}
            strokeWidth={2}
            color={themeColors.accent}
            style={{ marginRight: 16 }}
          />
          
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: themeColors.background,
              textDecoration: 'none',
              '&:hover': { opacity: 0.9 }
            }}
          >
            NurtureNest
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
              PaperProps={{
                sx: {
                  borderRadius: '12px',
                  padding: '8px 0',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              {['Donate', 'Events', 'Projects'].map((item) => (
                <MenuItem key={item} onClick={handleCloseNavMenu}>
                  <Link 
                    to={`/${item.toLowerCase()}`} 
                    style={{ 
                      textDecoration: 'none',
                      width: '100%',
                      padding: '12px 24px'
                    }}
                  >
                    <Typography 
                      sx={{ 
                        color: themeColors.text,
                        fontWeight: 500,
                        '&:hover': { color: themeColors.primary }
                      }}
                    >
                      {item}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile logo */}
          <Box sx={{ 
            display: { xs: 'flex', md: 'none' }, 
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <HeartHandshake 
              size={28}
              strokeWidth={2}
              color={themeColors.accent}
              style={{ marginRight: 8 }}
            />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                color: themeColors.background,
                textDecoration: 'none'
              }}
            >
              HopeHaven
            </Typography>
          </Box>

          {/* Desktop navigation */}
          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            gap: 2
          }}>
            <StyledButton component={Link} to="/donation">Donate</StyledButton>
            <StyledButton component={Link} to="/events">Events</StyledButton>
            <StyledButton component={Link} to="/projects">Projects</StyledButton>
          </Box>

          {/* Right side icons */}
          <Box sx={{ 
            flexGrow: 0, 
            display: 'flex', 
            alignItems: 'center',
            gap: 2
          }}>
            <Tooltip title="Notifications">
              <IconButton 
                onClick={handleNotificationClick}
                sx={{ color: themeColors.background }}
              >
                <Bell size={24} strokeWidth={1.5} />
              </IconButton>
            </Tooltip>

            {/* Notification panel */}
            <Box sx={notificationStyle}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Notifications
                </Typography>
                <IconButton onClick={handleCloseNotification} size="small">
                  <X size={20} color={themeColors.text} />
                </IconButton>
              </Box>
              
              {notificationMessages.length > 0 ? (
                notificationMessages.map((msg, index) => (
                  <Box
                    key={msg._id || index}
                    sx={{
                      padding: 12,
                      marginBottom: 12,
                      borderRadius: 8,
                      backgroundColor: `${themeColors.secondary}10`,
                      borderLeft: `4px solid ${themeColors.primary}`
                    }}
                  >
                    <Typography variant="body2">
                      {msg.message}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  height: 100
                }}>
                  <Typography variant="body2" sx={{ color: themeColors.text }}>
                    No new notifications
                  </Typography>
                </Box>
              )}
            </Box>

            {/* User menu */}
            <Tooltip title="Account settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar 
                  sx={{ 
                    bgcolor: themeColors.accent,
                    width: 40,
                    height: 40,
                    '&:hover': { transform: 'scale(1.05)' }
                  }}
                >
                  <Typography sx={{ color: themeColors.text, fontWeight: 500 }}>
                    U
                  </Typography>
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;