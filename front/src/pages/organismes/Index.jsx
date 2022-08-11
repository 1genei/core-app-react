import React, { useEffect, useState }  from "react";
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
  Skeleton,
  Stack
} from "@mui/material";


import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@mui/system";

import {
Archive as ArchiveIcon,
Edit as EditIcon,
Add
}from '@mui/icons-material';
import { Link } from "react-router-dom";
import { archiveOrganisme, getActiveOrganismes } from "../../services/OrganismesServices";
import { encrypt } from "../../utils/crypt";



const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

function getFullAdress(params) {
    return `${params.row?.adresse || ''} ${params.row?.complement_adresse || ''}`;
}

function DataGridOrganisme({organismes, columns}) {
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
                rows={organismes}
                columns={columns}
                checkboxSelection
              />
            </div>
          </Paper>
        </Card>
      );
}

function Organismes() {
    
    const columns = [
      //   { field: "id", headerName: "ID", width: 150 },
        {
          field: "nom",
          headerName: "Nom",
          width: 200,
          editable: false,
        },
        {
            field: "adresse",
            headerName: "Adresse",
            width: 200,
            editable: false,
            valueGetter : getFullAdress
        },
        {
            field: "site",
            headerName: "Site",
            width: 200,
            editable: false,
        },
        {
          field: "email",
          headerName: "Email",
          width: 200,
          editable: false,
        },
        {
            field: "telephone",
            headerName: "Téléphone",
            width: 200,
            editable: false,
        },
        {
          field: "Actions",
          renderCell:  (cellValues) => {
          
            return (
                <>
                  <Link to={`/organisme/modifier/${encrypt(cellValues.id)}`}>  
                      <IconButton  color="success" title="Modifier">
                        <EditIcon />
                      </IconButton>
                  </Link>
                  
                  <IconButton  color="warning" title="Archiver"
                    onClick={(event) => {
                      handleClickArchive(event, cellValues);
                    }} >
                    <ArchiveIcon />
                  </IconButton>
                  
                 
                </>
            
              
            );
          }
        }
      ];

      const loadingC = [
            {
                field: "Nom",
                width: 200,
                renderCell:  () => {
                    return (
                        <Skeleton animation='wave' variant='text' width={170} />
                    );
                }
            },
            {
                field: "Adresse",
                width: 200,
                renderCell:  () => {
                    return (
                        <Skeleton animation='wave' variant='text' width={170} />
                    );
                }
            },
            {
                field: "Site",
                width: 200,
                renderCell:  () => {
                    return (
                        <Skeleton animation='wave' variant='text' width={170} />
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
                field: "Téléphone",
                width: 200,
                renderCell:  () => {
                    return (
                        <Skeleton animation='wave' variant='text' width={170} />
                    );
                }
            },
            {
                field: "Actions",
                width: 200,
                renderCell:  () => {
                    return (
                        <Stack direction='row' spacing={2}>
                            <Skeleton animation='wave' variant='rounded' width={40} height={40} sx={{ borderRadius:3 }} />
                            <Skeleton animation='wave' variant='rounded' width={40} height={40} sx={{ borderRadius:3 }} />
                        </Stack>
                    );
                }
            }
        ];
      
    const [organismes, setOrganismes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( async () => {
    
        try {
            const listOrganismes = await getActiveOrganismes();
            setOrganismes(listOrganismes);
        } catch (e) {}
        setLoading(false)
        
    }, []);
    
  
    // Archiver les contacts
    function handleClickArchive(event, cellValues){
 
  
      
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Voulez-vous archiver le contact ?',
        text: "Vous retrouverez le contact dans les archives!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
        reverseButtons: true
      }).then((result) => {
      
        
        if (result.isConfirmed) {
          
            archiveOrganisme(cellValues.id).then( (res) => {            
       
              if(res.status === 200){
                
               var newOrganismes = organismes.filter( organisme => organisme.id != cellValues.id );
               setOrganismes(newOrganismes);
               
              swalWithBootstrapButtons.fire(
                'Archivé!',
                'Contact archivé!',
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
        <Helmet title="Organismes" />
        
        <Grid container spacing={5}>
            <Grid item >
                <Typography variant="h3" gutterBottom display="inline">
                    Organismes 
                </Typography>
            </Grid>
            <Grid item >
                <Link to="/organisme/ajouter">
                    <Fab  size="small" color="primary" aria-label="add">
                        <Add /> 
                    </Fab>
                </Link>
            </Grid>
        </Grid>

        <Divider my={6} />

        {loading ? <DataGridOrganisme columns={loadingC} organismes={[{id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}, {id:7}, {id:8}, {id:9}, {id:10}]}/> : <DataGridOrganisme organismes={organismes} columns={columns}/>}
    </React.Fragment>
  );
}

export default Organismes;
