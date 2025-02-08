import { Box, Typography, Grid, Card, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SavingsIcon from '@mui/icons-material/Savings';

function Budgets() {
  const [timeRange, setTimeRange] = useState('week');

  const weeklyData = [
    { date: 'Week 1', spent: 750, budget: 800 },
    { date: 'Week 2', spent: 680, budget: 800 },
    { date: 'Week 3', spent: 820, budget: 800 },
    { date: 'Week 4', spent: 790, budget: 800 }
  ];

  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    date: `Month ${i + 1}`,
    spent: 700 + Math.random() * 200,
    budget: 800
  }));

  const data = timeRange === 'week' ? weeklyData : monthlyData;

  const summaryCards = [
    { title: 'Monthly Budget', amount: '$800', icon: AttachMoneyIcon, type: 'monthly' },
    { title: 'Spent this Month', amount: '$580', icon: TrendingUpIcon, type: 'spent' },
    { title: 'Remaining Budget', amount: '$220', icon: SavingsIcon, type: 'remaining' }
  ];

  return (
    <Box className="budget-page" sx={{ 
      marginLeft: 'var(--sidebar-width)',
      padding: '1.5rem',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
    }}>
      <Box sx={{ 
        width: '95%',
        maxWidth: '1400px'
      }}>
        <Box className="tracking-header" sx={{ 
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h3" className="tracking-title" sx={{ fontSize: '2rem' }}>
            Budget Overview
          </Typography>
          <FormControl variant="outlined" size="small" className="time-range-select">
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Time Range"
            >
              <MenuItem value="week">This Month</MenuItem>
              <MenuItem value="month">Last 3 Months</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card className="main-chart-card" sx={{ p: 2 }}>
              <Typography variant="h6" className="chart-title" sx={{ fontSize: '1.25rem', mb: 2 }}>
                Budget Overview
              </Typography>
              <Box className="chart-container" sx={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7077A1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#7077A1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'var(--card-background)',
                        border: '1px solid var(--card-hover)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="spent"
                      stroke="#7077A1"
                      fillOpacity={1}
                      fill="url(#colorSpent)"
                      name="Amount Spent"
                    />
                    <Line
                      type="monotone"
                      dataKey="budget"
                      stroke="#FF5C8D"
                      strokeDasharray="5 5"
                      name="Budget Limit"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="trend-card" sx={{ 
              height: '100%',
              p: 2,
              minHeight: '300px'
            }}>
              <Typography variant="h6" className="chart-title" sx={{ fontSize: '1.25rem', mb: 2 }}>
                Spending Distribution
              </Typography>
              <Box className="chart-container" sx={{ height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'var(--card-background)',
                        border: '1px solid var(--card-hover)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="spent" 
                      stroke="#7077A1" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      name="Spending Trend"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="stats-card" sx={{ 
              height: '100%',
              p: 2,
              minHeight: '300px'
            }}>
              <Typography variant="h6" className="chart-title" sx={{ fontSize: '1.25rem', mb: 2 }}>
                Budget Statistics
              </Typography>
              <Box className="daily-stats" sx={{ py: 2, gap: 2 }}>
                {summaryCards.map((card, index) => (
                  <Box key={index} className="stat-item" sx={{ p: 2 }}>
                    <Typography variant="h4" sx={{ fontSize: '2rem', color: card.type === 'monthly' ? '#7077A1' : 
                      card.type === 'spent' ? '#F6B17A' : '#4CAF50' }}>
                      {card.amount}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                      {card.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Budgets; 