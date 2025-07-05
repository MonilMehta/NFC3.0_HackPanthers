import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { HeartHandshake, Bell, X, LogOut } from 'lucide-react';
import Cookies from 'js-cookie';

// Modern color scheme
const themeColors = {
  primary: '#2A6B48',
  secondary: '#83C5BE',
  accent: '#FFD166',
  background: '#FFFFFF',
  text: '#000000', // Changed to black
  textSecondary: '#333333', // Changed to darker for better contrast
  border: '#E5E7EB',
  hover: '#F9FAFB',
  success: '#4CAF50',
  warning: '#FFA000',
};

const NavbarContainer = styled('nav')(({ isScrolled }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : '#FFFFFF',
  backdropFilter: isScrolled ? 'blur(12px)' : 'none',
  borderBottom: '2px solid #000000',
  transition: 'all 0.3s ease',
  boxShadow: isScrolled ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
}));

const NavbarContent = styled('div')({
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 16px',
  '@media (min-width: 640px)': {
    padding: '0 24px',
  },
  '@media (min-width: 1024px)': {
    padding: '0 32px',
  },
});

const NavbarInner = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '80px',
});

const LogoSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flex: 1,
});

const LogoText = styled(Link)({
  fontSize: '24px',
  fontWeight: 700,
  color: themeColors.text,
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: themeColors.primary,
  },
});

const DesktopNav = styled('div')({
  display: 'none',
  gap: '32px',
  flex: 1,
  justifyContent: 'center',
  '@media (min-width: 768px)': {
    display: 'flex',
  },
});

const NavLink = styled(Link)({
  color: themeColors.textSecondary,
  textDecoration: 'none',
  padding: '12px 16px',
  fontSize: '16px',
  fontWeight: 500,
  position: 'relative',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: themeColors.text,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '0%',
    height: '2px',
    backgroundColor: themeColors.primary,
    transition: 'width 0.3s ease',
  },
  '&:hover::after': {
    width: '100%',
  },
});

const AccentNavLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  padding: '12px 20px',
  fontSize: '16px',
  fontWeight: 500,
  backgroundColor: themeColors.accent,
  borderRadius: '24px',
  border: `3px solid ${themeColors.accent}`,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: `${themeColors.accent}dd`,
    borderColor: `${themeColors.accent}dd`,
  },
});

const RightSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  flex: 1,
  justifyContent: 'flex-end',
  position: 'relative',
});

const RoleMessage = styled(Typography)({
  color: themeColors.textSecondary,
  fontWeight: 500,
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'block',
  },
});

const NotificationButton = styled(IconButton)({
  padding: '8px',
  borderRadius: '8px',
  color: themeColors.textSecondary,
  '&:hover': {
    backgroundColor: themeColors.hover,
  },
});

const LoginButton = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'black',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '24px',
  border: 'none',
  borderBottom: '3px solid black',
  cursor: 'pointer',
  fontWeight: 500,
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#333333',
    borderBottomColor: '#333333',
  },
});

const UserSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const UserAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  backgroundColor: '#000000', // Changed to black
  color: '#FFFFFF', // White text on black background
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const LogoutButton = styled(IconButton)({
  padding: '8px',
  borderRadius: '8px',
  color: themeColors.textSecondary,
  '&:hover': {
    backgroundColor: themeColors.hover,
    color: themeColors.text,
  },
});

const MobileMenuButton = styled(IconButton)({
  display: 'block',
  padding: '8px',
  borderRadius: '8px',
  color: themeColors.textSecondary,
  '&:hover': {
    backgroundColor: themeColors.hover,
  },
  '@media (min-width: 768px)': {
    display: 'none',
  },
});

const MobileMenu = styled('div')(({ isOpen }) => ({
  display: 'block',
  overflow: 'hidden',
  maxHeight: isOpen ? '400px' : '0',
  transition: 'max-height 0.3s ease',
  '@media (min-width: 768px)': {
    display: 'none',
  },
}));

const MobileMenuContent = styled('div')({
  paddingTop: '16px',
  paddingBottom: '24px',
  borderTop: `1px solid ${themeColors.border}`,
});

const MobileNavLink = styled(Link)({
  display: 'block',
  padding: '16px',
  color: themeColors.textSecondary,
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: 500,
  borderRadius: '8px',
  margin: '4px 0',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: themeColors.text,
    backgroundColor: themeColors.hover,
  },
});

const Overlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
});

// Mobile responsive notification panel
const NotificationPanel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '60px',
  right: '0px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(8px)',
  color: themeColors.text,
  padding: '20px',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  width: '320px',
  maxWidth: '90vw',
  maxHeight: '70vh',
  fontSize: '15px',
  zIndex: 1300,
  overflowY: 'auto',
  border: '1px solid rgba(131, 197, 190, 0.2)',
  
  // Mobile specific styles
  '@media (max-width: 768px)': {
    position: 'fixed',
    top: '90px',
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)',
    width: '90vw',
    maxWidth: '400px',
    maxHeight: '60vh',
    padding: '16px',
    borderRadius: '12px',
  },
  
  // Small mobile devices
  '@media (max-width: 480px)': {
    width: '95vw',
    maxWidth: '350px',
    padding: '12px',
    top: '85px',
    maxHeight: '65vh',
  },
  
  // Very small devices
  '@media (max-width: 360px)': {
    width: '98vw',
    maxWidth: '340px',
    padding: '10px',
    fontSize: '14px',
  },
}));

const NotificationHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
  borderBottom: `2px solid ${themeColors.secondary}30`,
  paddingBottom: '8px',
  
  '@media (max-width: 480px)': {
    marginBottom: '12px',
    paddingBottom: '6px',
  },
});

const NotificationTitle = styled(Typography)({
  fontWeight: 600,
  color: themeColors.primary,
  fontSize: '18px',
  
  '@media (max-width: 480px)': {
    fontSize: '16px',
  },
});

const NotificationItem = styled(Box)({
  padding: '14px',
  marginBottom: '10px',
  borderRadius: '10px',
  backgroundColor: `${themeColors.secondary}15`,
  borderLeft: `4px solid ${themeColors.primary}`,
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateX(4px)',
    backgroundColor: `${themeColors.secondary}25`,
  },
  
  '@media (max-width: 480px)': {
    padding: '12px',
    marginBottom: '8px',
    borderRadius: '8px',
    borderLeftWidth: '3px',
    '&:hover': {
      transform: 'translateX(2px)',
    },
  },
});

const NotificationText = styled(Typography)({
  lineHeight: 1.6,
  fontSize: '14px',
  
  '@media (max-width: 480px)': {
    fontSize: '13px',
    lineHeight: 1.5,
  },
});

const EmptyNotificationContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100px',
  color: themeColors.text,
  
  '@media (max-width: 480px)': {
    height: '80px',
  },
});

const CloseButton = styled(IconButton)({
  padding: '6px',
  '&:hover': { 
    backgroundColor: `${themeColors.secondary}20` 
  },
  
  '@media (max-width: 480px)': {
    padding: '4px',
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessages, setNotificationMessages] = useState([]);

  useEffect(() => {
    const email = Cookies.get('email');
    const role = Cookies.get('role');
    console.log('Email:', email, 'Role:', role);
    if (email) {
      setUserName(email.split('@')[0]);
      setRole(role);
    }
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close notification on window resize for better mobile experience
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && openNotification) {
        // Keep notification open on desktop
        return;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [openNotification]);

  const handleLogout = () => {
    Cookies.remove('email');
    Cookies.remove('role');
    navigate('/auth');
  };

  const handleOpenUserMenu = () => {
    navigate('/account');
  };

  const handleNotificationClick = async () => {
    setOpenNotification(!openNotification);

    if (!openNotification) {
      try {
        const response = await fetch('https://nurturenest-backend.onrender.com/message/getMessage');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Messages:', data.message);
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

  const getRoleMessage = () => {
    if (role === 'admin') return 'Admin Dashboard';
    if (role === 'normalUser') return 'Welcome Volunteer';
    return 'Welcome Guest';
  };

  const navItems = ['Donate', 'Events', 'Projects', 'Account'];

  return (
    <NavbarContainer isScrolled={isScrolled}>
      <NavbarContent>
        <NavbarInner>
          {/* Logo Section */}
          <LogoSection>
            <HeartHandshake 
              size={32}
              strokeWidth={2}
              color={themeColors.primary}
              style={{ marginRight: 8 }}
            />
            <LogoText to="/">
              NurtureNest
            </LogoText>
          </LogoSection>

          {/* Desktop Navigation */}
          <DesktopNav>
            {role && (
              <>
                <NavLink to="/main">Home</NavLink>
                <NavLink to="/events">Events</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/donationuser">Donate</NavLink>
              </>
            )}
          </DesktopNav>

          {/* Right Section */}
          <RightSection>
            {role && (
              <Tooltip title="Notifications">
                <NotificationButton onClick={handleNotificationClick}>
                  <Bell size={20} strokeWidth={1.5} />
                </NotificationButton>
              </Tooltip>
            )}

            {/* Mobile Responsive Notification Panel */}
            {openNotification && (
              <NotificationPanel>
                <NotificationHeader>
                  <NotificationTitle variant="h6">
                    Notifications
                  </NotificationTitle>
                  <CloseButton onClick={handleCloseNotification} size="small">
                    <X size={18} color={themeColors.text} />
                  </CloseButton>
                </NotificationHeader>
                
                {notificationMessages.length > 0 ? (
                  notificationMessages.map((msg, index) => (
                    <NotificationItem key={msg._id || index}>
                      <NotificationText variant="body2">
                        {msg.message}
                      </NotificationText>
                    </NotificationItem>
                  ))
                ) : (
                  <EmptyNotificationContainer>
                    <Typography variant="body2" sx={{ fontSize: { xs: '13px', sm: '14px' } }}>
                      No new notifications
                    </Typography>
                  </EmptyNotificationContainer>
                )}
              </NotificationPanel>
            )}

            {/* User menu */}
            {role ? (
              <UserSection>
                <Tooltip title="Account settings">
                  <UserAvatar onClick={handleOpenUserMenu}>
                    {userName[0]?.toUpperCase()}
                  </UserAvatar>
                </Tooltip>
                <Tooltip title="Logout">
                  <LogoutButton onClick={handleLogout}>
                    <LogOut size={18} />
                  </LogoutButton>
                </Tooltip>
              </UserSection>
            ) : (
              <LoginButton to="/login">
                Login
              </LoginButton>
            )}
          </RightSection>

          {/* Mobile Menu Button */}
          <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </MobileMenuButton>
        </NavbarInner>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isOpen}>
          <MobileMenuContent>
            {role && navItems.map((item) => (
              <MobileNavLink 
                key={item} 
                to={`/${item.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
              >
                {item}
              </MobileNavLink>
            ))}
            {role && (
              <div style={{ borderTop: `1px solid ${themeColors.border}`, marginTop: '16px', paddingTop: '16px' }}>
                <MobileNavLink to="/account" onClick={() => setIsOpen(false)}>
                  Account Settings
                </MobileNavLink>
                <MobileNavLink to="/auth" onClick={() => { setIsOpen(false); handleLogout(); }}>
                  Logout
                </MobileNavLink>
              </div>
            )}
          </MobileMenuContent>
        </MobileMenu>
      </NavbarContent>
      
      {/* Overlay for notifications */}
      {openNotification && (
        <Overlay onClick={handleCloseNotification} />
      )}
    </NavbarContainer>
  );
};

export default Navbar;