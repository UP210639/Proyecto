const taskTableTheme = {
    tableContainer: {
      margin: '32px', // Margen alrededor de la tabla
      background: 'linear-gradient(to bottom, #FADE40, white)', // Fondo degradado de amarillo (#FADE40) a blanco
      padding: '16px', // Añadimos un padding para que la tabla no quede pegada al borde
      borderRadius: '8px', // Bordes redondeados para el contenedor
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para darle un poco de profundidad
    },
    createTaskButton: {
      backgroundColor: 'white', // Color inicial blanco
      color: 'black',
      '&:hover': {
        backgroundColor: '#FADE40', // Cambia a amarillo (#FADE40) al pasar el mouse
        transform: 'scale(1.05)', // Efecto de crecimiento
      },
      '&:disabled': {
        backgroundColor: '#cccccc',
        color: '#666666',
      },
      transition: 'all 0.3s ease-in-out', // Suaviza el cambio
    },
    editIconButton: {
      color: 'grey', // Color inicial gris
      '&:hover': {
        color: '#4caf50', // Cambia a verde al pasar el mouse
        transform: 'scale(1.05)', // Efecto de crecimiento
      },
      transition: 'all 0.3s ease-in-out', // Suaviza el cambio
    },
    deleteIconButton: {
      color: 'grey', // Color inicial gris
      '&:hover': {
        color: '#f44336', // Cambia a rojo al pasar el mouse
        transform: 'scale(1.05)', // Efecto de crecimiento
      },
      transition: 'all 0.3s ease-in-out', // Suaviza el cambio
    },
    boxContainer: {
      display: 'flex',
      gap: '1rem',
      padding: '16px',
    },
    tooltip: {
      fontSize: '0.875rem',
    },
    modal: {
      backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
    dialogTitle: {
      fontFamily: 'Georgia, serif',
      fontSize: '1.5rem',
      color: '#333',
    },
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
  };
  
  export default taskTableTheme;
  