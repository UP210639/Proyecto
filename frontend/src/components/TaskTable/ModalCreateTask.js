import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { TextField, MenuItem } from '@mui/material';

// Estilos personalizados para el modal
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

// Tema de estilos para los botones
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

const ModalCreateTask = ({ open, handleClose, users, handleCreate }) => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        dateAdd: '',
        userId: '',
        status: '',
        projectId: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        values.dateAdd = new Date().toISOString();
        handleCreate(values);
        setValues({
            name: '',
            description: '',
            dateAdd: '',
            userId: '',
            status: '',
            projectId: ''
        });
        handleClose();
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
                    Crear Tarea
                </Typography>
                <Box
                    id="modal-modal-description"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: "20px",
                        mt: 2,
                    }}
                >
                    <TextField
                        id="task_name"
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        label="Nombre de la tarea"
                        variant="standard"
                        sx={{ width: "100%" }}
                    />
                    <TextField
                        id="task_description"
                        name='description'
                        value={values.description}
                        onChange={handleChange}
                        label="Descripción"
                        variant="standard"
                        multiline
                        sx={{ width: "100%" }}
                    />
                    <TextField
                        id="task_user"
                        name='userId'
                        value={values.userId}
                        onChange={handleChange}
                        select
                        label="Responsable"
                        variant="standard"
                        sx={{ width: "100%" }}
                    >
                        {users?.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.firstName} {user.lastName}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box sx={{ display: "flex", gap: "20px" }}>
                        <Button
                            variant='contained'
                            sx={{ ...buttonStyles.createButton, mt: 2 }}
                            onClick={handleSubmit}
                        >
                            Crear
                        </Button>
                        <Button
                            variant='contained'
                            sx={{ ...buttonStyles.cancelButton, mt: 2 }}
                            onClick={() => {
                                handleClose();
                                setValues({
                                    name: '',
                                    description: '',
                                    dateAdd: '',
                                    userId: '',
                                    status: '',
                                    projectId: ''
                                });
                            }}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalCreateTask;
