import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2';


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
PersonAddAlt
}from '@mui/icons-material';
import { Link } from "react-router-dom";
import { archiveUser, getActiveUsers } from "../../services/UtilisateursServices";
import { encrypt } from "../../utils/crypt";


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



function handleEdit(event, cellValues){
    console.log(cellValues);
}



function DataGridUtilisateur({utilisateurs, columns}) {
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
            rows={utilisateurs}
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
    const listUtilisateurs = await getActiveUsers();
    setUtilisateurs(listUtilisateurs);
  }, []);
  
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
              
                <Link to={`/utilisateur/modifier/${encrypt(cellValues.id)}`}>
                    <IconButton  color="success" title="Modifier" >
                      <EditIcon />
                    </IconButton>
                </Link>
                
                
                <IconButton  color="warning" title="Archiver"
                  onClick={(event) => {
                    handleArchive(event, cellValues);
                  }} >
                  <ArchiveIcon />
                </IconButton>
                
               
              </>
          
            
          );
        }
      }
    ];
  
  
  function handleArchive(event, cellValues){
  
      
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Voulez-vous archiver ?',
      text: "Vous retrouverez l'utilisateur dans les archives!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      reverseButtons: true
    }).then((result) => {
    
      
      if (result.isConfirmed) {
        
          archiveUser(cellValues.id).then( (res) => {            
     
            if(res.status === 200){
              console.log(utilisateurs);
             var newUtilisateurs = utilisateurs.filter( utilisateur => utilisateur.id != cellValues.id );
             setUtilisateurs(newUtilisateurs);
             
            swalWithBootstrapButtons.fire(
              'Archivé!',
              'Utilisateur archivé!',
              'success'
            )
            
            
          }
        
        })
  
      
    
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Annulé',
          'Archivage annulé',
          'error'
        )
      }
    })
  }

  
  
  
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
        <DataGridUtilisateur utilisateurs={utilisateurs} columns={columns} />
    </React.Fragment>
  );
}

export default Utilisateurs;
