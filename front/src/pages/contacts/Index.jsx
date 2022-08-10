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
import { archiveContact, getActiveContacts } from "../../services/ContactsServices";
import { encrypt } from "../../utils/crypt";



const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

function getIfUser(params) {
  return params?.row?.user === null ? 'Non' : 'Oui';
}

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
                <IconButton  color="success" title="Modifier"
                  onClick={(event) => {
                    handleClick(event, cellValues);
                  }} >
                  <EditIcon />
                </IconButton>
            </Link>
            
            <IconButton  color="warning" title="Archiver"
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
      
    const [contacts, setContacts] = useState([]);

    useEffect( async () => {
    
        const listContacts = await getActiveContacts();
        setContacts(listContacts);
        
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

        <DataGridContact contacts={contacts} columns={columns}/>
    </React.Fragment>
  );
}

export default Contacts;
