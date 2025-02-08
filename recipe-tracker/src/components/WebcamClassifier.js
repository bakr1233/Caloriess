import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import CustomFoodClassifier from './CustomModel';

const CLARIFAI_API_KEY = 'YOUR_CLARIFAI_API_KEY'; // Replace with your actual API key

const FRUITS = [
  'apple', 'banana', 'orange', 'strawberry', 'blueberry',
  'grape', 'pineapple', 'watermelon', 'pear', 'kiwi',
  'mango', 'peach', 'plum', 'raspberry', 'blackberry',
  'cherry', 'lemon', 'lime', 'pomegranate', 'apricot'
];

// Initialize the custom classifier
const customClassifier = new CustomFoodClassifier();

const recognizeFood = async (imageData) => {
  try {
    const response = await fetch('https://api.clarifai.com/v2/models/food-item-recognition/versions/1d5fd481e0cf4826aa72ec3ff049e044/outputs', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${CLARIFAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: [{ data: { image: { base64: imageData.split(',')[1] } } }]
      })
    });
    const data = await response.json();
    return data.outputs[0].data.concepts;
  } catch (error) {
    console.error('Error calling Clarifai API:', error);
    throw error;
  }
};

function WebcamClassifier() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const scanInterval = useRef(null);

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Unable to access camera');
      }
    };

    setupCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      stopScanning();
    };
  }, []);

  const startScanning = () => {
    setIsScanning(true);
    scanInterval.current = setInterval(processFrame, 2000); // Process every 2 seconds
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (scanInterval.current) {
      clearInterval(scanInterval.current);
      scanInterval.current = null;
    }
  };

  const processFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    try {
      setIsLoading(true);
      setError(null);
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Improve image capture
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Add advanced preprocessing
      const processedCanvas = document.createElement('canvas');
      processedCanvas.width = 224;
      processedCanvas.height = 224;
      const ctx = processedCanvas.getContext('2d');
      
      // Enhance image quality
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(canvas, 0, 0, 224, 224);
      
      // Add contrast adjustment
      const imageData = ctx.getImageData(0, 0, 224, 224);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = Math.min(255, avg * 1.2); // Increase contrast
        data[i + 1] = Math.min(255, avg * 1.2);
        data[i + 2] = Math.min(255, avg * 1.2);
      }
      ctx.putImageData(imageData, 0, 0);

      // Convert to base64
      const processedImage = processedCanvas.toDataURL('image/jpeg', 0.9);

      // First check with custom classifier
      const customResult = await customClassifier.classify(processedCanvas);
      
      if (customResult.class === 'unrecognized') {
        setResult('Unrecognized item');
        stopScanning();
        return;
      }

      // If recognized, proceed with Clarifai API
      const results = await recognizeFood(processedImage);

      if (results && results.length > 0) {
        // Filter out "pear" if confidence is below 90%
        const validPredictions = results.filter(pred => 
          pred.name.toLowerCase() !== 'pear' || 
          pred.value >= 0.9
        );

        // Get top 3 valid predictions
        const topPredictions = validPredictions.slice(0, 3);
        
        // Find the first valid fruit prediction
        const validPrediction = topPredictions.find(pred => 
          pred.value >= 0.85 && 
          FRUITS.includes(pred.name.toLowerCase())
        );

        if (validPrediction) {
          setResult(`Detected: ${validPrediction.name} (${Math.round(validPrediction.value * 100)}% confident)`);
        } else {
          // Show all top predictions if no valid fruit is found
          const predictionsList = topPredictions
            .map(pred => `${pred.name} (${Math.round(pred.value * 100)}%)`)
            .join(', ');
          setResult(`Unrecognized item. Top predictions: ${predictionsList}`);
        }
        stopScanning();
      } else {
        setResult('Unrecognized item. Please try again with a different fruit.');
      }
    } catch (err) {
      console.error('Error during detection:', err);
      setResult('Failed to analyze image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanToggle = () => {
    if (isScanning) {
      stopScanning();
    } else {
      startScanning();
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: 2,
      p: 4 
    }}>
      <Typography variant="h4" gutterBottom>
        Food Scanner
      </Typography>

      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <Box sx={{ position: 'relative', width: '100%', maxWidth: '640px' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '100%',
            borderRadius: '8px',
            display: isLoading ? 'none' : 'block'
          }}
          onLoadedData={() => setIsLoading(false)}
        />
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />
        {isLoading && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '300px'
          }}>
            <CircularProgress />
          </Box>
        )}
      </Box>

      <Button
        variant="contained"
        onClick={handleScanToggle}
        disabled={isLoading || !!error}
        sx={{
          background: isScanning ? '#ff4444' : 'linear-gradient(45deg, #1a237e, #3949ab)',
          color: 'white',
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          borderRadius: '50px',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px rgba(26, 35, 126, 0.2)'
          }
        }}
      >
        {isLoading ? 'Processing...' : (isScanning ? 'Stop Scanning' : 'Start Scanning')}
      </Button>

      {result && (
        <Typography 
          variant="h6" 
          sx={{ 
            mt: 2, 
            color: '#1a237e',
            textAlign: 'center' 
          }}
        >
          {result}
        </Typography>
      )}
    </Box>
  );
}

export default WebcamClassifier; 