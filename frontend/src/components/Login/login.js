import * as React from 'react';
import {Avatar,Button,CssBaseline,TextField} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Logo, { LogImage } from '../Img';
import { LogImage2 } from '../Img';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FBCE36', // Color principal del botón
    },
    secondary: {
      main: '#FFFFFF', // Color del botón al pasar el cursor
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff', // Fondo del botón
          color: '#000000', // Color del texto del botón
          '&:hover': {
            backgroundColor: '#FBCE36', // Color del botón con el mouse arriba 
            color: '#000000',
          },
        },
      },
    },
  },
});

export default function Login() {
  const Navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const User = data.get('User');
    const password = data.get('password');

    // Simple validation
    if (!User || !password) {
      alert('Please fill in both fields.');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    // Simulate successful login
    console.log({
      User,
      password,
    });

    // Redirect to dashboard
    Navigate('/projects');
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:'url('+LogImage+')',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 'auto',  // Center horizontally
              maxWidth: 400,  // Limit the width
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 4,  // Add padding
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <img src={Logo} alt="logo" style={{ width: 40, height: 40 , objectFit: 'cover'}} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="User"
                label="User"
                name="User"
                autoComplete="User"
                autoFocus
                sx={{ mb: 2 }}  // Add margin-bottom
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{ mb: 2 }}  // Add margin-bottom
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{ mb: 2 }}  // Add margin-bottom
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"  // Change button color
                sx={{ mt: 2, mb: 2, py: 1.5 }}  // Add margin-top and padding
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
