const projectCardTheme = {
    card: {
      border: 'solid #BDB7B4', // Borde del card
      display: 'flex',
      flexDirection: 'column',
      width: '250px',
      minHeight: '250px',
      justifyContent: 'space-between',
      backgroundColor: '#f5f5f5', // Fondo gris claro
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para darle un poco de profundidad
      transition: 'transform 0.2s ease-in-out', // Suaviza el efecto de transformación
      '&:hover': {
        transform: 'scale(1.03)', // Efecto de crecimiento al pasar el mouse
      },
    },
    cardContent: {
      padding: '16px',
      '&:last-child': {
        paddingBottom: '16px',
      },
    },
    cardTitle: {
      variant: 'h5',
      component: 'div',
      textAlign: 'center',
      padding: '10px 0px 15px 0px',
      color: '#333', // Color del texto
    },
    cardDescription: {
      variant: 'body2',
      component: 'div',
      textAlign: 'left',
      color: '#666', // Color del texto
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'flex-end', // Alinea los botones a la derecha
      padding: '8px',
      borderTop: '1px solid #ddd', // Línea divisoria en la parte superior
    },
    editIconButton: {
      color: 'grey', // Color inicial gris
      '&:hover': {
        color: '#4caf50', // Cambia a verde al pasar el mouse
        transform: 'scale(1.1)', // Efecto de crecimiento
      },
      transition: 'all 0.3s ease-in-out', // Suaviza el cambio
    },
    deleteIconButton: {
      color: 'grey', // Color inicial gris
      '&:hover': {
        color: '#f44336', // Cambia a rojo al pasar el mouse
        transform: 'scale(1.1)', // Efecto de crecimiento
      },
      transition: 'all 0.3s ease-in-out', // Suaviza el cambio
    },
  };
  
  export default projectCardTheme;
  