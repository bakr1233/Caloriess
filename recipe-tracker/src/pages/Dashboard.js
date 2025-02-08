import { Box, Container, Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useMeals } from '../context/MealContext';
import { useState, useEffect } from 'react';

function Dashboard() {
  const navigate = useNavigate();
  const { weeklyPlan, getDailyCalories } = useMeals();
  const [stats, setStats] = useState({
    todayCalories: 0,
    weeklyAverage: 0,
    plannedMeals: 0,
    favoriteRecipes: 0
  });

  useEffect(() => {
    // Get today's day name
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    
    // Calculate stats
    const todayPlan = weeklyPlan.find(day => day.day === today);
    const todayCalories = todayPlan ? getDailyCalories(todayPlan) : 0;

    // Calculate weekly average
    const totalWeekCalories = weeklyPlan.reduce((sum, day) => sum + getDailyCalories(day), 0);
    const weeklyAverage = Math.round(totalWeekCalories / 7);

    // Count planned meals
    const plannedMeals = weeklyPlan.reduce((sum, day) => sum + day.meals.length, 0);

    // Get favorite recipes count from localStorage
    const savedFavorites = localStorage.getItem('recipeFavorites');
    const favorites = savedFavorites ? Object.values(JSON.parse(savedFavorites)) : [];
    const favoriteCount = favorites.filter(Boolean).length;

    setStats({
      todayCalories,
      weeklyAverage,
      plannedMeals,
      favoriteRecipes: favoriteCount
    });
  }, [weeklyPlan, getDailyCalories]);

  const dashboardItems = [
    {
      title: 'Recipes',
      description: 'Browse and discover healthy recipes',
      icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
      path: '/recipes',
      gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)'
    },
    {
      title: 'Meal Planner',
      description: 'Plan your weekly meals',
      icon: <CalendarMonthIcon sx={{ fontSize: 40 }} />,
      path: '/meal-planner',
      gradient: 'linear-gradient(135deg, #4CAF50, #81C784)'
    },
    {
      title: 'Progress',
      description: 'Track your calorie goals',
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      path: '/progress',
      gradient: 'linear-gradient(135deg, #2196F3, #64B5F6)'
    },
    {
      title: 'Food Scanner',
      description: 'Scan food for nutritional info',
      icon: <CameraAltIcon sx={{ fontSize: 40 }} />,
      path: '/webcam',
      gradient: 'linear-gradient(135deg, #9C27B0, #BA68C8)'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6, px: { xs: 2, sm: 3, md: 4 } }}>
      <Typography 
        variant="h3" 
        sx={{ 
          mb: 8,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          textAlign: 'center'
        }}
      >
        Dashboard
      </Typography>

      {/* Main Navigation Cards */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {dashboardItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Card
              sx={{
                height: '100%',
                minHeight: 280,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
                }
              }}
              onClick={() => navigate(item.path)}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 3,
                    height: '100%'
                  }}
                >
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: item.gradient,
                      color: 'white',
                      mb: 2,
                      '& svg': {
                        fontSize: 48
                      }
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                      fontWeight: 600
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      lineHeight: 1.5
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Stats Section */}
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4,
            fontSize: { xs: '1.5rem', sm: '2rem' },
            fontWeight: 600,
            textAlign: 'center'
          }}
        >
          Quick Stats
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                bgcolor: 'primary.light',
                height: '100%',
                minHeight: 160,
                p: 1
              }}
            >
              <CardContent sx={{ height: '100%', p: 3 }}>
                <Box sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Typography 
                    variant="h6" 
                    color="white"
                    sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                  >
                    Today's Calories
                  </Typography>
                  <Box>
                    <Typography 
                      variant="h4" 
                      color="white"
                      sx={{ 
                        fontSize: { xs: '1.75rem', sm: '2.25rem' },
                        fontWeight: 700,
                        mb: 1
                      }}
                    >
                      {stats.todayCalories.toLocaleString()}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="white" 
                      sx={{ opacity: 0.8 }}
                    >
                      of 2,500 goal
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                bgcolor: 'success.light',
                height: '100%',
                minHeight: 160,
                p: 1
              }}
            >
              <CardContent sx={{ height: '100%', p: 3 }}>
                <Box sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Typography variant="h6" color="white">
                    Weekly Average
                  </Typography>
                  <Box>
                    <Typography variant="h4" color="white">
                      {stats.weeklyAverage.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
                      calories/day
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                bgcolor: 'warning.light',
                height: '100%',
                minHeight: 160,
                p: 1
              }}
            >
              <CardContent sx={{ height: '100%', p: 3 }}>
                <Box sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Typography variant="h6" color="white">
                    Planned Meals
                  </Typography>
                  <Box>
                    <Typography variant="h4" color="white">
                      {stats.plannedMeals}
                    </Typography>
                    <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
                      this week
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                bgcolor: 'error.light',
                height: '100%',
                minHeight: 160,
                p: 1
              }}
            >
              <CardContent sx={{ height: '100%', p: 3 }}>
                <Box sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Typography variant="h6" color="white">
                    Favorite Recipes
                  </Typography>
                  <Box>
                    <Typography variant="h4" color="white">
                      {stats.favoriteRecipes}
                    </Typography>
                    <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
                      saved recipes
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard; 