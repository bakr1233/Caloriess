import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Box, Typography, Button } from '@mui/material';

function WebcamClassifier() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [result, setResult] = useState('');
  const [model, setModel] = useState(null);

  useEffect(() => {
    console.log('WebcamClassifier component mounted');
    const video = videoRef.current; // Store reference in a variable
    const loadModel = async () => {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
      console.log('Model loaded');
    };
    loadModel();

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
        })
        .catch((err) => {
          console.error('Error accessing the camera: ', err);
        });
    }

    return () => {
      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = async () => {
    const context = canvasRef.current.getContext('2d');
    const video = videoRef.current;

    // Set canvas dimensions to match the video stream
    canvasRef.current.width = video.videoWidth;
    canvasRef.current.height = video.videoHeight;

    // Draw the current frame from the video onto the canvas
    context.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);

    // Classify the captured image
    if (model) {
      const image = tf.browser.fromPixels(canvasRef.current);
      const predictions = await model.classify(image);
      console.log(predictions);
      setResult(`This is a ${predictions[0].className} (${Math.round(predictions[0].probability * 100)}%)`);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: 2,
      p: 4,
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Food Classifier
      </Typography>
      
      <Box sx={{ 
        position: 'relative',
        width: '100%',
        maxWidth: '640px'
      }}>
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted
          style={{ 
            width: '100%',
            borderRadius: '8px',
            transform: 'scaleX(-1)' // Mirror the video
          }}
        />
        <canvas 
          ref={canvasRef} 
          style={{ 
            display: 'none',
            width: '100%',
            borderRadius: '8px'
          }}
        />
      </Box>

      <Button 
        variant="contained" 
        onClick={handleCapture}
        sx={{
          background: 'linear-gradient(45deg, #1a237e, #3949ab)',
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
        Capture & Classify
      </Button>

      {result && (
        <Typography variant="h6" sx={{ mt: 2, color: '#1a237e' }}>
          {result}
        </Typography>
      )}
    </Box>
  );
}

export default WebcamClassifier; 