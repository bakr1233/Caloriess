import { Box, CssBaseline, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Sidebar from './Sidebar';

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Mobile menu button */}
      <IconButton
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1100,
          display: { xs: 'block', md: 'none' }
        }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar */}
      <Box className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar />
      </Box>

      {/* Main content */}
      <Box
        component="main"
        className="main-content"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: { md: '240px' }
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout; 