import { Box, Typography, Grid, Card, CardContent, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pt: 4,
      px: 3
    }}>
      <Box sx={{ 
        width: '100%',
        textAlign: 'center',
        mb: 4
      }}>
        <Typography variant="h4">Daily Calorie</Typography>
        <Typography variant="h4">Recipe Budgeting</Typography>
      </Box>

      <Grid container spacing={3} sx={{ 
        width: '100%',
        justifyContent: 'flex-start',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {[
          {
            title: 'Recipes',
            description: 'Explore and manage your recipes',
            icon: '🍳',
            path: '/recipes'
          },
          {
            title: 'Meal Planner',
            description: 'Plan your weekly meals',
            icon: '📅',
            path: '/meal-planner'
          },
          {
            title: 'Progress',
            description: 'Track your health progress',
            icon: '📈',
            path: '/progress'
          },
          {
            title: 'Webcam',
            description: 'Use your webcam for food recognition',
            icon: '📷',
            path: '/webcam'
          }
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{
            display: 'flex',
            justifyContent: 'flex-start'
          }}>
            <Card sx={{ 
              width: '100%',
              maxWidth: 345,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  {item.icon} {item.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {item.description}
                </Typography>
                <Button
                  component={Link}
                  to={item.path}
                  variant="contained"
                  fullWidth
                  sx={{
                    background: 'linear-gradient(45deg, #1a237e, #3949ab)',
                    color: 'white',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(26, 35, 126, 0.2)'
                    }
                  }}
                >
                  Go to {item.title}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard; 