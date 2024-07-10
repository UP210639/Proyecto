import react, {useState,useEffect,useMemo} from 'react'
import {MaterialReactTable,useMaterialReactTable,  MRT_EditActionButtons} from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    AppBar,
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
  } from '@mui/material';
import ResponsiveAppBar from './AppBar';

export default function TaskTable(props){
    
    const [data,setData]=useState([]);
    const USER=1;
    const PROJECT = 1;
    const columns =[
        {   
            header:"id",
            accessorFn: (row) =>row.id,
            enableEditing: false,
        },
        {   
            header:"user",
            accessorFn: (row) =>row.user,
        },
        {   
            header:"name",
            accessorFn: (row) =>row.name,
        },
        {   
            header:"description",
            accessorFn: (row) =>row.description,
        },

        {   
            header:"dateAdd",
            accessorFn: (row) =>row.dateAdd,
            enableEditing: false,
        },
        {   
            header:"project_id",
            accessorFn: (row) =>row.project,
            enableEditing: false,
        },

    ]
    const getData=()=>{
        fetch("http://localhost:8080/task/get", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
               
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setData(data);
            
        })
        .catch(error => {
            console.error('Error:', error);
        });



    }
    

    useEffect(()=>{

       getData();
    },[])

    //handle values from edit modal
    const handleCreateTask =({values})=>{
        console.log(values)
        values.user=USER;
        values.project=PROJECT;
        values.dateAdd= new Date().toISOString();

        fetch("http://localhost:8080/task/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
               
            },
            body:JSON.stringify(values)
        })
        .then( ()=>{getData()})
        .catch(error => {
            console.error('Error:', error);
        });

    }

    const openDeleteConfirmModal = (row) => {

        if (window.confirm('Are you sure you want to delete this task?')) {
    
            handleDeleteTask(row.original.id);
    
        }
    
      };

    const handleEditUser =({values})=>{
        console.log(values)
        fetch("http://localhost:8080/task/update/"+values.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
               
            },
            body:JSON.stringify(values)
           
        })
        .then( ()=>{
            getData();
            alert("Editado")})
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    const handleDeleteTask=(taskId)=>{
        fetch("http://localhost:8080/task/delete/"+taskId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
               
            },
           
        })
        .then( ()=>{
            getData();
            alert("ELIMINADO")})
        .catch(error => {
            console.error('Error:', error);
        });

    }


    const table = useMaterialReactTable({
            columns:columns,
            data:data,
            createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
            editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
            enableEditing: true,
            getRowId: (row) => row.id,
            onCreatingRowSave:handleCreateTask,
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
                  <DialogTitle variant="h3">Create New Task</DialogTitle>
                  <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                  >
                    {internalEditComponents} {/* or render custom edit components here */}
                  </DialogContent>
                  <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                  </DialogActions>
          
                </>
          
              ),

    })


    return(
        
          
            <Box >
                <ResponsiveAppBar/>
                <Box sx={{m:4}} >
                    <MaterialReactTable table={table} />
                </Box>
            </Box>
        
    )
}