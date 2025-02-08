import { Box, Typography, Container, Grid, LinearProgress, Card, CardContent } from '@mui/material';
import { useMeals } from '../context/MealContext';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

function Progress() {
  const { weeklyPlan, getDailyCalories } = useMeals();
  const targetCalories = 2500;

  // Calculate weekly statistics
  const weeklyStats = {
    totalCalories: weeklyPlan.reduce((sum, day) => sum + getDailyCalories(day), 0),
    averageCalories: Math.round(
      weeklyPlan.reduce((sum, day) => sum + getDailyCalories(day), 0) / 7
    ),
    highestDay: weeklyPlan.reduce((max, day) => 
      Math.max(max, getDailyCalories(day)), 0
    ),
    lowestDay: weeklyPlan.reduce((min, day) => 
      getDailyCalories(day) === 0 ? min : 
      min === 0 ? getDailyCalories(day) : 
      Math.min(min, getDailyCalories(day)), 0
    ),
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 4, px: 3 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>Weekly Progress</Typography>
      
      {/* Weekly Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            height: '100%',
            background: 'linear-gradient(135deg, #1a237e, #3949ab)',
            color: 'white'
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Total Calories</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalFireDepartmentIcon />
                <Typography variant="h4">
                  {weeklyStats.totalCalories.toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Daily Average</Typography>
              <Typography variant="h4">
                {weeklyStats.averageCalories.toLocaleString()} cal
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Highest Day</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUpIcon color="error" />
                <Typography variant="h4">
                  {weeklyStats.highestDay.toLocaleString()} cal
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Lowest Day</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingDownIcon color="success" />
                <Typography variant="h4">
                  {weeklyStats.lowestDay.toLocaleString()} cal
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Daily Progress Bars */}
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            {weeklyPlan.map((day) => {
              const dailyCalories = getDailyCalories(day);
              const percentage = (dailyCalories / targetCalories) * 100;
              const isOverTarget = dailyCalories > targetCalories;

              return (
                <Grid item xs={12} key={day.day}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      mb: 1,
                      alignItems: 'center',
                      gap: 4
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2,
                        flex: 1
                      }}>
                        <Typography variant="h6" sx={{ minWidth: 100 }}>
                          {day.day}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {dailyCalories} / {targetCalories} cal
                        </Typography>
                      </Box>
                      <Box sx={{ minWidth: 100, textAlign: 'right' }}>
                        <Typography 
                          variant="body2" 
                          color={isOverTarget ? 'error.main' : 'success.main'}
                          sx={{ 
                            fontWeight: 600,
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            backgroundColor: isOverTarget ? 'error.light' : 'success.light',
                            display: 'inline-block'
                          }}
                        >
                          {isOverTarget ? 'Over Target' : 'On Track'}
                        </Typography>
                      </Box>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.min(percentage, 100)}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: isOverTarget ? '#ff4444' : '#4caf50',
                          borderRadius: 5
                        }
                      }}
                    />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Progress; 