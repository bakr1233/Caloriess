import { Typography, Button, Box, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WebcamClassifier from '../components/WebcamClassifier';
import Webcam from '../components/Webcam';

function Home() {
  return (
    <div className="home-page">
      <div className="hero-section" style={{ 
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(26, 35, 126, 0.1), rgba(57, 73, 171, 0.1))',
        padding: '2rem',
        marginBottom: '4rem'
      }}>
        <div className="hero-content" style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '800px',
          padding: '2rem'
        }}>
          <Typography variant="h1" className="hero-title" sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1a237e, #3949ab)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}>
            Daily Calorie
          </Typography>
          <Typography variant="h2" className="hero-subtitle" sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            color: '#1a237e',
            mb: 3
          }}>
            Recipe Budgeting
          </Typography>
          <div className="decorative-line" style={{
            width: '100px',
            height: '4px',
            background: 'linear-gradient(45deg, #1a237e, #3949ab)',
            margin: '2rem auto',
            borderRadius: '2px'
          }}></div>
          <Button 
            component={Link} 
            to="/dashboard"
            className="hero-btn"
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
        </div>
      </div>

      <Container maxWidth="lg" sx={{ minHeight: '100vh', py: 4 }}>
        <Box className="features-section" style={{ 
          position: 'relative',
          padding: '6rem 2rem',
          backgroundColor: '#ffffff',
          borderRadius: '40px',
          boxShadow: '0 4px 20px rgba(26, 35, 126, 0.1)',
          mb: 4
        }}>
          <Typography variant="h3" className="section-title" sx={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: 700,
            mb: 2
          }}>
            Your Journey to Better Health
          </Typography>
          <div className="decorative-line" sx={{ mb: 6 }}></div>
          
          <Grid container spacing={4} className="features-grid">
            {[
              {
                icon: RestaurantIcon,
                title: 'Track Meals',
                description: 'Log your daily meals and track your caloric intake with ease'
              },
              {
                icon: MonitorHeartIcon,
                title: 'Monitor Health',
                description: 'Keep track of your nutritional goals and progress'
              },
              {
                icon: TrendingUpIcon,
                title: 'See Progress',
                description: 'Visualize your journey with detailed insights'
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box className="feature-card" sx={{
                  background: 'var(--card-background)',
                  padding: '2rem',
                  borderRadius: 'var(--card-border-radius)',
                  boxShadow: 'var(--card-shadow)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 'var(--hover-shadow)'
                  }
                }}>
                  <feature.icon sx={{
                    fontSize: '3rem',
                    color: 'var(--accent-color)',
                    mb: 2
                  }} />
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography>
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ py: 8 }}>
          <Container maxWidth="lg">
            <Webcam />
          </Container>
        </Box>

        <div className="image-grid-section">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div className="image-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3")' }}>
                <div className="image-card-content">
                  <Typography variant="h4">Healthy Recipes</Typography>
                  <Button component={Link} to="/recipes" className="btn-custom">Explore</Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="image-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3")' }}>
                <div className="image-card-content">
                  <Typography variant="h4">Track Calories</Typography>
                  <Button component={Link} to="/calorie-tracker" className="btn-custom">Start Now</Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>

        <Box className="weekly-plan-section">
          <Typography variant="h3" className="section-title">Weekly Meal Plan</Typography>
          <div className="decorative-line"></div>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box className="plan-section" sx={{ 
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(26, 35, 126, 0.1)',
                p: 3,
                height: '300px',  // Reduced height
                width: '100%',    // Full width
                mb: 4
              }}>
                <Typography variant="h4" sx={{ mb: 3, color: '#1a237e' }}>
                  Weekly Meal Plan
                </Typography>
                <Grid container spacing={2}>
                  {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal) => (
                    <Grid item xs={3} key={meal}>
                      <Box sx={{ 
                        p: 2, 
                        background: '#e8eaf6',
                        borderRadius: '8px',
                        textAlign: 'center'
                      }}>
                        <Typography variant="h6">{meal}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box className="progress-section" sx={{ 
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(26, 35, 126, 0.1)',
                p: 3,
                height: '300px',
                width: '100%',
                mb: 4
              }}>
                <Typography variant="h4" sx={{ mb: 3, color: '#1a237e' }}>
                  Calorie Progress
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { title: 'Daily Goal', value: '2,000 cal' },
                    { title: 'Consumed', value: '1,500 cal' },
                    { title: 'Remaining', value: '500 cal' },
                    { title: 'Burned', value: '300 cal' }
                  ].map((stat) => (
                    <Grid item xs={3} key={stat.title}>
                      <Box sx={{ 
                        p: 2, 
                        background: '#e8eaf6',
                        borderRadius: '8px',
                        textAlign: 'center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                          {stat.title}
                        </Typography>
                        <Typography variant="h6" sx={{ 
                          color: '#1a237e',
                          fontWeight: 600
                        }}>
                          {stat.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Home;