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
  Fab,
  Breadcrumbs
} from "@mui/material";


import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@mui/system";

import {
Unarchive as UnArchiveIcon,

PersonAddAlt
}from '@mui/icons-material';
import { Link, NavLink } from "react-router-dom";
import { archiveUser, getArchivedUsers, unArchiveUser } from "../../services/UtilisateursServices";


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
    const listUtilisateurs = await getArchivedUsers();
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
                
                <IconButton  color="primary" title="Archiver"
                  onClick={(event) => {
                    handleArchive(event, cellValues);
                  }} >
                  <UnArchiveIcon />
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
      title: 'Voulez-vous retirer cet utilisateur des archives ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      reverseButtons: true
    }).then((result) => {
    
      
      if (result.isConfirmed) {
        
          unArchiveUser(cellValues.id).then( (res) => {            
     
            if(res.status === 200){
              console.log(utilisateurs);
             var newUtilisateurs = utilisateurs.filter( utilisateur => utilisateur.id != cellValues.id );
             setUtilisateurs(newUtilisateurs);
             
            swalWithBootstrapButtons.fire(
              'Restoré!',
              'Utilisateur restoré!',
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
                    Utilisateurs archivés
                </Typography>
                
                <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                    <Link component={NavLink} to="/utilisateurs/actifs">
                      Utilisateurs actifs
                    </Link>
                    
                </Breadcrumbs>
            </Grid>
         
            
        </Grid>
               

        <Divider my={6} />
        <DataGridUtilisateur utilisateurs={utilisateurs} columns={columns} />
    </React.Fragment>
  );
}

export default Utilisateurs;
