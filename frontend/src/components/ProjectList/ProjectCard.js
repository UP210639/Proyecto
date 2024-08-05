import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { GoPencil } from "react-icons/go";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import ModalEditProject from './ModalEditProject';
import projectCardTheme from './EstilosProjectCard'; // Importa el tema personalizado

const ProjectCard = ({ data, deleteProject, openModal, handleCloseModal, handleOpenModal, users, project, getProject, handleEditProject }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <React.Fragment>
      {data?.map((project) => (
        <Card variant="outlined" key={project.id}
          sx={projectCardTheme.card} // Aplica estilos personalizados al card
        >
          <Link to={"/tasks/" + project.id} style={{ textDecoration: "none", color: "black" }}>
            <CardContent sx={projectCardTheme.cardContent}> {/* Aplica estilos personalizados al contenido del card */}
              <Typography sx={projectCardTheme.cardTitle}>
                {project.name}
              </Typography>
              <Typography sx={projectCardTheme.cardDescription}>
                {project.description}
              </Typography>
            </CardContent>
          </Link>
          {user.isAdmin &&
            <CardActions sx={projectCardTheme.cardActions}> {/* Aplica estilos personalizados a las acciones del card */}
              <IconButton
                size="medium"
                sx={projectCardTheme.editIconButton} // Aplica estilos personalizados al botón de edición
                onClick={() => {
                  getProject(project.id);
                  handleOpenModal()
                }}
              >
                <GoPencil />
              </IconButton>
              <IconButton
                size="medium"
                sx={projectCardTheme.deleteIconButton} // Aplica estilos personalizados al botón de eliminación
                onClick={() => deleteProject(project.id, project.name)}
              >
                <FaRegTrashCan />
              </IconButton>
            </CardActions>
          }
        </Card>
      ))}

      <ModalEditProject
        open={openModal}
        handleClose={handleCloseModal}
        users={users}
        project={project}
        handleEditProject={handleEditProject}
      />
    </React.Fragment>
  );
}

export default ProjectCard;
