import { Container, Typography, Box } from '@mui/material';

function MealPlanner() {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom>
          Meal Planner
        </Typography>
        {/* Add your meal planner content here */}
      </Box>
    </Container>
  );
}

export default MealPlanner; 