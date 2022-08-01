import React, { useEffect, useState }  from "react";
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
PersonAddAlt
}from '@mui/icons-material';
import { Link } from "react-router-dom";
import { getContacts } from "../../services/contacts/Index";
import { decrypt, encrypt } from "../../utils/crypt";



const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const columns = [
//   { field: "id", headerName: "ID", width: 150 },
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
    editable: true,
  },
  {
    field: "adresse",
    headerName: "Adresse",
    width: 200,
    // editable: true,
  },
  {
    field: "contact",
    headerName: "Contact",
    width: 250,
  },
  {
    field: "Actions",
    renderCell:  (cellValues) => {
    
      return (
          <>
            <Link to={`/contact/modifier/${encrypt(cellValues.id)}`}>  
                <IconButton  color="success" title="modifier"
                  onClick={(event) => {
                    handleClick(event, cellValues);
                  }} >
                  <EditIcon />
                </IconButton>
            </Link>
            
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




function DataGridContact(contacts) {
        
        
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
                rows={contacts.contacts}
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

    const [contacts, setContacts] = useState([]);

    useEffect( async () => {
    
        const listContacts = await getContacts();
        setContacts(listContacts);
        
    }, []);
    
    
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

        <DataGridContact contacts={contacts}/>
    </React.Fragment>
  );
}

export default Contacts;
