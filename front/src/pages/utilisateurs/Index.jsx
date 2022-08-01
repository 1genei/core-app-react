import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
  Grid,
  IconButton,
  Fab
} from "@mui/material";


import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@mui/system";

import {
Archive as ArchiveIcon,
Edit as EditIcon,
Add as AddIcon,
PersonAddAlt
}from '@mui/icons-material';
import { Link } from "react-router-dom";


const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const columns = [
//   { field: "id", headerName: "ID", width: 150 },
  {
    field: "nom",
    headerName: "Nom",
    // width: 200,
    editable: false,
  },
  {
    field: "email",
    headerName: "Email",
    // width: 200,
    editable: true,
  },
  {
    field: "adresse",
    headerName: "Adresse",
    width: 150,
    // editable: true,
  },
  {
    field: "contact",
    headerName: "Contact",
    width: 250,
  },
  {
    field: "Actions",
    renderCell: (cellValues) => {
      return (
          <>
            <IconButton  color="success" title="modifier"
              onClick={(event) => {
                handleClick(event, cellValues);
              }} >
              <EditIcon />
            </IconButton>
            
            <IconButton  color="warning" title="archiver"
              onClick={(event) => {
                handleClick(event, cellValues);
              }} >
              <ArchiveIcon />
            </IconButton>
            
           
          </>
      
        
      );
    }
  }
];

const rows = [
  { id: 1, nom: "Snow", email: "Jon", age: 35 },
  { id: 2, nom: "Lannister", email: "Cersei", age: 42 },
  { id: 3, nom: "Lannister", email: "Jaime", age: 45 },
  { id: 4, nom: "Stark", email: "Arya", age: 16 },
  { id: 5, nom: "Targaryen", email: "Daenerys", age: null },
  { id: 6, nom: "Melisandre", email: null, age: 150 },
  { id: 7, nom: "Clifford", email: "Ferrara", age: 44 },
  { id: 8, nom: "Frances", email: "Rossini", age: 36 },
  { id: 9, nom: "Roxie", email: "Harvey", age: 65 },
];

function handleClick(event, cellValues){
    console.log(cellValues);
}




function DataGridDemo() {
  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Typography variant="h6" gutterBottom>
          Liste
        </Typography>
       
      </CardContent>
      <Paper>
        <div style={{ height: 800, width: "100%" }}>
          <DataGrid
            rowsPerPageOptions={[5, 10, 25]}
            rows={rows}
            columns={columns}
            pageSize={30}
            // checkboxSelection
          />
        </div>
      </Paper>
    </Card>
  );
}

function Utilisateurs() {
  return (
    <React.Fragment>
        <Helmet title="Utilisateurs" />
        
        <Grid container spacing={5}>
            <Grid item >
                <Typography variant="h3" gutterBottom display="inline">
                    Utilisateurs 
                </Typography>
            </Grid>
            <Grid item >
                <Link to="/utilisateur/ajouter">
                    <Fab  size="small" color="primary" aria-label="add">
                        <PersonAddAlt /> 
                    </Fab>
                </Link>
            </Grid>
        </Grid>
        
        
        
        

        <Divider my={6} />

        <DataGridDemo />
    </React.Fragment>
  );
}

export default Utilisateurs;
