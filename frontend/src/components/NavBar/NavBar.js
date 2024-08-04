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
import Logo from '../Img';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FaFolder } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import { LogImage2 } from '../Img';

function GetProjects(){
  const [data,setData]=useState([])
  
  
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    console.log(user)
    let link  ="http://localhost:8080/project/user/"+user.id

    if(user.isAdmin){
      link="http://localhost:8080/project"
    } 

      fetch(link,{
        method:"GET"
      })
      .then((response)=>response.json())
      .then((data)=>setData(data))
  },[])

  return {data}
}

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBar= () => {
  
  const {data} = GetProjects();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Box sx={{height:"30px"}}/>
        <ListItem key="home">
          <Link to={"/projects"} style={{textDecoration:"none", color:"black"}}>
            <ListItemButton>
              <ListItemIcon >
                <FaHome />
              </ListItemIcon>
              <ListItemText primary="Home"/>
            </ListItemButton>
          </Link>
        </ListItem>
        {data?.map((project) => (
        <ListItem key={project.id} disablePadding>
          <Link to={"/tasks/"+project.id} style={{textDecoration:"none", color:"black",padding:"5px"}}>
            <ListItemButton> 
              <ListItemIcon>
                <FaFolder />
              </ListItemIcon>
              <ListItemText primary={project.name} />
            </ListItemButton>
          </Link>
        </ListItem>
        ))}
      </List>
      </Box>
  );

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return(
    <AppBar position="static">
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          
          <Box sx={{ flexGrow: 1}}>

            <IconButton 
              onClick={toggleDrawer(true)}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>

          </Box>
          
          <IconButton edge="start" color="inherit" aria-label="logo">
            <img src={Logo} alt="logo" style={{ width: 40, height: 40 }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1
            }}
          >
            SabroPollo
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={LogImage2} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
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
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar