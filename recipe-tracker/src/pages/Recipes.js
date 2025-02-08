import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Snackbar,
  Alert,
  Menu,
  FormControlLabel,
  RadioGroup,
  Radio,
  Popover,
  Stack,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useMeals } from '../context/MealContext';

function Recipes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes] = useState([
    {
      id: 1,
      title: 'Grilled Chicken Salad',
      description: 'Fresh and healthy salad with grilled chicken breast, mixed greens, avocado, and honey mustard dressing',
      calories: 350,
      time: '20 min',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
      tags: ['Healthy', 'High Protein', 'Low Carb'],
      isFavorite: false
    },
    {
      id: 2,
      title: 'Quinoa Buddha Bowl',
      description: 'Nutrient-rich bowl with quinoa, roasted chickpeas, sweet potato, kale, and tahini dressing',
      calories: 450,
      time: '30 min',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      tags: ['Vegetarian', 'High Protein', 'Gluten Free'],
      isFavorite: true
    },
    {
      id: 3,
      title: 'Baked Salmon',
      description: 'Herb-crusted salmon fillet with roasted asparagus and lemon butter sauce',
      calories: 550,
      time: '25 min',
      price: 20.99,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
      tags: ['High Protein', 'Omega 3', 'Gluten Free'],
      isFavorite: false
    },
    {
      id: 4,
      title: 'Mediterranean Pasta',
      description: 'Whole grain pasta with cherry tomatoes, olives, feta cheese, and fresh basil',
      calories: 480,
      time: '25 min',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
      tags: ['Vegetarian', 'Mediterranean', 'Whole Grain'],
      isFavorite: false
    },
    {
      id: 5,
      title: 'Avocado Toast',
      description: 'Sourdough bread topped with mashed avocado, poached egg, and chili flakes',
      calories: 320,
      time: '15 min',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d',
      tags: ['Breakfast', 'Vegetarian', 'Quick'],
      isFavorite: false
    },
    {
      id: 6,
      title: 'Teriyaki Chicken Bowl',
      description: 'Grilled teriyaki chicken with steamed broccoli and brown rice',
      calories: 520,
      time: '30 min',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369',
      tags: ['Asian', 'High Protein', 'Meal Prep'],
      isFavorite: false
    },
    {
      id: 7,
      title: 'Greek Yogurt Parfait',
      description: 'Layered Greek yogurt with honey, granola, and mixed berries',
      calories: 280,
      time: '10 min',
      price: 7.99,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777',
      tags: ['Breakfast', 'High Protein', 'Quick'],
      isFavorite: false
    },
    {
      id: 8,
      title: 'Veggie Stir Fry',
      description: 'Mixed vegetables and tofu stir-fried in ginger-soy sauce with brown rice',
      calories: 380,
      time: '25 min',
      price: 10.99,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19',
      tags: ['Vegan', 'Low Calorie', 'Asian'],
      isFavorite: false
    },
    {
      id: 9,
      title: 'Turkey Burger',
      description: 'Lean turkey burger with avocado, lettuce, and sweet potato fries',
      calories: 490,
      time: '30 min',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1586816001966-79b736744398',
      tags: ['High Protein', 'Healthy', 'Burger'],
      isFavorite: false
    },
    {
      id: 10,
      title: 'Shrimp Tacos',
      description: 'Grilled shrimp tacos with cabbage slaw and chipotle cream sauce',
      calories: 420,
      time: '25 min',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1512838243191-e81e8f66f1fd',
      tags: ['Seafood', 'Mexican', 'Quick'],
      isFavorite: false
    },
    {
      id: 11,
      title: 'Overnight Oats',
      description: 'Rolled oats soaked with almond milk, chia seeds, and topped with fruits',
      calories: 310,
      time: '5 min',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf',
      tags: ['Breakfast', 'Vegan', 'Meal Prep'],
      isFavorite: false
    },
    {
      id: 12,
      title: 'Caprese Sandwich',
      description: 'Fresh mozzarella, tomatoes, and basil on ciabatta bread with balsamic glaze',
      calories: 440,
      time: '15 min',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af',
      tags: ['Vegetarian', 'Italian', 'Quick'],
      isFavorite: false
    }
  ]);

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('recipeFavorites');
    if (savedFavorites) {
      return JSON.parse(savedFavorites);
    }
    return recipes.reduce((acc, recipe) => ({ 
      ...acc, 
      [recipe.id]: recipe.isFavorite 
    }), {});
  });

  useEffect(() => {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const { addMeal } = useMeals();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [addMealDialog, setAddMealDialog] = useState(false);
  const [mealDetails, setMealDetails] = useState({
    day: 0,
    type: 'Breakfast'
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState('none');
  const [filterNutrient, setFilterNutrient] = useState('all');
  const [calorieRange, setCalorieRange] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const toggleFavorite = (recipeId, event) => {
    event.stopPropagation();
    setFavorites(prev => {
      const newFavorites = {
        ...prev,
        [recipeId]: !prev[recipeId]
      };
      // Show notification
      setSnackbar({
        open: true,
        message: newFavorites[recipeId] 
          ? 'Recipe added to favorites'
          : 'Recipe removed from favorites'
      });
      return newFavorites;
    });
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const filterOpen = Boolean(anchorEl);

  // Filter and sort recipes
  const filteredRecipes = recipes
    .filter(recipe => {
      // Text search
      const matchesSearch = 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Calorie range filter
      let matchesCalories = true;
      if (calorieRange === 'low') {
        matchesCalories = recipe.calories < 300;
      } else if (calorieRange === 'medium') {
        matchesCalories = recipe.calories >= 300 && recipe.calories <= 600;
      } else if (calorieRange === 'high') {
        matchesCalories = recipe.calories > 600;
      }

      // Nutrient filter
      let matchesNutrient = true;
      if (filterNutrient !== 'all') {
        matchesNutrient = recipe.tags.includes(filterNutrient);
      }

      // Price range filter
      let matchesPrice = true;
      if (priceRange === 'low') {
        matchesPrice = recipe.price < 10;
      } else if (priceRange === 'medium') {
        matchesPrice = recipe.price >= 10 && recipe.price <= 20;
      } else if (priceRange === 'high') {
        matchesPrice = recipe.price > 20;
      }

      return matchesSearch && matchesCalories && matchesNutrient && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'time-asc':
          return parseInt(a.time) - parseInt(b.time);
        case 'time-desc':
          return parseInt(b.time) - parseInt(a.time);
        case 'calories-asc':
          return a.calories - b.calories;
        case 'calories-desc':
          return b.calories - a.calories;
        default:
          return 0;
      }
    });

  const handleAddToMealPlan = (recipe) => {
    setSelectedRecipe(recipe);
    setAddMealDialog(true);
  };

  const handleAddMeal = () => {
    addMeal(mealDetails.day, {
      name: selectedRecipe.title,
      calories: selectedRecipe.calories,
      type: mealDetails.type
    });
    setAddMealDialog(false);
    setSelectedRecipe(null);
    setMealDetails({ day: 0, type: 'Breakfast' });
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 4, px: 3 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ mb: 4 }}>Recipes</Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            sx={{ flex: 1 }}
            placeholder="Search recipes by name, description, or tags..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilterClick}
            sx={{ minWidth: 120 }}
          >
            Filter
          </Button>
        </Box>

        <Popover
          open={filterOpen}
          anchorEl={anchorEl}
          onClose={handleFilterClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ p: 3, minWidth: 300 }}>
            <Stack spacing={3}>
              {/* Sort Options */}
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Sort By
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <FormControlLabel value="name-asc" control={<Radio />} label="Name (A-Z)" />
                    <FormControlLabel value="name-desc" control={<Radio />} label="Name (Z-A)" />
                    <FormControlLabel value="time-asc" control={<Radio />} label="Preparation Time (Low to High)" />
                    <FormControlLabel value="time-desc" control={<Radio />} label="Preparation Time (High to Low)" />
                    <FormControlLabel value="calories-asc" control={<Radio />} label="Calories (Low to High)" />
                    <FormControlLabel value="calories-desc" control={<Radio />} label="Calories (High to Low)" />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Divider />

              {/* Calorie Range Filter */}
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Calorie Range
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={calorieRange}
                    onChange={(e) => setCalorieRange(e.target.value)}
                  >
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                    <FormControlLabel value="low" control={<Radio />} label="Low Calorie (< 300)" />
                    <FormControlLabel value="medium" control={<Radio />} label="Medium Calorie (300-600)" />
                    <FormControlLabel value="high" control={<Radio />} label="High Calorie (> 600)" />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Divider />

              {/* Nutrient Filter */}
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Nutritional Benefits
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={filterNutrient}
                    onChange={(e) => setFilterNutrient(e.target.value)}
                  >
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                    <FormControlLabel value="High Protein" control={<Radio />} label="High Protein" />
                    <FormControlLabel value="Low Carb" control={<Radio />} label="Low Carb" />
                    <FormControlLabel value="Gluten Free" control={<Radio />} label="Gluten Free" />
                    <FormControlLabel value="Vegetarian" control={<Radio />} label="Vegetarian" />
                    <FormControlLabel value="Vegan" control={<Radio />} label="Vegan" />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Divider />

              {/* Price Range Filter */}
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Price Range
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    <FormControlLabel value="all" control={<Radio />} label="All Prices" />
                    <FormControlLabel value="low" control={<Radio />} label="Budget (< $10)" />
                    <FormControlLabel value="medium" control={<Radio />} label="Moderate ($10-$20)" />
                    <FormControlLabel value="high" control={<Radio />} label="Premium (> $20)" />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Stack>
          </Box>
        </Popover>
      </Box>

      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'transform 0.2s',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }
              }}
              onClick={() => handleAddToMealPlan(recipe)}
            >
              <CardMedia
                component="img"
                height="200"
                image={recipe.image}
                alt={recipe.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" gutterBottom>
                    {recipe.title}
                  </Typography>
                  <IconButton 
                    onClick={(e) => toggleFavorite(recipe.id, e)}
                    sx={{ 
                      p: 0.5,
                      color: favorites[recipe.id] ? '#ff4444' : 'inherit'
                    }}
                  >
                    {favorites[recipe.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {recipe.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocalFireDepartmentIcon fontSize="small" />
                    <Typography variant="body2">
                      {recipe.calories} cal
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="body2">
                      {recipe.time}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AttachMoneyIcon fontSize="small" />
                    <Typography variant="body2">
                      ${recipe.price.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {recipe.tags.map((tag) => (
                    <Chip 
                      key={tag} 
                      label={tag} 
                      size="small"
                      sx={{ 
                        backgroundColor: 'rgba(26, 35, 126, 0.1)',
                        color: '#1a237e'
                      }} 
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={addMealDialog} onClose={() => setAddMealDialog(false)}>
        <DialogTitle>Add to Meal Plan</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {selectedRecipe && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 300 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <img 
                  src={selectedRecipe.image} 
                  alt={selectedRecipe.title}
                  style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover' }}
                />
                <Box>
                  <Typography variant="h6">{selectedRecipe.title}</Typography>
                  <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary' }}>
                    <Typography variant="body2">
                      {selectedRecipe.calories} calories
                    </Typography>
                    <Typography variant="body2">
                      ${selectedRecipe.price.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <FormControl fullWidth>
                <InputLabel>Day</InputLabel>
                <Select
                  value={mealDetails.day}
                  label="Day"
                  onChange={(e) => setMealDetails({ ...mealDetails, day: e.target.value })}
                >
                  <MenuItem value={0}>Monday</MenuItem>
                  <MenuItem value={1}>Tuesday</MenuItem>
                  <MenuItem value={2}>Wednesday</MenuItem>
                  <MenuItem value={3}>Thursday</MenuItem>
                  <MenuItem value={4}>Friday</MenuItem>
                  <MenuItem value={5}>Saturday</MenuItem>
                  <MenuItem value={6}>Sunday</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Meal Type</InputLabel>
                <Select
                  value={mealDetails.type}
                  label="Meal Type"
                  onChange={(e) => setMealDetails({ ...mealDetails, type: e.target.value })}
                >
                  <MenuItem value="Breakfast">Breakfast</MenuItem>
                  <MenuItem value="Lunch">Lunch</MenuItem>
                  <MenuItem value="Dinner">Dinner</MenuItem>
                  <MenuItem value="Snack">Snack</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddMealDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAddMeal}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #1a237e, #3949ab)',
              '&:hover': {
                background: 'linear-gradient(45deg, #3949ab, #1a237e)'
              }
            }}
          >
            Add to Meal Plan
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Recipes; 