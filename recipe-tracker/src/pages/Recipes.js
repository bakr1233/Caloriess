import { useState } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import RecipeCard from '../components/RecipeCard';

function Recipes() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: 'Healthy Salad Bowl',
      calories: 250,
      time: '20 min',
      description: 'Fresh and nutritious salad with mixed greens and vinaigrette',
      isFavorite: false
    },
    {
      id: 2,
      title: 'Grilled Chicken',
      calories: 350,
      time: '30 min',
      description: 'Perfectly seasoned grilled chicken breast with herbs',
      isFavorite: true
    },
    {
      id: 3,
      title: 'Quinoa Buddha Bowl',
      calories: 400,
      time: '25 min',
      description: 'Nutrient-rich bowl with quinoa, roasted vegetables, and tahini dressing',
      isFavorite: false
    }
  ]);

  const toggleFavorite = (recipeId) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === recipeId 
        ? { ...recipe, isFavorite: !recipe.isFavorite }
        : recipe
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ 
      pt: 4,
      px: 3,
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3">Recipes</Typography>
      </Box>
      
      <Grid container spacing={2}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <RecipeCard
              recipe={recipe}
              toggleFavorite={toggleFavorite}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Recipes; 