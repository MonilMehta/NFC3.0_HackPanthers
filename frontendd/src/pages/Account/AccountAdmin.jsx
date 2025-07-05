import Navbar from '../landing/Navbr';
import React, { useState, useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import { tabClasses } from '@mui/joy/Tab';
import Card from '@mui/joy/Card';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import BadgeIcon from '@mui/icons-material/Badge';
import EventIcon from '@mui/icons-material/Event';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PersonIcon from '@mui/icons-material/Person';
import Rotationdoner from './Roationdoner';
import RotationVol from './RotationVol';
import axios from 'axios';
import Cookies from 'js-cookie';


export default function AccountAdmin() {
  const [user, setUser] = useState(null); 
  const [render, setRender] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [animationDelay, setAnimationDelay] = useState(0);

  useEffect(() => {
    const email = Cookies.get('email');
    axios.get(`https://nurturenest-backend.onrender.com/users/getUser/${email}`)
      .then(response => {
        setUser(response.data);
        setRender(true);
        console.log(response.data);
        // Trigger staggered animations
        setTimeout(() => setAnimationDelay(1), 100);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleToggleEvents = () => {
    setShowEvents(!showEvents);
  };

  if (!render) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: 'white', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Box sx={{ 
          bgcolor: 'white', 
          borderRadius: { xs: 6, sm: 8 }, 
          p: { xs: 3, sm: 4 }, 
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
          border: '2px solid #003E1F',
          animation: 'fadeIn 0.6s ease-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' }
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '2px solid #003E1F',
                borderTopColor: 'transparent',
                animation: 'spin 2s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' }
                }
              }}
            />
            <Typography sx={{ 
              fontSize: { xs: '1rem', sm: '1.25rem' }, 
              fontWeight: 500, 
              color: '#003E1F',
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.7 }
              }
            }}>
              Loading user details...
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Navbar/>
      <Box sx={{ 
        flex: 1, 
        width: '100%', 
        bgcolor: '#ffffff', 
        color: '#2c3e50', 
        minHeight: '100vh',
        animation: 'slideInUp 0.8s ease-out',
        '@keyframes slideInUp': {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      }}>
        <Box
          sx={{
            position: 'sticky',
            top: { sm: -100, md: -110 },
            bgcolor: '#e8f5e9',
            zIndex: 9995,
            transition: 'all 0.5s ease',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            animation: 'slideInDown 0.6s ease-out',
            '@keyframes slideInDown': {
              '0%': { opacity: 0, transform: 'translateY(-20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <Tabs defaultValue={0} sx={{ bgcolor: 'transparent', transition: 'all 0.5s ease' }}>
            <TabList
              tabFlex={1}
              size="sm"
              sx={{
                pl: { xs: 0, md: 4 },
                justifyContent: 'left',
                [`&& .${tabClasses.root}`]: {
                  fontWeight: '600',
                  flex: 'initial',
                  color: '#2c3e50',
                  fontSize: '1rem',
                  transition: 'all 0.4s ease',
                  [`&.${tabClasses.selected}`]: {
                    bgcolor: 'transparent',
                    color: '#2e7d32',
                    '&::after': {
                      height: '2px',
                      bgcolor: '#2e7d32',
                      transition: 'all 0.4s ease',
                    },
                  },
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    color: '#2e7d32',
                  }
                },
              }}
            >
            </TabList>
          </Tabs>
        </Box>

        <Box sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 4 }, mt: 3 }}>
          <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            {/* Personal Info Section */}
            <Box sx={{
              bgcolor: '#003E1F',
              borderRadius: { xs: 8, sm: 12 },
              p: { xs: 4, sm: 6 },
              color: 'white',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              mt: 6,
              animation: `fadeInScale 0.8s ease-out ${animationDelay * 0.1}s both`,
              transition: 'all 0.4s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.02)',
                boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.2)',
              },
              '@keyframes fadeInScale': {
                '0%': { opacity: 0, transform: 'scale(0.9) translateY(30px)' },
                '100%': { opacity: 1, transform: 'scale(1) translateY(0)' }
              }
            }}>
              <Typography sx={{ 
                fontSize: { xs: '2rem', sm: '2.5rem' }, 
                fontWeight: 'bold', 
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                color: 'white',
                animation: 'slideInLeft 0.8s ease-out 0.2s both',
                '@keyframes slideInLeft': {
                  '0%': { opacity: 0, transform: 'translateX(-30px)' },
                  '100%': { opacity: 1, transform: 'translateX(0)' }
                }
              }}>
                <PersonIcon sx={{ 
                  fontSize: { xs: '2rem', sm: '2.5rem' }, 
                  color: 'white',
                  animation: 'bounce 2s ease-in-out infinite',
                  '@keyframes bounce': {
                    '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                    '40%': { transform: 'translateY(-10px)' },
                    '60%': { transform: 'translateY(-5px)' }
                  }
                }} />
                Personal Information
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                gap: 2,
                fontSize: { xs: '1rem', sm: '1.125rem' },
                color: 'white',
                animation: 'slideInRight 0.8s ease-out 0.4s both',
                '@keyframes slideInRight': {
                  '0%': { opacity: 0, transform: 'translateX(30px)' },
                  '100%': { opacity: 1, transform: 'translateX(0)' }
                }
              }}>
                <Box sx={{ animation: 'fadeIn 0.8s ease-out 0.6s both' }}>
                  <Typography sx={{ 
                    mb: 1, 
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateX(5px)' }
                  }}>
                    <Box component="span" sx={{ fontWeight: 500, color: 'white' }}>Name:</Box> {user.firstName} {user.lastName}
                  </Typography>
                  <Typography sx={{ 
                    mb: 1, 
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateX(5px)' }
                  }}>
                    <Box component="span" sx={{ fontWeight: 500, color: 'white' }}>Email:</Box> {user.email || 'N/A'}
                  </Typography>
                </Box>
                <Box sx={{ animation: 'fadeIn 0.8s ease-out 0.8s both' }}>
                  <Typography sx={{ 
                    mb: 1, 
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateX(5px)' }
                  }}>
                    <Box component="span" sx={{ fontWeight: 500, color: 'white' }}>Phone:</Box> {user.phone_no || 'N/A'}
                  </Typography>
                  <Typography sx={{ 
                    mb: 1, 
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateX(5px)' }
                  }}>
                    <Box component="span" sx={{ fontWeight: 500, color: 'white' }}>Date of Birth:</Box> {user.date_of_birth ? user.date_of_birth.substring(0, 10) : 'N/A'}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Badges Section */}
            <Box sx={{
              bgcolor: 'white',
              borderRadius: { xs: 6, sm: 8 },
              p: { xs: 2, sm: 3 },
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              border: '2px solid #003E1F',
              animation: `fadeInScale 0.8s ease-out ${animationDelay * 0.2}s both`,
              transition: 'all 0.4s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.15)',
              }
            }}>
              <Typography sx={{ 
                fontSize: { xs: '1.125rem', sm: '1.25rem' }, 
                fontWeight: 'bold', 
                mb: { xs: 2, sm: 2 },
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 1.5 },
                color: '#003E1F',
                animation: 'slideInLeft 0.8s ease-out 0.3s both'
              }}>
                <BadgeIcon sx={{ 
                  fontSize: { xs: '1.125rem', sm: '1.25rem' },
                  animation: 'rotate 3s linear infinite',
                  '@keyframes rotate': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                  }
                }} />
                Badges Earned
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                gap: 1.5, 
                flexWrap: 'wrap',
                animation: 'slideInUp 0.8s ease-out 0.5s both'
              }}>
                <Box sx={{ 
                  bgcolor: 'white', 
                  borderRadius: { xs: 3, sm: 4 }, 
                  p: 0.5,
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'scale(1.1) rotate(5deg)',
                  }
                }}>
                  {user.volunteeredEvents.length > 0 && <RotationVol />}
                </Box>
                <Box sx={{ 
                  bgcolor: 'white', 
                  borderRadius: { xs: 3, sm: 4 }, 
                  p: 0.5,
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'scale(1.1) rotate(-5deg)',
                  }
                }}>
                  {user.amountDonated > 0 && <Rotationdoner />}
                </Box>
                {user.volunteeredEvents.length === 0 && user.amountDonated === 0 && (
                  <Typography sx={{ 
                    color: '#666', 
                    fontStyle: 'italic', 
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    animation: 'pulse 2s ease-in-out infinite'
                  }}>
                    No badges earned yet. Start volunteering or donating to earn badges!
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Events Section */}
            <Box sx={{
              bgcolor: 'white',
              borderRadius: { xs: 8, sm: 12 },
              p: { xs: 4, sm: 6 },
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              border: '2px solid #003E1F',
              animation: `fadeInScale 0.8s ease-out ${animationDelay * 0.3}s both`,
              transition: 'all 0.4s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.15)',
              }
            }}>
              <Typography sx={{ 
                fontSize: { xs: '1.25rem', sm: '1.5rem' }, 
                fontWeight: 'bold', 
                mb: { xs: 3, sm: 4 },
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 2 },
                color: '#003E1F',
                animation: 'slideInLeft 0.8s ease-out 0.3s both'
              }}>
                <EventIcon sx={{ 
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  animation: 'swing 2s ease-in-out infinite',
                  '@keyframes swing': {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(10deg)' },
                    '75%': { transform: 'rotate(-10deg)' }
                  }
                }} />
                Events Volunteered
              </Typography>
              
              {/* Toggle Button */}
              <Box sx={{ mb: 3, animation: 'fadeIn 0.8s ease-out 0.5s both' }}>
                <button
                  onClick={handleToggleEvents}
                  style={{
                    width: '100%',
                    backgroundColor: '#003E1F',
                    color: 'white',
                    fontWeight: '600',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#004A25';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#003E1F';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <span>{showEvents ? 'Hide Events' : 'Show Events'}</span>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#32CD32',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.4s ease',
                    transform: showEvents ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path 
                        d="M4 2L8 6L4 10" 
                        stroke="#003E1F" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              </Box>
              
              {/* Events List */}
              

{/* Events List */}
<Box sx={{ 
  display: 'flex', 
  flexDirection: 'column', 
  gap: 2,
  maxHeight: showEvents ? '400px' : '0', // Fixed height for scrolling
  overflow: 'hidden',
  transition: 'all 0.6s ease-in-out',
  opacity: showEvents ? 1 : 0
}}>
  <Box sx={{
    maxHeight: showEvents ? '400px' : '0',
    overflowY: 'auto',
    overflowX: 'hidden',
    pr: 1, // Add padding for scrollbar
    // Custom scrollbar styling
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#003E1F',
      borderRadius: '10px',
      transition: 'all 0.3s ease',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#32CD32',
    },
    // Firefox scrollbar styling
    scrollbarWidth: 'thin',
    scrollbarColor: '#003E1F #f1f1f1',
  }}>
    {user.volunteeredEvents && user.volunteeredEvents.map((event, index) => (
      <Box key={index} sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 1, sm: 2 },
        alignItems: { xs: 'stretch', sm: 'center' },
        p: { xs: 2, sm: 3 },
        bgcolor: '#f9f9f9',
        borderRadius: { xs: 6, sm: 8 },
        border: '2px solid #003E1F',
        transition: 'all 0.4s ease',
        animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
        mb: 2, // Add margin between events
        mr: 1, // Add margin for scrollbar space
        '&:hover': {
          transform: 'translateY(-3px) scale(1.02)',
          boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.15)',
          bgcolor: '#f0f8f0'
        },
        '&:last-child': {
          mb: 0, // Remove margin from last item
        }
      }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ 
            fontWeight: 600, 
            fontSize: { xs: '0.875rem', sm: '1rem' },
            color: '#003E1F',
            transition: 'all 0.3s ease',
            '&:hover': { transform: 'translateX(5px)' }
          }}>
            {event.eventName}
          </Typography>
          <Typography sx={{ 
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            color: '#666',
            mt: 0.5,
            transition: 'all 0.3s ease'
          }}>
            Volunteer
          </Typography>
        </Box>
        <Box sx={{ flexShrink: 0 }}>
          <Box sx={{
            display: 'inline-block',
            px: 2,
            py: 0.5,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            fontWeight: 500,
            borderRadius: 50,
            color: 'white',
            bgcolor: '#32CD32',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              bgcolor: '#28a428'
            }
          }}>
            Volunteer
          </Box>
        </Box>
      </Box>
    ))}
    {(!user.volunteeredEvents || user.volunteeredEvents.length === 0) && (
      <Typography sx={{ 
        color: '#666', 
        fontStyle: 'italic', 
        textAlign: 'center', 
        py: 2,
        animation: 'pulse 2s ease-in-out infinite'
      }}>
        You haven't volunteered for any events yet. Start making a difference today!
      </Typography>
    )}
  </Box>
  
  {/* Scroll indicator */}
  {user.volunteeredEvents && user.volunteeredEvents.length > 3 && showEvents && (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 1,
      py: 1,
      color: '#666',
      fontSize: '0.875rem',
      animation: 'fadeIn 0.8s ease-out 1s both'
    }}>
      <Typography sx={{ fontSize: '0.875rem' }}>
        Scroll to see more events
      </Typography>
      <Box sx={{
        width: '16px',
        height: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'bounce 2s ease-in-out infinite',
        '@keyframes bounce': {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-5px)' },
          '60%': { transform: 'translateY(-3px)' }
        }
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M2 4L6 8L10 4" 
            stroke="#666" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    </Box>
  )}
</Box>
            </Box>

            {/* Donations Section */}
            <Box sx={{
              bgcolor: 'white',
              borderRadius: { xs: 8, sm: 12 },
              p: { xs: 4, sm: 6 },
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              border: '2px solid #003E1F',
              textAlign: 'center',
              animation: `fadeInScale 0.8s ease-out ${animationDelay * 0.4}s both`,
              transition: 'all 0.4s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.15)',
              }
            }}>
              <Typography sx={{ 
                fontSize: { xs: '1.25rem', sm: '1.5rem' }, 
                fontWeight: 'bold', 
                mb: { xs: 2, sm: 3 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: 1, sm: 2 },
                color: '#003E1F',
                animation: 'slideInDown 0.8s ease-out 0.3s both'
              }}>
                <VolunteerActivismIcon sx={{ 
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  animation: 'heartbeat 2s ease-in-out infinite',
                  '@keyframes heartbeat': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' }
                  }
                }} />
                Donations
              </Typography>
              
              <Typography sx={{ 
                fontSize: { xs: '1rem', sm: '1.125rem' },
                color: '#666',
                mb: 3,
                px: 2,
                animation: 'fadeIn 0.8s ease-out 0.5s both'
              }}>
                Your contribution to making the world a better place.
              </Typography>
              
              <Box sx={{
                display: 'inline-block',
                px: { xs: 4, sm: 6 },
                py: { xs: 2, sm: 3 },
                bgcolor: '#f9f9f9',
                borderRadius: { xs: 8, sm: 10 },
                border: '2px solid #003E1F',
                animation: 'bounceIn 0.8s ease-out 0.7s both',
                transition: 'all 0.4s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  bgcolor: '#f0f8f0'
                },
                '@keyframes bounceIn': {
                  '0%': { opacity: 0, transform: 'scale(0.3)' },
                  '50%': { opacity: 1, transform: 'scale(1.05)' },
                  '70%': { transform: 'scale(0.9)' },
                  '100%': { opacity: 1, transform: 'scale(1)' }
                }
              }}>
                <Typography sx={{ 
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  fontWeight: 'bold',
                  color: '#003E1F',
                  mb: 1,
                  animation: 'countUp 1s ease-out 1s both',
                  '@keyframes countUp': {
                    '0%': { opacity: 0, transform: 'translateY(10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' }
                  }
                }}>
                  ${user.amountDonated || 0}
                </Typography>
                <Typography sx={{ 
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  color: '#666',
                  animation: 'fadeIn 0.8s ease-out 1.2s both'
                }}>
                  Total donated this year
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}