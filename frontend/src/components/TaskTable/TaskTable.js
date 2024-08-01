import { useState, useEffect } from 'react'
import { MaterialReactTable, useMaterialReactTable, MRT_EditActionButtons } from 'material-react-table';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
} from '@mui/material';

export default function TaskTable() {

    const PROJECT = useParams().projectID;
    const [data, setData] = useState([]);
    const USER = 1;
    const columns = [
        // estas madres no tienen que aparecer :D
        {
            header: "id",
            accessorFn: (row) => row.id,
            enableEditing: false,
        },
        {
            header: "responsable",
            accessorFn: (row) => row.user,
        },
        {
            header: "name",
            accessorFn: (row) => row.name,
        },
        {
            header: "description",
            accessorFn: (row) => row.description,
        },
        {
            header: "status",
            accessorFn: (row) => row.status,
            enableEditing: false,
        },

        {
            header: "dateAdd",
            accessorFn: (row) => row.dateAdd,
            enableEditing: false,
        },
        {
            header: "project_Id",
            accessorFn: (row) => row.projectId,
            enableEditing: false,
        },

    ]
    const getData = () => {

        fetch("http://localhost:8080/tasks/project/" + PROJECT, {  //Tareas por project id :o
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
    }

    useEffect(() => {
        if (PROJECT)
            getData();
    }, [PROJECT])

    //handle values from edit modal
    const handleCreateTask = ({ values }) => {
        console.log(values)
        values.userId = USER;
        values.projectId = PROJECT;
        values.status = "pending";//deacuerdo a la base de datos, solo 3 valores posibles
        values.dateAdd = new Date().toISOString();

        fetch("http://localhost:8080/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        })
            .then(() => { getData() })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const openDeleteConfirmModal = (row) => {

        if (window.confirm('Are you sure you want to delete this task?')) {

            handleDeleteTask(row.original.id);
        }
    };

    const handleEditUser = ({ values }) => {
        console.log(values)
        fetch("http://localhost:8080/task/" + values.id, {
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
    }

    const handleDeleteTask = (taskId) => {
        fetch("http://localhost:8080/task/" + taskId, {
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

    const table = useMaterialReactTable({
        columns: columns,
        data: data,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        onCreatingRowSave: handleCreateTask,
        onEditingRowSave: handleEditUser,
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                onClick={() => {
                    table.setCreatingRow(true); //simplest way to open the create row modal with no default values
                }}
            >
                Create New Task
            </Button>
        ),
        renderRowActions: ({ row, table }) => (

            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h4" fontFamily='Georgia, serif' align=''>Create new task</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
    })
    return (
        <Box >
            <Box sx={{ m: 4 }} >
                <MaterialReactTable table={table} />
            </Box>
        </Box>
    )
}