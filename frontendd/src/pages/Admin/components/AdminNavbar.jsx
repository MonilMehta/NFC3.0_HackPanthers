import * as React from 'react';
import { Link } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

// Modern color scheme
const themeColors = {
  primary: '#2A6B48',
  secondary: '#83C5BE',
  accent: '#FFD166',
  background: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  hover: '#F9FAFB',
};

const NavbarContainer = styled('nav')(({ isScrolled }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : '#FFFFFF',
  backdropFilter: isScrolled ? 'blur(12px)' : 'none',
  borderBottom: '3px solid black',
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

const LogoIcon = styled('div')({
  background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
  padding: '8px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
  color: '000000',
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

const AdminSection = styled('div')({
  display: 'none',
  flex: 1,
  justifyContent: 'flex-end',
  position: 'relative',
  '@media (min-width: 768px)': {
    display: 'flex',
  },
});

const AdminButton = styled('button')({
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
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#333333',
    borderBottomColor: '#333333',
  },
});

const AdminAvatar = styled('div')({
  width: '32px',
  height: '32px',
  backgroundColor: '#ffffff',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000000',
  fontSize: '14px',
  fontWeight: 600,
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
  maxHeight: isOpen ? '500px' : '0',
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

const MobileAdminSection = styled('div')({
  borderTop: `1px solid ${themeColors.border}`,
  marginTop: '16px',
  paddingTop: '16px',
});

const MobileAdminHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 16px',
  marginBottom: '8px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #e9ecef',
});

const MobileAdminAvatar = styled('div')({
  width: '28px',
  height: '28px',
  backgroundColor: '#000000',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontSize: '12px',
  fontWeight: 600,
});

const MobileAdminText = styled('span')({
  fontSize: '14px',
  fontWeight: 600,
  color: themeColors.text,
});

const DropdownMenu = styled('div')({
  position: 'absolute',
  top: '100%',
  right: 0,
  marginTop: '8px',
  width: '192px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${themeColors.border}`,
  padding: '8px 0',
  zIndex: 1001,
});

const DropdownItem = styled(Link)({
  display: 'block',
  padding: '12px 16px',
  color: themeColors.textSecondary,
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 500,
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

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pages = ['Dashboard', 'Staff', 'Reports','Events', 'Projects', 'Notifications','Donations'];
  const settings = [
    { label: 'Account', path: '/admin/adminAccount' },
    { label: 'Logout', path: '/' }
  ];

  // Scroll handler
  React.useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <NavbarContainer isScrolled={isScrolled}>
      <NavbarContent>
        <NavbarInner>
          {/* Logo Section */}
          <LogoSection>
            <LogoText to="/admin">
              Admin Portal
            </LogoText>
          </LogoSection>

          {/* Desktop Navigation */}
          <DesktopNav>
            {pages.map((page) => (
              <NavLink key={page} to={`/admin/${page.toLowerCase()}`}>
                {page}
              </NavLink>
            ))}
          </DesktopNav>

          {/* Admin Section */}
          <AdminSection>
            <AdminButton onClick={handleOpenUserMenu}>
              <AdminAvatar>A</AdminAvatar>
              <span>Admin</span>
            </AdminButton>
            
            {anchorElUser && (
              <DropdownMenu>
                {settings.map((setting) => (
                  <DropdownItem
                    key={setting.label}
                    to={setting.path}
                    onClick={handleCloseUserMenu}
                  >
                    {setting.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </AdminSection>

          {/* Mobile Menu Button */}
          <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </MobileMenuButton>
        </NavbarInner>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isOpen}>
          <MobileMenuContent>
            {/* Navigation Links */}
            {pages.map((page) => (
              <MobileNavLink 
                key={page} 
                to={`/admin/${page.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
              >
                {page}
              </MobileNavLink>
            ))}
            
            {/* Admin Section for Mobile */}
            <MobileAdminSection>
              <MobileAdminHeader>
                <MobileAdminAvatar>A</MobileAdminAvatar>
                <MobileAdminText>Admin</MobileAdminText>
              </MobileAdminHeader>
              
              {settings.map((setting) => (
                <MobileNavLink 
                  key={setting.label} 
                  to={setting.path} 
                  onClick={() => setIsOpen(false)}
                >
                  {setting.label}
                </MobileNavLink>
              ))}
            </MobileAdminSection>
          </MobileMenuContent>
        </MobileMenu>
      </NavbarContent>
      
      {/* Overlay for dropdown */}
      {anchorElUser && (
        <Overlay onClick={handleCloseUserMenu} />
      )}
    </NavbarContainer>
  );
};

export default AdminNavbar;