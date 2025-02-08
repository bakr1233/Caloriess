import React, { useRef, useEffect, useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Grid, CircularProgress, Chip } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function Webcam() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const canvasRef = useRef(null);

  // Update the nutrition database with more fruits
  const nutritionDB = {
    apple: {
      name: 'Apple',
      calories: 95,
      protein: 0.5,
      carbs: 25,
      fat: 0.3,
      vitamins: ['Vitamin C', 'Vitamin B6', 'Vitamin K'],
      minerals: ['Potassium', 'Manganese', 'Copper'],
      fiber: 4.5
    },
    banana: {
      name: 'Banana',
      calories: 105,
      protein: 1.3,
      carbs: 27,
      fat: 0.4,
      vitamins: ['Vitamin B6', 'Vitamin C', 'Vitamin A'],
      minerals: ['Potassium', 'Magnesium', 'Manganese'],
      fiber: 3.1
    },
    orange: {
      name: 'Orange',
      calories: 62,
      protein: 1.2,
      carbs: 15,
      fat: 0.2,
      vitamins: ['Vitamin C', 'Vitamin B1', 'Folate'],
      minerals: ['Potassium', 'Calcium', 'Magnesium'],
      fiber: 3.1
    },
    strawberry: {
      name: 'Strawberry',
      calories: 32,
      protein: 0.7,
      carbs: 7.7,
      fat: 0.3,
      vitamins: ['Vitamin C', 'Vitamin B9', 'Vitamin K'],
      minerals: ['Manganese', 'Potassium', 'Magnesium'],
      fiber: 2
    },
    blueberry: {
      name: 'Blueberry',
      calories: 57,
      protein: 0.7,
      carbs: 14,
      fat: 0.3,
      vitamins: ['Vitamin K', 'Vitamin C', 'Vitamin B6'],
      minerals: ['Manganese', 'Iron', 'Calcium'],
      fiber: 2.4
    },
    mango: {
      name: 'Mango',
      calories: 99,
      protein: 1.4,
      carbs: 24.7,
      fat: 0.6,
      vitamins: ['Vitamin C', 'Vitamin A', 'Vitamin B6'],
      minerals: ['Copper', 'Potassium', 'Magnesium'],
      fiber: 2.6
    },
    pineapple: {
      name: 'Pineapple',
      calories: 82,
      protein: 0.9,
      carbs: 21.6,
      fat: 0.2,
      vitamins: ['Vitamin C', 'Vitamin B6', 'Vitamin B1'],
      minerals: ['Manganese', 'Copper', 'Potassium'],
      fiber: 2.3
    },
    grape: {
      name: 'Grape',
      calories: 69,
      protein: 0.7,
      carbs: 18,
      fat: 0.2,
      vitamins: ['Vitamin K', 'Vitamin C', 'Vitamin B6'],
      minerals: ['Copper', 'Potassium', 'Manganese'],
      fiber: 0.9
    },
    kiwi: {
      name: 'Kiwi',
      calories: 61,
      protein: 1.1,
      carbs: 14.7,
      fat: 0.5,
      vitamins: ['Vitamin C', 'Vitamin K', 'Vitamin E'],
      minerals: ['Potassium', 'Copper', 'Magnesium'],
      fiber: 3
    },
    peach: {
      name: 'Peach',
      calories: 39,
      protein: 0.9,
      carbs: 9.5,
      fat: 0.3,
      vitamins: ['Vitamin C', 'Vitamin A', 'Vitamin E'],
      minerals: ['Potassium', 'Magnesium', 'Phosphorus'],
      fiber: 1.5
    },
    pear: {
      name: 'Pear',
      calories: 57,
      protein: 0.4,
      carbs: 15,
      fat: 0.1,
      vitamins: ['Vitamin C', 'Vitamin K', 'Vitamin B6'],
      minerals: ['Copper', 'Potassium', 'Magnesium'],
      fiber: 3.1
    },
    watermelon: {
      name: 'Watermelon',
      calories: 30,
      protein: 0.6,
      carbs: 7.6,
      fat: 0.2,
      vitamins: ['Vitamin C', 'Vitamin A', 'Vitamin B6'],
      minerals: ['Potassium', 'Magnesium', 'Zinc'],
      fiber: 0.4
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setAnalysisResult(null);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      
      // Get image data
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      return imageData;
    }
    return null;
  };

  const analyzeFood = async () => {
    setIsAnalyzing(true);
    const imageData = captureImage();
    
    if (!imageData) {
      console.error('No image captured');
      setIsAnalyzing(false);
      return;
    }

    try {
      // Here you would normally send the image to an API
      // For demo, we'll simulate API call and use the database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo: Match closest fruit based on predefined conditions
      // In reality, this would come from the API response
      const detectedFruit = 'pear'; // This would come from API
      const result = nutritionDB[detectedFruit];
      
      if (result) {
        setAnalysisResult(result);
      } else {
        console.error('Fruit not found in database');
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
    }
    
    setIsAnalyzing(false);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Food Scanner
          </Typography>
          <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                width: '100%',
                borderRadius: '8px',
                display: stream ? 'block' : 'none'
              }}
            />
            {!stream && (
              <Box 
                sx={{ 
                  height: 400, 
                  bgcolor: 'grey.100', 
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography color="text.secondary">
                  Camera not started
                </Typography>
              </Box>
            )}
          </Box>
          <canvas
            ref={canvasRef}
            style={{ display: 'none' }}
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            {!stream ? (
              <Button
                variant="contained"
                startIcon={<CameraAltIcon />}
                onClick={startCamera}
                sx={{
                  background: 'linear-gradient(45deg, #1a237e, #3949ab)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #3949ab, #1a237e)'
                  }
                }}
              >
                Start Camera
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<RestartAltIcon />}
                  onClick={stopCamera}
                >
                  Stop Camera
                </Button>
                <Button
                  variant="contained"
                  onClick={analyzeFood}
                  disabled={isAnalyzing}
                  sx={{
                    background: 'linear-gradient(45deg, #1a237e, #3949ab)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #3949ab, #1a237e)'
                    }
                  }}
                >
                  {isAnalyzing ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Analyze Food'
                  )}
                </Button>
              </>
            )}
          </Box>
        </CardContent>
      </Card>

      {analysisResult && (
        <Card sx={{ 
          background: 'linear-gradient(to right bottom, #ffffff, #f8f9ff)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <CardContent>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              mb: 4,
              pb: 2,
              borderBottom: '1px solid rgba(0,0,0,0.1)'
            }}>
              <Typography variant="h5" sx={{ color: '#1a237e' }}>
                {analysisResult.name}
              </Typography>
              <Chip 
                label="Scanned Result" 
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(26, 35, 126, 0.1)',
                  color: '#1a237e'
                }} 
              />
            </Box>
            
            <Grid container spacing={4}>
              {/* Macronutrients */}
              <Grid item xs={12}>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    color: '#1a237e',
                    fontWeight: 500,
                    mb: 3
                  }}
                >
                  Nutritional Information
                </Typography>
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' },
                  gap: 3
                }}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'white', 
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Calories
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#1a237e', fontWeight: 600 }}>
                      {analysisResult.calories}
                      <Typography component="span" variant="caption" sx={{ ml: 0.5 }}>
                        kcal
                      </Typography>
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'white', 
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Protein
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#1a237e', fontWeight: 600 }}>
                      {analysisResult.protein}
                      <Typography component="span" variant="caption" sx={{ ml: 0.5 }}>
                        g
                      </Typography>
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'white', 
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Carbs
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#1a237e', fontWeight: 600 }}>
                      {analysisResult.carbs}
                      <Typography component="span" variant="caption" sx={{ ml: 0.5 }}>
                        g
                      </Typography>
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'white', 
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Fat
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#1a237e', fontWeight: 600 }}>
                      {analysisResult.fat}
                      <Typography component="span" variant="caption" sx={{ ml: 0.5 }}>
                        g
                      </Typography>
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'white', 
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Fiber
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#1a237e', fontWeight: 600 }}>
                      {analysisResult.fiber}
                      <Typography component="span" variant="caption" sx={{ ml: 0.5 }}>
                        g
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Vitamins and Minerals */}
              <Grid item xs={12} container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    p: 3, 
                    bgcolor: 'white', 
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ color: '#1a237e', fontWeight: 500, mb: 2 }}
                    >
                      Vitamins
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {analysisResult.vitamins.map((vitamin) => (
                        <Chip 
                          key={vitamin}
                          label={vitamin}
                          sx={{ 
                            backgroundColor: 'rgba(26, 35, 126, 0.1)',
                            color: '#1a237e',
                            fontWeight: 500
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    p: 3, 
                    bgcolor: 'white', 
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ color: '#1a237e', fontWeight: 500, mb: 2 }}
                    >
                      Minerals
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {analysisResult.minerals.map((mineral) => (
                        <Chip 
                          key={mineral}
                          label={mineral}
                          sx={{ 
                            backgroundColor: 'rgba(26, 35, 126, 0.1)',
                            color: '#1a237e',
                            fontWeight: 500
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default Webcam; 