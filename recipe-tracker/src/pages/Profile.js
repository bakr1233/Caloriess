import { Box, Typography, Avatar, Button, TextField, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useEffect } from 'react';

function Profile() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Health enthusiast and food lover. Always looking for new ways to improve my diet and lifestyle.',
    stats: {
      mealsLogged: 128,
      recipesCreated: 12,
      caloriesTracked: 256000
    }
  };

  // Handle ResizeObserver error
  useEffect(() => {
    const resizeObserverError = error => {
      if (error.message.includes('ResizeObserver')) {
        const resizeObserverErr = document.getElementById('webpack-dev-server-client-overlay');
        if (resizeObserverErr) {
          resizeObserverErr.style.display = 'none';
        }
      }
    };

    window.addEventListener('error', resizeObserverError);
    return () => window.removeEventListener('error', resizeObserverError);
  }, []);

  return (
    <Box className="profile-page" sx={{ 
      marginLeft: 'var(--sidebar-width)',
      width: 'calc(100% - var(--sidebar-width))',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Cover and Profile Header */}
      <Box className="profile-cover" sx={{ width: '100%' }}>
        <Box className="profile-header-content">
          <Box className="profile-avatar-wrapper">
            <Avatar
              src="/path-to-avatar.jpg"
              alt={user.name}
              className="profile-avatar"
            />
            <IconButton className="camera-button" size="small">
              <CameraAltIcon />
            </IconButton>
          </Box>
          <Typography variant="h4" className="profile-name">
            {user.name}
          </Typography>
          <Typography variant="body1" className="profile-email">
            {user.email}
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        width: '95%',
        maxWidth: '1400px',
        mt: 4,
        mb: 4
      }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={4}>
            <Box className="profile-card about-section" sx={{ mb: 3 }}>
              <Typography variant="h5" className="card-title">
                About Me
              </Typography>
              <Typography className="bio-text">
                {user.bio}
              </Typography>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                className="edit-button"
                fullWidth
              >
                Edit Profile
              </Button>
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={8}>
            {/* Stats Section */}
            <Box className="profile-card stats-section" sx={{ mb: 3 }}>
              <Typography variant="h5" className="card-title">
                Activity Overview
              </Typography>
              <Box className="stats-grid">
                {[
                  { icon: LocalDiningIcon, value: user.stats.mealsLogged, label: 'Meals Logged' },
                  { icon: RestaurantMenuIcon, value: user.stats.recipesCreated, label: 'Recipes Created' },
                  { icon: WhatshotIcon, value: `${user.stats.caloriesTracked / 1000}k`, label: 'Calories Tracked' }
                ].map((stat, index) => (
                  <Box key={index} className="stat-card">
                    <stat.icon className="stat-icon" />
                    <Typography variant="h4" className="stat-value">
                      {stat.value}
                    </Typography>
                    <Typography className="stat-label">
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Settings Section */}
            <Box className="profile-card settings-section">
              <Typography variant="h5" className="card-title">
                Account Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    defaultValue={user.name}
                    className="settings-input"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    defaultValue={user.email}
                    className="settings-input"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    variant="outlined"
                    multiline
                    rows={4}
                    defaultValue={user.bio}
                    className="settings-input"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Profile; 