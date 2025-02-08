import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMeals } from '../context/MealContext';

function MealPlanner() {
  const { weeklyPlan, addMeal, deleteMeal, getDailyCalories } = useMeals();
  const [open, setOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
    type: 'Breakfast'
  });

  const handleOpen = (dayIndex) => {
    setSelectedDay(dayIndex);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewMeal({ name: '', calories: '', type: 'Breakfast' });
  };

  const handleAddMeal = () => {
    if (newMeal.name && newMeal.calories) {
      addMeal(selectedDay, {
        ...newMeal,
        calories: parseInt(newMeal.calories)
      });
      handleClose();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 4, px: 3 }}>
      <Typography variant="h3" sx={{ mb: 15 }}>Meal Planner</Typography>

      {/* Scrollable container for day cards */}
      <Box 
        sx={{ 
          display: 'flex',
          overflowX: 'auto',
          pb: 2,
          mt: 4,
          '::-webkit-scrollbar': {
            height: '8px',
          },
          '::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
            '&:hover': {
              background: '#555',
            },
          },
          gap: 2
        }}
      >
        {weeklyPlan.map((day, index) => (
          <Card 
            key={day.day}
            sx={{ 
              minWidth: 300,
              maxWidth: 300,
              borderRadius: 2,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              flex: '0 0 auto'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">{day.day}</Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => handleOpen(index)}
                  size="small"
                  sx={{
                    background: 'linear-gradient(45deg, #1a237e, #3949ab)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #3949ab, #1a237e)'
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
              
              <Box sx={{ 
                maxHeight: '400px', 
                overflowY: 'auto',
                '::-webkit-scrollbar': {
                  width: '6px',
                },
                '::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '3px',
                },
                '::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: '3px',
                  '&:hover': {
                    background: '#555',
                  },
                },
              }}>
                {day.meals.map((meal) => (
                  <Box 
                    key={meal.id}
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1.5,
                      mb: 1,
                      borderRadius: 1,
                      backgroundColor: '#f5f5f5'
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {meal.type}
                      </Typography>
                      <Typography variant="body2">
                        {meal.name} - {meal.calories} cal
                      </Typography>
                    </Box>
                    <IconButton 
                      size="small"
                      onClick={() => deleteMeal(index, meal.id)}
                      sx={{ color: '#ff4444' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mt: 2,
                pt: 2,
                borderTop: '1px solid #eee'
              }}>
                <Typography variant="subtitle2">
                  Total Calories:
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {getDailyCalories(day)} cal
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Meal</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Meal Name"
              value={newMeal.name}
              onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Calories"
              type="number"
              value={newMeal.calories}
              onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Meal Type</InputLabel>
              <Select
                value={newMeal.type}
                label="Meal Type"
                onChange={(e) => setNewMeal({ ...newMeal, type: e.target.value })}
              >
                <MenuItem value="Breakfast">Breakfast</MenuItem>
                <MenuItem value="Lunch">Lunch</MenuItem>
                <MenuItem value="Dinner">Dinner</MenuItem>
                <MenuItem value="Snack">Snack</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddMeal} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default MealPlanner; 