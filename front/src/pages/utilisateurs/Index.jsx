import React, { useEffect, useState } from "react";
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
import { getUtilisateurs } from "../../services/UtilisateursServices";


const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

function getFullName(params) {
  return `${params.row.contact.prenom || ''} ${params.row.contact.nom || ''}`;
}

function getRoleName(params) {
  return `${params.row.role.nom}`;
}

const columns = [
//   { field: "id", headerName: "ID", width: 150 },
  {
    field: "contact",
    headerName: "Contact",
    width: 200,
    editable: false,
    valueGetter : getFullName
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: false,
  },
  {
    field: "role",
    headerName: "Rôle",
    width: 200,
    editable: false,
    valueGetter : getRoleName
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

function handleClick(event, cellValues){
    console.log(cellValues);
}




function DataGridUtilisateur(utilisateurs) {
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
            rows={utilisateurs?.utilisateurs}
            columns={columns}
            pageSize={30}
            checkboxSelection
          />
        </div>
      </Paper>
    </Card>
  );
}

function Utilisateurs() {

  const [utilisateurs, setUtilisateurs] = useState([]);

  useEffect( async () => {
    const listUtilisateurs = await getUtilisateurs();
    setUtilisateurs(listUtilisateurs);
  }, []);
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
        <DataGridUtilisateur utilisateurs={utilisateurs} />
    </React.Fragment>
  );
}

export default Utilisateurs;
