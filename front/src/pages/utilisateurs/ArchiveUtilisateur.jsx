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
  Breadcrumbs,
  Skeleton,
  Stack
} from "@mui/material";


import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@mui/system";

import {
Unarchive as UnArchiveIcon,
} from '@mui/icons-material';

import { Link, NavLink } from "react-router-dom";
import { getArchivedUsers, unArchiveUser } from "../../services/UtilisateursServices";


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


function DataGridUtilisateur({utilisateurs, columns}) {
    const [pageSize, setPageSize] = React.useState(10);
     
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
                rowsPerPageOptions={[10, 25, 50, 100]}
                pageSize={pageSize}
                pagination
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rows={utilisateurs}
                columns={columns}
                checkboxSelection
              />
            </div>
          </Paper>
        </Card>
      );
}

function Utilisateurs() {

  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( async () => {
    try {
        const listUtilisateurs = await getArchivedUsers();
        setUtilisateurs(listUtilisateurs);
    } catch (e) {}
    setLoading(false)
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
                
                <IconButton  color="primary" title="Restaurer"
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

    const loadingC = [
        {
            field: "Contact",
            width: 200,
            renderCell:  () => {
                return (
                    <Stack direction='row' spacing={2}>
                        <Skeleton animation='wave' variant='text' width={65} />
                        <Skeleton animation='wave' variant='text' width={100} />
                    </Stack>
                );
            }
        },
        {
            field: "Email",
            width: 200,
            renderCell:  () => {
                return (
                    <Skeleton animation='wave' variant='text' width={170} />
                );
            }
        },
        {
            field: "Rôle",
            width: 200,
            renderCell:  () => {
                return (
                    <Skeleton animation='wave' variant='text' width={140} />
                );
            }
        },
        {
            field: "Actions",
            width: 200,
            renderCell:  () => {
                return (
                    <Skeleton animation='wave' variant='rounded' width={40} height={40} sx={{ borderRadius:3 }} />
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
      title: 'Voulez-vous restaurer cet utilisateur ?',
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
              'Restauré!',
              'Utilisateur restauré!',
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
        {loading ? <DataGridUtilisateur columns={loadingC} utilisateurs={[{id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}, {id:7}, {id:8}, {id:9}, {id:10}]}/> : <DataGridUtilisateur utilisateurs={utilisateurs} columns={columns}/>}
    </React.Fragment>
  );
}

export default Utilisateurs;
