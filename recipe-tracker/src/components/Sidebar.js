import { List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VideocamIcon from '@mui/icons-material/Videocam';

function Sidebar() {
  const location = useLocation();

  return (
    <Box className="sidebar">
      <List>
        {[
          {
            icon: <DashboardIcon />,
            text: 'Dashboard',
            path: '/dashboard'
          },
          {
            icon: <RestaurantIcon />,
            text: 'Recipes',
            path: '/recipes'
          },
          {
            icon: <CalendarTodayIcon />,
            text: 'Meal Planner',
            path: '/meal-planner'
          },
          {
            icon: <TrendingUpIcon />,
            text: 'Progress',
            path: '/progress'
          },
          {
            icon: <VideocamIcon />,
            text: 'Webcam',
            path: '/webcam'
          }
        ].map((item) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.text}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar; 