const projectListTheme = {
    mainContainer: {
      width: '100%',
      margin: '50px auto', // Centrar el contenedor principal
      padding: '16px',
      background: 'linear-gradient(to bottom, #FADE40, white)', // Fondo degradado
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para profundidad
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start', // Alinear el contenido a la izquierda
      gap: '20px',
    },
    typographyContainer: {
      display: 'flex',
      alignItems: 'center', // Alinear verticalmente los elementos
      gap: '20px', // Separación entre el texto y el botón
    },
    typography: {
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'inherit',
      textDecoration: 'none',
      textAlign: 'left',
      margin: 0,
    },
    createProjectButton: {
      backgroundColor: 'white',
      color: 'black',
      '&:hover': {
        backgroundColor: '#FADE40',
        transform: 'scale(1.05)', // Efecto de crecimiento
      },
      transition: 'all 0.3s ease-in-out', // Suaviza el cambio
      padding: '8px 16px',
    },
    projectContainer: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start', // Alinear las tarjetas a la izquierda
      gap: '50px',
    },
  };
  
  export default projectListTheme;
  