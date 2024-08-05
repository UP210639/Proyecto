import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { MenuItem } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const buttonStyles = {
  createButton: {
      backgroundColor: 'white', // Color inicial blanco
      color: 'black', // Color del texto negro
      '&:hover': {
          backgroundColor: '#FADE40', // Cambia a amarillo al pasar el mouse
      },
      transition: 'all 0.3s ease-in-out', // Transición suave para el cambio
  },
  cancelButton: {
      backgroundColor: '#9E9E9E', // Color inicial gris
      color: 'white', // Color del texto blanco
      '&:hover': {
          backgroundColor: '#616161', // Oscurecer el gris al pasar el mouse
      },
      transition: 'all 0.3s ease-in-out', // Transición suave para el cambio
  },
};

const ModalEditTask = ({ open, handleClose, users, task, handleEditTask }) => {
    const user=JSON.parse(localStorage.getItem("user"))
    const [values, setValues] = useState({
        id: '',
        name: '',
        description: '',
        dateAdd: '',
        userId: '',
        status: '',
        projectId: ''
    });

    useEffect(() => {
        if (task) {
            setValues({
                id: task.id || '',
                name: task.name || '',
                description: task.description || '',
                dateAdd: task.dateAdd || '',
                userId: task.userId || '',
                status: task.status || '',
                projectId: task.projectId || ''
            });
        }
    }, [task]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={style} component="form">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editar tarea
            </Typography>
      
            <Typography
              id="modal-modal-description"
              sx={{
                display: { xs: 'none', md: 'flex' },
                mt: 2,
                gap: '30px',
                flexDirection: 'column',
              }}
            >
              {user.isAdmin ? (
                <>
                  <TextField
                    id="task_name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    label="Nombre del proyecto"
                    variant="standard"
                    sx={{ width: '100%' }}
                  />
                  <TextField
                    id="task_description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    label="Descripción"
                    variant="standard"
                    multiline
                    sx={{ width: '100%' }}
                  />
                  <TextField
                    id="task_user"
                    name="userId"
                    value={values.userId}
                    onChange={handleChange}
                    select
                    label="Responsable"
                    variant="standard"
                  >
                    {users?.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </MenuItem>
                    ))}
                  </TextField>
                </>
              ) : null}
      
              <TextField
                id="task_status"
                name="status"
                value={values.status}
                onChange={handleChange}
                select
                label="Estado"
                variant="standard"
              >
                <MenuItem key={"pending"} value={"pending"}>
                  Pendiente
                </MenuItem>
                <MenuItem key={"in_progress"} value={"in_progress"}>
                  En progreso
                </MenuItem>
                <MenuItem key={"completed"} value={"completed"}>
                  Completado
                </MenuItem>
              </TextField>
      
              <Box sx={{ display: 'flex', gap: '20px' }}>
                <Button
                  variant="contained"
                  sx={{ mt: 2  , ...buttonStyles.createButton}}
                  onClick={() => {
                    if (task) {
                      handleEditTask(values);
                      handleClose();
                    }
                  }}
                >
                  Guardar
                </Button>
                <Button variant="contained" sx={{ mt: 2  , ...buttonStyles.cancelButton}} onClick={handleClose}>
                  Descartar
                </Button>
              </Box>
            </Typography>
          </Box>
        </Modal>
      );

      
}

export default ModalEditTask;