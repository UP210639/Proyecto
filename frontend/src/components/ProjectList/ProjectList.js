import * as React from 'react';
import { Box, Button } from '@mui/material';
import ProjectCard from './ProjectCard';
import Typography from '@mui/material/Typography';
import ModalCreateProject from './ModalCreateProject';
import { useState, useEffect } from 'react';

const ProjectList = () => {

  const user=JSON.parse(localStorage.getItem("user"))

  const [data, setData] = useState([]);
  const [project,setProject] =useState([]);
  const [users, setUsers] = useState([]);

  const [openModalCreate, setOpenCreate] = React.useState(false);
  const handleOpenModalCreate = () => setOpenCreate(true);
  const handleCloseModalCreate = () => setOpenCreate(false);

  const [openModalEdit, setOpenEdit] = React.useState(false);
  const handleOpenModalEdit = () => setOpenEdit(true);
  const handleCloseModalEdit = () => setOpenEdit(false);


   

  const getData = () => {
    
    let link  ="http://localhost:8080/project/user/"+user.id

    if(user.isAdmin){
      link="http://localhost:8080/project"
    } 


    fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res =>  {
        console.log(res)
        return res.json()
      }) 
      .then(data => {
        console.log(data)
        setData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const getProject = (id) => {
    fetch("http://localhost:8080/project/"+id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(data => {
      setProject(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const getUsers = () => {
    fetch("http://localhost:8080/users/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(data => {
      setUsers(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const openDeleteConfirmModal = (project_id, project_name) => {
    if (window.confirm('¿Estas seguro de eliminar el proyecto ' + project_name + ' ? ')) {
      handleDeleteProject(project_id);
    }
  };

  function handleDeleteProject(projectId) {
    fetch("http://localhost:8080/project/" + projectId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        getData();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleCreateProject =(values)=>{
    fetch("http://localhost:8080/project", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",  
        },
        body:JSON.stringify(values)
    })
    .then( (data)=>{
      console.log(data);
      getData()
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

const handleEditProject =(values)=>{
  fetch("http://localhost:8080/project/"+values.id, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body:JSON.stringify(values)
  })
  .then( ()=>{
      getData()})
  .catch(error => {
      console.error('Error:', error);
  });
}

  useEffect(() => {
    getData();
    getUsers();
  }, [])

  return (
    <React.Fragment>

      <Box sx={{ width: '100%' }}>
        <Typography
          variant="h4"
          noWrap
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            margin: '50px',
            flexGrow: '1',
            gap: '50px'
          }}
        >
          Proyectos
          {user.isAdmin ?
            <Button variant='contained' onClick={handleOpenModalCreate}>
              Crear proyecto
            </Button>:
          null
          }
         
        </Typography>

      </Box>
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        margin: '50px',
        gap: '50px'
      }}>
        <ProjectCard 
          data={data} 
          deleteProject={openDeleteConfirmModal} 
          handleOpenModal={handleOpenModalEdit}
          openModal={openModalEdit} 
          handleCloseModal={handleCloseModalEdit} 
          users={users}
          getProject={getProject}
          project={project}
          handleEditProject={handleEditProject}
        />
      </Box>

      <ModalCreateProject 
        open={openModalCreate} 
        handleClose={handleCloseModalCreate} 
        users={users} 
        handleCreate={handleCreateProject}
      />

    </React.Fragment>
  );
}

export default ProjectList;