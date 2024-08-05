const navBarTheme = {
    appBar: {
      backgroundColor: '#FFEB3B', // Color de fondo amarillo claro
      boxShadow: 'none', // Eliminar sombra predeterminada
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between', // Espacia los elementos en el toolbar
      alignItems: 'center', // Alineación vertical de los elementos
      minHeight: '64px', // Altura mínima del toolbar
    },
    logo: {
      width: 40,
      height: 40,
      marginRight: '10px',
    },
    menuIconButton: {
      marginLeft: '16px', // Margen izquierdo para separación
      color: 'black', // Cambiar color del icono del menú a negro
    },
    typography: {
      display: { xs: 'none', md: 'flex' },
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'black', // Cambiar texto a negro para contraste
      textDecoration: 'none',
      flexGrow: 1,
      textAlign: 'center',
    },
    drawerList: {
      width: 250,
      paddingTop: '10px',
    },
    drawer: {
      borderRight: '2px solid #FFF9C4', // Borde amarillo claro
    },
    drawerLink: {
      textDecoration: 'none',
      color: 'black',
      padding: '5px',
    },
    drawerIcon: {
      minWidth: '40px',
    },
    avatar: {
      width: 40,
      height: 40,
    },
    menu: {
      mt: '45px',
    },
    menuItem: {
      textAlign: 'center',
    },
  };
  
  export default navBarTheme;
  