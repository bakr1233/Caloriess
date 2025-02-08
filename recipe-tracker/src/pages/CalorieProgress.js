import { Box, Typography, Grid, Card, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';

function CalorieProgress() {
  const [timeRange, setTimeRange] = useState('week');

  const weeklyData = [
    { date: 'Mon', consumed: 2100, burned: 2300, target: 2400 },
    { date: 'Tue', consumed: 2300, burned: 2400, target: 2400 },
    { date: 'Wed', consumed: 1950, burned: 2200, target: 2400 },
    { date: 'Thu', consumed: 2400, burned: 2600, target: 2400 },
    { date: 'Fri', consumed: 2200, burned: 2500, target: 2400 },
    { date: 'Sat', consumed: 2600, burned: 2800, target: 2400 },
    { date: 'Sun', consumed: 2000, burned: 2100, target: 2400 }
  ];

  const monthlyData = Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    consumed: 2000 + Math.random() * 800,
    burned: 2200 + Math.random() * 800,
    target: 2400
  }));

  const data = timeRange === 'week' ? weeklyData : monthlyData;

  return (
    <Box className="calorie-tracking-page" sx={{ 
      marginLeft: 'var(--sidebar-width)',
      padding: '1.5rem',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
    }}>
      <Box sx={{ 
        width: '94%',
        maxWidth: '1800px'
      }}>
        <Box className="tracking-header" sx={{ 
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h3" className="tracking-title" sx={{ fontSize: '2rem' }}>
            Calorie Tracking
          </Typography>
          <FormControl variant="outlined" size="small" className="time-range-select">
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Time Range"
            >
              <MenuItem value="week">Week</MenuItem>
              <MenuItem value="month">Month</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card className="main-chart-card" sx={{ p: 2 }}>
              <Typography variant="h6" className="chart-title" sx={{ fontSize: '1.25rem', mb: 2 }}>
                Calories Overview
              </Typography>
              <Box className="chart-container" sx={{ 
                height: '350px',
                width: '100%'
              }}>
                <ResponsiveContainer>
                  <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorConsumed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7077A1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#7077A1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorBurned" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F6B17A" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#F6B17A" stopOpacity={0}/>
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
                      dataKey="consumed"
                      stroke="#7077A1"
                      fillOpacity={1}
                      fill="url(#colorConsumed)"
                      name="Calories Consumed"
                    />
                    <Area
                      type="monotone"
                      dataKey="burned"
                      stroke="#F6B17A"
                      fillOpacity={1}
                      fill="url(#colorBurned)"
                      name="Calories Burned"
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#FF5C8D"
                      strokeDasharray="5 5"
                      name="Daily Target"
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
                Net Calories Trend
              </Typography>
              <Box className="chart-container" sx={{ height: '220px' }}>
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
                      dataKey="consumed" 
                      stroke="#7077A1" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      name="Net Calories"
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
                Daily Statistics
              </Typography>
              <Box className="daily-stats" sx={{ 
                py: 1.5,
                gap: 2,
                display: 'flex',
                justifyContent: 'space-around'
              }}>
                <Box className="stat-item" sx={{ p: 2 }}>
                  <Typography variant="h4" color="primary" sx={{ fontSize: '2rem' }}>
                    2,465
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                    Avg. Consumed
                  </Typography>
                </Box>
                <Box className="stat-item" sx={{ p: 2 }}>
                  <Typography variant="h4" color="secondary" sx={{ fontSize: '2rem' }}>
                    2,650
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                    Avg. Burned
                  </Typography>
                </Box>
                <Box className="stat-item" sx={{ p: 2 }}>
                  <Typography variant="h4" sx={{ fontSize: '2rem', color: '#FF5C8D' }}>
                    92%
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                    Goal Progress
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CalorieProgress; 