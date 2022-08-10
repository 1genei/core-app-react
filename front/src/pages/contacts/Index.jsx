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
PersonAddAlt
}from '@mui/icons-material';
import { Link } from "react-router-dom";
import { archiveContact, getActiveContacts } from "../../services/ContactsServices";
import { encrypt } from "../../utils/crypt";



const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

function getIfUser(params) {
  return params?.row?.user === null ? 'Non' : 'Oui';
}


function handleClick(event, cellValues){
    console.log(cellValues);
}


function DataGridContact({contacts, columns}) {
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
                rows={contacts}
                columns={columns}
                checkboxSelection
              />
            </div>
          </Paper>
        </Card>
      );
}

function Contacts() {
    
    const columns = [
      //   { field: "id", headerName: "ID", width: 150 },
        {
          field: "prenom",
          headerName: "Prénom",
          width: 200,
          editable: false,
        },
        {
          field: "nom",
          headerName: "Nom",
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
          field: "adresse",
          headerName: "Adresse",
          width: 200,
          editable: false,
        },
        {
          field: "user",
          headerName: "Utilisateur",
          width: 200,
          editable: false,
          valueGetter : getIfUser
        },
        {
          field: "Actions",
          renderCell:  (cellValues) => {
          
            return (
                <>
                  <Link to={`/contact/modifier/${encrypt(cellValues.id)}`}>  
                      <IconButton  color="success" title="modifier">
                        <EditIcon />
                      </IconButton>
                  </Link>
                  
                  <IconButton  color="warning" title="archiver"
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
                field: "Prénom",
                width: 200,
                renderCell:  () => {
                    return (
                        <Skeleton animation='wave' variant='text' width={170} />
                    );
                }
            },
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
                field: "Email",
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
                field: "User",
                width: 200,
                renderCell:  () => {
                    return (
                        <Skeleton animation='wave' variant='text' width={75} />
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
      
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( async () => {
    
        try {
            const listContacts = await getActiveContacts();
            setContacts(listContacts);
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
        title: 'Voulez-vous archiver ?',
        text: "Vous retrouverez le contact dans les archives!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
        reverseButtons: true
      }).then((result) => {
      
        
        if (result.isConfirmed) {
          
            archiveContact(cellValues.id).then( (res) => {            
       
              if(res.status === 200){
                
               var newContacts = contacts.filter( contact => contact.id != cellValues.id );
               setContacts(newContacts);
               
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
        <Helmet title="Contacts" />
        
        <Grid container spacing={5}>
            <Grid item >
                <Typography variant="h3" gutterBottom display="inline">
                    Contacts 
                </Typography>
            </Grid>
            <Grid item >
                <Link to="/contact/ajouter">
                    <Fab  size="small" color="primary" aria-label="add">
                        <PersonAddAlt /> 
                    </Fab>
                </Link>
            </Grid>
        </Grid>

        <Divider my={6} />

        {loading ? <DataGridContact columns={loadingC} contacts={[{id:1}, {id:2}, {id:3}]}/> : <DataGridContact contacts={contacts} columns={columns}/>}
    </React.Fragment>
  );
}

export default Contacts;
