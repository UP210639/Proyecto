import React, { useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable, MRT_EditActionButtons } from 'material-react-table';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';

import theme from './EstiloTask'; // Importa los estilos desde estilostask.js
const user=JSON.parse(localStorage.getItem("user"))
export default function TaskTable() {
  const PROJECT = useParams().projectID;
  const [data, setData] = useState([]);
  
  const columns = [
    {
      header: "id",
      accessorFn: (row) => row.id,
      enableEditing: false,
    },
    {
      header: "responsable",
      accessorFn: (row) => row.user.firstName,
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
      accessorFn: (row) => row.projec.name,
      enableEditing: false,
    },
  ];

  const getData = () => {
    let link  ="http://localhost:8080/project/user/"+user.id

    if(user.isAdmin){
      link="http://localhost:8080/project"
    } 


    fetch("http://localhost:8080/tasks/project/" + PROJECT, {
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
  }, [])

  const handleCreateTask = ({ values }) => {
    console.log(values)
   
    values.projectId = PROJECT;
    values.status = "pending";
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
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
    onCreatingRowSave: handleCreateTask,
    onEditingRowSave: handleEditUser,
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
        sx={theme.createTaskButton} // Aplica los estilos al botón
      >
        Create New Task
      </Button>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon sx={theme.editIcon} /> {/* Aplica los estilos al icono de edición */}
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon sx={theme.deleteIcon} /> {/* Aplica los estilos al icono de eliminación */}
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle sx={theme.dialogTitle}>Create new task</DialogTitle> {/* Aplica los estilos al título del diálogo */}
        <DialogContent sx={theme.dialogContent}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
  });

  // Crea un tema personalizado
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    typography: {
      fontFamily: 'Arial',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={theme.tableContainer}>
        <MaterialReactTable table={table} />
      </Box>
    </ThemeProvider>
  );
}
