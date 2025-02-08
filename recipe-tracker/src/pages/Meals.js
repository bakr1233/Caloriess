import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Meals() {
  const meals = [
    {
      id: 1,
      name: 'Vegetarian Salad Bowl',
      image: '/images/salad.jpg',
      servings: '5 servings left',
      type: 'Salad',
      budget: 'Low',
      locations: '2'
    },
    {
      id: 2,
      name: 'Grilled Chicken Wrap',
      image: '/images/wrap.jpg',
      servings: '3 servings left',
      type: 'Wrap',
      budget: 'Moderat',
      locations: '1 location'
    },
    {
      id: 3,
      name: 'Vegetable Stir-Fry',
      image: '/images/stir-fry.jpg',
      servings: '1 serving left',
      type: 'Stir-Fry',
      budget: 'High Fiber',
      locations: '1 location'
    }
  ];

  return (
    <div className="main-content">
      <div className="dashboard-header">
        <Box>
          <Typography variant="h4">Category - Meals</Typography>
          <Typography variant="body2" color="textSecondary">
            Last update January 29, 2023 at
          </Typography>
        </Box>
      </div>

      <Box className="search-section">
        <Box className="search-container">
          <TextField
            fullWidth
            placeholder="Search Meals"
            variant="outlined"
            InputProps={{
              startAdornment: <SearchIcon />,
              className: "search-input"
            }}
          />
        </Box>
        <Button
          variant="contained"
          startIcon={<FilterListIcon />}
          className="filter-button"
        >
          Filter by Budget
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="add-meal-button"
        >
          Add Meal
        </Button>
      </Box>

      <Box className="meals-table">
        <Box className="table-header">
          <Grid container alignItems="center">
            <Grid item xs={0.5}></Grid>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={3}>
              <Typography>Meal Name</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>Budg</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>Calorie</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>Meal</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>Meal</Typography>
            </Grid>
          </Grid>
        </Box>

        {meals.map((meal) => (
          <Box key={meal.id} className="meal-row">
            <Grid container alignItems="center">
              <Grid item xs={0.5}>
                <CheckCircleIcon className="check-icon" />
              </Grid>
              <Grid item xs={0.5}>
                <Box
                  component="img"
                  src={meal.image}
                  alt={meal.name}
                  className="meal-image"
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>{meal.name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Box className={`budget-tag ${meal.budget.toLowerCase()}`}>
                  {meal.budget}
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Typography>{meal.servings}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{meal.type}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{meal.locations}</Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default Meals; 