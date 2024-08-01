import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    background:  {  
      default: '#FFFFFF', // Fondo negro
      paper: '#FFFFFF', // Papel negro
    },
    text: {
      primary: '#000000', // Texto principal amarillo
      secondary: '#000000', // Texto secundario amarillo
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FBCE36', // Color de la barra de arriba
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#000000', // Color de texto de los botones
          backgroundColor: '#FFFFFF', // Fondo de los botones
          '&:hover': {
            backgroundColor: '#FBCE36', // Fondo al pasar el mouse
            color: '#000000', // Color de texto al pasar el mouse
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#000000', // Color del texto en las tablas
          fontFamily: 'Arial, sans-serif', // Cambiar la tipografía de las tablas
          fontSize: '16px', // Tamaño de la fuente en las tablas
        },
      },
    },
  },
});

export default theme;
