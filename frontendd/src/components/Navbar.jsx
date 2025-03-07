import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
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
import { HeartHandshake, Bell, X, LogOut } from 'lucide-react'; // Lucide icons

// Color scheme
const themeColors = {
  primary: '#2A6B48',
  secondary: '#83C5BE',
  accent: '#FFD166',
  background: '#F8F9FA',
  text: '#343A40',
  success: '#4CAF50',
  warning: '#FFA000',
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
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openNotification, setOpenNotification] = React.useState(false);
  const [notificationMessages, setNotificationMessages] = React.useState([]);

  useEffect(() => {
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    if (email) {
      setUserName(email.split('@')[0]);
      setRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

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
        const response = await fetch('https://nurturenest-cvqz.onrender.com/message/getMessage');
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    color: themeColors.text,
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    width: '360px',
    maxHeight: '480px',
    fontSize: '15px',
    display: openNotification ? 'block' : 'none',
    zIndex: 1300,
    overflowY: 'auto',
    border: '1px solid rgba(131, 197, 190, 0.2)'
  };

  const getRoleMessage = () => {
    if (role === 'admin') return 'Admin Dashboard';
    if (role === 'normalUser') return 'Welcome Volunteer';
    return 'Welcome Guest';
  };

  const navItems = ['Donate', 'Events', 'Projects', 'Accounts'];

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
              {navItems.map((item) => (
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
            {role && (
              <>
                <StyledButton component={Link} to="/donation">Donate</StyledButton>
                <StyledButton component={Link} to="/events">Events</StyledButton>
                <StyledButton component={Link} to="/projects">Projects</StyledButton>
                <StyledButton 
                  component={Link} 
                  to="/accounts"
                  sx={{
                    backgroundColor: themeColors.accent,
                    '&:hover': {
                      backgroundColor: `${themeColors.accent}dd`,
                    }
                  }}
                >
                  Accounts
                </StyledButton>
              </>
            )}
          </Box>

          {/* Right side icons */}
          <Box sx={{ 
            flexGrow: 0, 
            display: 'flex', 
            alignItems: 'center',
            gap: 2
          }}>
            {role && (
              <Typography
                sx={{
                  color: themeColors.accent,
                  fontWeight: 600,
                  mr: 2,
                  display: { xs: 'none', md: 'block' }
                }}
              >
                {getRoleMessage()}
              </Typography>
            )}

            {role && (
              <Tooltip title="Notifications">
                <IconButton 
                  onClick={handleNotificationClick}
                  sx={{
                    color: themeColors.background,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  <Bell size={24} strokeWidth={1.5} />
                </IconButton>
              </Tooltip>
            )}

            {/* Notification panel with improved styling */}
            <Box sx={notificationStyle}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
                borderBottom: `2px solid ${themeColors.secondary}30`,
                paddingBottom: 2
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  color: themeColors.primary 
                }}>
                  Notifications
                </Typography>
                <IconButton 
                  onClick={handleCloseNotification} 
                  size="small"
                  sx={{
                    '&:hover': { backgroundColor: `${themeColors.secondary}20` }
                  }}
                >
                  <X size={20} color={themeColors.text} />
                </IconButton>
              </Box>
              
              {notificationMessages.length > 0 ? (
                notificationMessages.map((msg, index) => (
                  <Box
                    key={msg._id || index}
                    sx={{
                      padding: '16px',
                      marginBottom: '12px',
                      borderRadius: '12px',
                      backgroundColor: `${themeColors.secondary}15`,
                      borderLeft: `4px solid ${themeColors.primary}`,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateX(4px)',
                        backgroundColor: `${themeColors.secondary}25`,
                      }
                    }}
                  >
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      {msg.message}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  height: 100,
                  color: themeColors.text
                }}>
                  <Typography variant="body2">
                    No new notifications
                  </Typography>
                </Box>
              )}
            </Box>

            {/* User menu */}
            {role ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title="Account settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar 
                      sx={{ 
                        bgcolor: themeColors.accent,
                        width: 40,
                        height: 40,
                        transition: 'transform 0.2s ease',
                        '&:hover': { 
                          transform: 'scale(1.05)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                        }
                      }}
                    >
                      <Typography sx={{ 
                        color: themeColors.text, 
                        fontWeight: 600,
                        textTransform: 'uppercase'
                      }}>
                        {userName[0]}
                      </Typography>
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Logout">
                  <IconButton 
                    onClick={handleLogout}
                    sx={{
                      color: themeColors.background,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: themeColors.accent
                      }
                    }}
                  >
                    <LogOut size={20} />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <StyledButton 
                component={Link} 
                to="/login"
                sx={{
                  backgroundColor: themeColors.accent,
                  color: themeColors.text,
                  '&:hover': {
                    backgroundColor: themeColors.accent,
                    opacity: 0.9
                  }
                }}
              >
                Login
              </StyledButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
