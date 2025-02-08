import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, rgba(26, 35, 126, 0.1), rgba(57, 73, 171, 0.1))',
      gap: 4
    }}>
      <Typography 
        variant="h1" 
        sx={{
          fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
          fontWeight: 700,
          background: 'linear-gradient(45deg, #1a237e, #3949ab)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}
      >
        Recipe Tracker
      </Typography>
      <Button 
        component={Link} 
        to="/dashboard"
        sx={{
          background: 'linear-gradient(45deg, #1a237e, #3949ab)',
          color: 'white',
          padding: '1rem 3rem',
          fontSize: '1.2rem',
          borderRadius: '50px',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 20px rgba(26, 35, 126, 0.3)'
          }
        }}
      >
        Get Started
      </Button>
    </Box>
  );
}

export default Home;