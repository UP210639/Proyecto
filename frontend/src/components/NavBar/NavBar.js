import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FaFolder, FaHome } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Img';
import { LogImage2 } from '../Img';
import navBarTheme from './EstilosNavBar'; // Importa el tema personalizado

// Custom hook to fetch projects
function useProjects() {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userJson = localStorage.getItem("user");

        if (!userJson) {
          throw new Error("No user data found in localStorage");
        }

        let user;
        try {
          user = JSON.parse(userJson);
        } catch (error) {
          throw new Error("Invalid JSON format");
        }

        console.log("User Data:", user);

        let link = `http://143.198.60.20:8080/project/user/${user.id}`;

        if (user.isAdmin) {
          link = "http://143.198.60.20:8080/project";
        }

        const response = await fetch(link);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const fetchedData = await response.json();
        console.log("Fetched Data:", fetchedData);

        // Ensure fetchedData is an array
        if (Array.isArray(fetchedData)) {
          setData(fetchedData);
        } else {
          console.error("Expected an array but got:", fetchedData);
          setData([]);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { data, loading, error };
}

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBar = () => {
  const { data, loading, error } = useProjects();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={navBarTheme.drawerList} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Box sx={{ height: "30px" }} />
        <ListItem key="home">
          <Link to="/projects" style={navBarTheme.drawerLink}>
            <ListItemButton>
              <ListItemIcon sx={navBarTheme.drawerIcon}>
                <FaHome />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </Link>
        </ListItem>
        {/* Show loading indicator or error message if applicable */}
        {loading ? (
          <ListItem>
            <ListItemText primary="Loading projects..." />
          </ListItem>
        ) : error ? (
          <ListItem>
            <ListItemText primary={`Error: ${error}`} />
          </ListItem>
        ) : (
          data.map((project) => (
            <ListItem key={project.id} disablePadding>
              <Link
                to={`/tasks/${project.id}`}
                style={navBarTheme.drawerLink}
              >
                <ListItemButton>
                  <ListItemIcon sx={navBarTheme.drawerIcon}>
                    <FaFolder />
                  </ListItemIcon>
                  <ListItemText primary={project.name} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={navBarTheme.appBar}>
      <Container maxWidth="100%">
        <Toolbar disableGutters sx={navBarTheme.toolbar}>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              onClick={toggleDrawer(true)}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              sx={navBarTheme.menuIconButton}
            >
              <MenuIcon />
            </IconButton>

            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </Box>

          <IconButton edge="start" color="inherit" aria-label="logo">
            <img src={Logo} alt="logo" style={navBarTheme.logo} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={navBarTheme.typography}
          >
            SabroPollo
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                <Avatar alt="User Avatar" src={LogImage2} sx={navBarTheme.avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={navBarTheme.menu}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" sx={navBarTheme.menuItem}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
