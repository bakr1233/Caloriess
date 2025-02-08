import { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function CalorieTracker() {
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({ name: '', calories: '' });

  const handleAddMeal = () => {
    if (newMeal.name && newMeal.calories) {
      setMeals([...meals, { ...newMeal, id: Date.now() }]);
      setNewMeal({ name: '', calories: '' });
    }
  };

  const handleDeleteMeal = (id) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  const totalCalories = meals.reduce((sum, meal) => sum + Number(meal.calories), 0);

  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <Typography variant="h1">
            It has started
          </Typography>
          <Typography variant="h2" sx={{ mb: 4 }}>
            with mindful eating
          </Typography>
          <div className="decorative-line"></div>
        </div>
      </div>

      <Container maxWidth="lg">
        <div className="features-grid">
          <div className="feature-image" style={{ backgroundImage: 'url("/images/healthy-food.jpg")' }}></div>
          <div className="feature-content">
            <Typography variant="h3" gutterBottom>
              Track Your Journey
            </Typography>
            <Typography variant="body1">
              Every meal is a step towards your health goals. Keep track of your nutrition with our simple and elegant tracking system.
            </Typography>
          </div>
        </div>

        <Paper elevation={0} className="form-container">
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'var(--font-heading)' }}>
            Add Today's Meal
          </Typography>
          <div className="decorative-line"></div>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <TextField
              fullWidth
              label="What did you eat?"
              variant="standard"
              value={newMeal.name}
              onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
              className="input-field"
            />
            <TextField
              label="Calories"
              type="number"
              variant="standard"
              value={newMeal.calories}
              onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
              sx={{ width: '150px' }}
              className="input-field"
            />
            <Button 
              className="btn-custom"
              onClick={handleAddMeal}
            >
              Add
            </Button>
          </Box>

          <div className="meal-list">
            {meals.map((meal) => (
              <div key={meal.id} className="meal-item">
                <Typography variant="h6" sx={{ fontFamily: 'var(--font-heading)' }}>
                  {meal.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography>
                    {meal.calories} calories
                  </Typography>
                  <DeleteIcon 
                    onClick={() => handleDeleteMeal(meal.id)}
                    sx={{ cursor: 'pointer' }}
                  />
                </Box>
              </div>
            ))}
          </div>

          <Box sx={{ mt: 4, textAlign: 'right' }}>
            <Typography variant="h4" sx={{ fontFamily: 'var(--font-heading)' }}>
              Total: {totalCalories} calories
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default CalorieTracker; 