import { useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    Box,
    Button,
    IconButton,
    Tooltip,
} from '@mui/material';

import ModalCreateTask from './ModalCreateTask';
import ModalEditTask from './ModalEditTask';
import taskTableTheme from './EstilosTask'; // Importa el tema personalizado

export default function TaskTable() {
    const user = JSON.parse(localStorage.getItem("user"));

    const PROJECT = useParams().projectID;
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [project, setProject] = useState([]);
    const [task, setTask] = useState([]);

    const [openModalCreate, setOpenCreate] = useState(false);
    const handleOpenModalCreate = () => setOpenCreate(true);
    const handleCloseModalCreate = () => setOpenCreate(false);

    const [openModalEdit, setOpenEdit] = useState(false);
    const handleOpenModalEdit = () => setOpenEdit(true);
    const handleCloseModalEdit = () => setOpenEdit(false);

    let link = "http://143.198.60.20:8080/project/user/" + user.id;

    if (user.isAdmin) {
        link = "http://143.198.60.20:8080/project";
    }

    const columns = [
        {
            header: "ID",
            accessorFn: (row) => row.id,
        },
        {
            header: "Responsable",
            accessorFn: (row) => row.user.firstName,
        },
        {
            header: "Nombre",
            accessorFn: (row) => row.name,
        },
        {
            header: "Descripción",
            accessorFn: (row) => row.description,
        },
        {
            header: "Estado",
            accessorFn: (row) => row.status,
        },
        {
            header: "Fecha de creación",
            accessorFn: (row) => row.dateAdd,
        },
        {
            header: "Proyecto",
            accessorFn: (row) => row.project.name,
        },
    ];

    const getData = () => {
        let link = "http://143.198.60.20:8080/tasks/" + PROJECT + "/" + user.id;

        if (user.isAdmin) {
            link = "http://143.198.60.20:8080/tasks/project/" + PROJECT;
        }

        fetch(link, {  //Tareas por project id
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const getUsers = () => {
        fetch("http://143.198.60.20:8080/users/get", {  //Obtener usuarios
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
    };

    const getProject = () => {
        fetch("http://143.198.60.20:8080/project/" + PROJECT, {  //Obtener proyecto
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
    };

    const getTask = (id) => {
        fetch("http://143.198.60.20:8080/tasks/" + id, {  //Obtener tarea
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTask(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        if (PROJECT) getData();
        getUsers();
        getProject();
    }, [PROJECT]);

    //handle values from edit modal
    const handleCreateTask = (values) => {
        values.projectId = PROJECT;
        values.status = "pending"; //Valores posibles según base de datos
        values.dateAdd = new Date().toISOString();

        fetch("http://143.198.60.20:8080/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        })
            .then(() => { getData(); })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const openDeleteConfirmModal = (row) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            handleDeleteTask(row.original.id);
        }
    };

    const handleEditTask = (values) => {
        fetch("http://143.198.60.20:8080/tasks/" + values.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        })
            .then(() => {
                getData();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleDeleteTask = (taskId) => {
        fetch("http://143.198.60.20:8080/tasks/" + taskId, {
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
    };

    const table = useMaterialReactTable({
        columns: columns,
        data: data,
        enableEditing: true,
        getRowId: (row) => row.id,
        renderTopToolbarCustomActions: () => {
            if (user.isAdmin) {
                return (
                    <Button
                        sx={taskTableTheme.createTaskButton} // Aplica estilos personalizados
                        variant="contained"
                        onClick={handleOpenModalCreate}
                    >
                        Create New Task
                    </Button>
                );
            } else return null;
        },
        renderRowActions: ({ row }) => (
            <Box sx={taskTableTheme.boxContainer}> {/* Aplica estilos personalizados */}
                <Tooltip title="Edit" sx={taskTableTheme.tooltip}> {/* Aplica estilos personalizados */}
                    <IconButton sx={taskTableTheme.editIconButton} onClick={() => {
                        getTask(row.id);
                        handleOpenModalEdit();
                    }}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>

                {user.isAdmin ? (
                    <Tooltip title="Delete" sx={taskTableTheme.tooltip}> {/* Aplica estilos personalizados */}
                        <IconButton
                            sx={taskTableTheme.deleteIconButton}
                            onClick={() => openDeleteConfirmModal(row)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : null}
            </Box>
        ),
    });

    return (
        <Box sx={taskTableTheme.tableContainer}> {/* Aplica estilos personalizados */}
            <MaterialReactTable table={table} />

            <ModalCreateTask
                open={openModalCreate}
                handleClose={handleCloseModalCreate}
                users={users}
                handleCreate={handleCreateTask}
            />

            <ModalEditTask
                open={openModalEdit}
                handleClose={handleCloseModalEdit}
                users={users}
                task={task}
                handleEditTask={handleEditTask}
            />
        </Box>
    );
}
