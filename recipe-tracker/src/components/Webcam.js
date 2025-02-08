import React, { useRef, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

function Webcam() {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setIsCameraOn(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: 2,
      p: 3,
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Webcam
      </Typography>
      
      <Box sx={{ 
        position: 'relative',
        width: '100%',
        maxWidth: '640px',
        height: '360px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scaleX(-1)' // Mirror the video
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          onClick={startCamera}
          disabled={isCameraOn}
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
          Start Camera
        </Button>

        <Button 
          variant="outlined" 
          onClick={stopCamera}
          disabled={!isCameraOn}
          sx={{
            borderColor: '#1a237e',
            color: '#1a237e',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            borderRadius: '50px',
            '&:hover': {
              backgroundColor: '#e8eaf6',
              borderColor: '#1a237e'
            }
          }}
        >
          Stop Camera
        </Button>
      </Box>
    </Box>
  );
}

export default Webcam; 