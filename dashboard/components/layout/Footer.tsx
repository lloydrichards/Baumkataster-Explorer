import { Container, Paper, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Paper
      elevation={2}
      square
      style={{
        padding: '3.1rem 1rem',
      }}
    >
      <Container>
        <Typography align="center" variant="body2">
          @2022 lloydrichardsdesign.com
        </Typography>
      </Container>
    </Paper>
  );
};

export default Footer;
