import * as React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Snackbar,
  Alert as MuiAlert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Logo from '../Img';
import { LogImage } from '../Img'; // Asegúrate de que la ruta a Logo es correcta

// Crear tema personalizado
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

// Componente de alerta
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function Login() {
  const navigate = useNavigate();
  const [userError, setUserError] = React.useState(''); // Estado para el error de usuario
  const [passwordError, setPasswordError] = React.useState(''); // Estado para el error de contraseña
  const [openSnackbar, setOpenSnackbar] = React.useState(false); // Estado del Snackbar
  const [snackbarMessage, setSnackbarMessage] = React.useState(''); // Mensaje del Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success'); // Severidad del Snackbar
   
  const validateUser = (user) => {
    return user && user.trim().length > 0;
  };

  const validatePassword = (password) => {
    return password && password.length >= 6;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('User');
    const password = data.get('password');

    // Validar los campos antes de hacer la petición
    if (!validateUser(email)) {
      setUserError('Username is required.');
      setSnackbarMessage('Username is required.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    } else {
      setUserError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters.');
      setSnackbarMessage('Password must be at least 6 characters.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    } else {
      setPasswordError('');
    }

    try {
      const response = await fetch(`http://localhost:8080/users/valid/${email}`, {
        method: "GET"
      });

      if (response.status !== 200) {
        setUserError('Please enter a valid username or password.');
        setSnackbarMessage('Please enter a valid username or password.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        return;
      }

      const userData = await response.json();
      console.log(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      navigate('/projects');
    } catch (error) {
      console.error('Error fetching user data:', error);
      setSnackbarMessage('There was an error processing your request. Please try again later.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
            backgroundImage: 'url(' + LogImage + ')',
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
              mx: 'auto',  // Centrar horizontalmente
              maxWidth: 400,  // Limitar el ancho
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 4,  // Añadir relleno
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <img src={Logo} alt="logo" style={{ width: 40, height: 40, objectFit: 'cover' }} />
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
                error={!!userError}
                helperText={userError}
                sx={{ mb: 2 }}  // Añadir margen inferior
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
                error={!!passwordError}
                helperText={passwordError}
                sx={{ mb: 2 }}  // Añadir margen inferior
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{ mb: 2 }}  // Añadir margen inferior
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"  // Cambiar color del botón
                sx={{ mt: 2, mb: 2, py: 1.5 }}  // Añadir margen superior e inferior y relleno
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* Snackbar para mostrar mensajes de éxito o error */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
