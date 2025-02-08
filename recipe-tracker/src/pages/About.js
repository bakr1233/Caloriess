import { Container, Typography, Grid, Box } from '@mui/material';

function About() {
  return (
    <div>
      <div className="sub-hero">
        <div className="hero-content">
          <Typography variant="h1">Our Story</Typography>
          <div className="decorative-line"></div>
        </div>
      </div>

      <Container maxWidth="lg">
        <Grid container spacing={8} className="about-section">
          <Grid item xs={12} md={6}>
            <div className="about-image" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3")' }}></div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="about-content">
              <Typography variant="h3" gutterBottom>
                Our Mission
              </Typography>
              <div className="decorative-line"></div>
              <Typography variant="body1" paragraph>
                We believe in making healthy living accessible and enjoyable for everyone. Our journey began with a simple idea: to create a tool that makes tracking nutrition not just easy, but delightful.
              </Typography>
              <Typography variant="body1">
                Every feature in our app is designed with your wellness journey in mind, helping you make informed decisions about your nutrition while celebrating every step of your progress.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <div className="values-section">
          <Typography variant="h3" className="section-title">
            Our Values
          </Typography>
          <div className="decorative-line"></div>
          <Grid container spacing={4}>
            {[
              {
                title: "Simplicity",
                description: "We believe in keeping things simple and intuitive"
              },
              {
                title: "Mindfulness",
                description: "Encouraging conscious decisions about nutrition"
              },
              {
                title: "Progress",
                description: "Celebrating every step of your wellness journey"
              }
            ].map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <div className="value-card">
                  <Typography variant="h5" gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography>
                    {value.description}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default About; 