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

const ProjectCard = ({ data, deleteProject, openModal, handleCloseModal, handleOpenModal, users, project, getProject, handleEditProject}) => {

    return (
        <React.Fragment>
            {data?.map((project) => (
                <Card variant="outlined" key={project.id}
                    sx={{
                        border: 'solid #BDB7B4',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '250px',
                        minHeight: '250px',
                        justifyContent: 'space-between'
                    }}>
                    <Link to={"/tasks/"+project.id} style={{ textDecoration: "none", color: "black" }}>
                        <CardContent>
                            <Typography variant="h5" component="div" align='center' padding='10px 0px 15px 0px'>
                                {project.name}
                            </Typography>
                            <Typography variant="h7" component="div" align='left'>
                                {project.description}
                            </Typography>
                        </CardContent>
                    </Link>
                    <CardActions >
                        <IconButton size="medium" onClick={()=>{
                                getProject(project.id);
                                handleOpenModal()}
                                }>
                            <GoPencil />
                        </IconButton>
                        <IconButton size="medium" onClick={() => deleteProject(project.id, project.name)}>
                            <FaRegTrashCan />
                        </IconButton>
                    </CardActions>
                </Card>
            ))}

            <ModalEditProject 
                open={openModal} 
                handleClose={handleCloseModal} 
                users={users} 
                project={project}
                handleEditProject={handleEditProject}
                />

        </ React.Fragment>
    );
}

export default ProjectCard;

