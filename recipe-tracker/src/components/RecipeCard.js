import { Box, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

function RecipeCard({ recipe, toggleFavorite }) {
  return (
    <Box sx={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }
    }}>
      <Box sx={{ p: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
            {recipe.title}
          </Typography>
          <IconButton size="small" onClick={() => toggleFavorite(recipe.id)}>
            {recipe.isFavorite ? (
              <FavoriteIcon fontSize="small" color="error" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
        </Box>

        <Typography variant="body2" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
          {recipe.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocalFireDepartmentIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              {recipe.calories} cal
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              {recipe.time}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RecipeCard; 