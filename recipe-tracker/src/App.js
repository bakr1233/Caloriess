import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Recipes from './pages/Recipes';
import MealPlanner from './pages/MealPlanner';
import Progress from './pages/Progress';
import Webcam from './components/Webcam';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="floating-shapes">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
      </div>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/webcam" element={<Webcam />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
