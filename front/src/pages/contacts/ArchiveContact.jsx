import React, { useEffect, useState }  from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2'

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
import { getArchiveContacts, unArchiveContact } from "../../services/ContactsServices";



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
                rows={contacts}
                columns={columns}
                pageSize={30}
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
          field: "Actions",
          renderCell:  (cellValues) => {
          
            return (
                <>
                  
                  <IconButton  color="primary" title="archiver"
                    onClick={(event) => {
                      handleClickArchive(event, cellValues);
                    }} >
                    <UnArchiveIcon />
                  </IconButton>
                  
                 
                </>
            
              
            );
          }
        }
      ];
      
    const [contacts, setContacts] = useState([]);

    useEffect( async () => {
    
        const listContacts = await getArchiveContacts();
        setContacts(listContacts);
        
    }, []);
    
  
    // Archiver les contacts
    function handleClickArchive(event, cellValues){
 
  
      const ligne = event.currentTarget;
      
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Voulez-vous retirer des archives ?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
        reverseButtons: true
      }).then((result) => {
      
        
        if (result.isConfirmed) {
          
            unArchiveContact(cellValues.id).then( (res) => {            
       
              if(res.status === 200){
                
               var newContacts = contacts.filter( contact => contact.id != cellValues.id );
               setContacts(newContacts);
               
              swalWithBootstrapButtons.fire(
                'Retiré des archives!',
                '',
                'success'
              )
              ligne.closest('tr').remove();
                
            }
          
          })
    
        
      
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Annulé',
            '',
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
                    Contacts archivés
                </Typography>
                <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                    <Link component={NavLink} to="/contacts/actifs">
                      Contacts actifs
                    </Link>
                    
                </Breadcrumbs>
            </Grid>
            
        </Grid>

        <Divider my={6} />

        <DataGridContact contacts={contacts} columns={columns}/>
    </React.Fragment>
  );
}

export default Contacts;
