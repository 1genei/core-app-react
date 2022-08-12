import React, { useState } from "react";
import styled from "@emotion/styled";
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { getContact, updateContact } from "../../services/ContactsServices";
import {
  Alert as MuiAlert,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
  Skeleton
} from "@mui/material";
import { spacing } from "@mui/system";
import { validatorErrors } from "../../utils/errors";
import { useEffect } from "react";
import { decrypt } from "../../utils/crypt";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Card = styled(MuiCard)(spacing);
const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);



function ContactForm({ contactTab, errorStatus}) {

    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageErrors, setMessageErrors] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [contact, setContact] = useState(contactTab);
    const error = errorStatus;
  
    
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setIsSubmitting(true);
        
        setAlertError(false); 
        setAlertSuccess(false);
        
    
        const result =  await updateContact(contact, contact.id);
        
        
        if(result?.status === 200 ){
            
            setIsSubmitting(false);            
            setMessageSuccess(result.message);
            setAlertSuccess(true);
            
        }else{
        
          setIsSubmitting(false);          
          let errors = validatorErrors(result.errors);
          setAlertError(true);                
          setMessageErrors(errors);
 
        }
   

        
    };
    
    // console.log(contact.contact.nom);

    function handleChange (e){

        const {name, value} = e.target;
        setContact({...contact, [name]:value});
        

    }

  return (
        <>
            {error
            ?
                <Card mb={6}>
                    <CardContent>
                        <Typography variant='h1' color='error'>
                            Erreur !
                        </Typography>
                        <Typography variant='h3'>
                            Impossible de trouver l'organisme
                        </Typography>
                    </CardContent>
                </Card>
            :
                <Card mb={6}>
                    <CardContent>
                
                    {alertSuccess && (
                    <Alert severity="success" onClose={() => setAlertSuccess(false) } my={3}>
                            <Typography variant="h6" component="h6" > {messageSuccess}  </Typography> 
                    </Alert>
                    )}
                
                {alertError && (
                        <Alert severity="warning" onClose={() => setAlertError(false) } my={3}>
                            {messageErrors}
                        </Alert>
                    )}
                    
            
                    {isSubmitting ? (
                    <Box display="flex" justifyContent="center" my={6}>
                        <CircularProgress />
                    </Box>
                    ) : (
                        <form onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                <TextField
                                name="prenom"
                                label="Prénom"
                                value={contact?.prenom ?? ''}
                                fullWidth
                                onChange={handleChange}
                                required
                                variant="outlined"
                                my={2}
                                />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                <TextField
                                name="nom"
                                label="Nom"
                                value={contact?.nom ?? ''}
                                fullWidth
                                required
                                onChange={handleChange}
                                variant="outlined"
                                my={2}
                                />
                        </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                <TextField
                                name="email"
                                label="Email"
                                value={contact?.email ?? ''}
                                fullWidth
                                required
                                onChange={handleChange}
                                type="email"
                                variant="outlined"
                                my={2}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                <TextField
                                name="date_naissance"
                                value={contact?.date_naissance ?? ''}
                                fullWidth
                                type='date'
                                onChange={handleChange}
                                variant="outlined"
                                my={2}
                                helperText="Date de naissance"
                                />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                            <TextField
                            name="telephone1"
                            label="Téléphone mobile"
                            value={contact?.telephone1 ?? ''}
                            fullWidth
                            
                            onChange={handleChange}
                            variant="outlined"
                            my={2}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                            <TextField
                            name="telephone2"
                            label="Téléphone fixe"
                            value={contact?.telephone2 ?? ''}
                            fullWidth
                            
                            onChange={handleChange}
                            variant="outlined"
                            my={2}
                            />
                        </Grid>
                        </Grid>
                        
                        <Grid container>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                <TextField
                                name="adresse"
                                label="Adresse"
                                value={contact?.adresse ?? ''}
                                fullWidth
                                onChange={handleChange}
                                variant="outlined"
                                my={2}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                <TextField
                                    name="complement_adresse"
                                    label="Complément d'adresse"
                                    value={contact?.complement_adresse ?? ''}
                                    fullWidth
                                    onChange={handleChange}
                                    variant="outlined"
                                    my={2}
                                    />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} p={2}>
                                <TextField
                                    name="notes"
                                    label="Notes"
                                    value={contact?.notes ?? ''}
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    maxRows={8}
                                    onChange={handleChange}
                                    variant="outlined"
                                    my={2}
                                />
                            </Grid>
                        </Grid>

                        <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        mt={3}
                        size="large"
                        >
                        Modifier
                        </Button>
                    </form>
                    )}
                </CardContent>
                </Card>
            }
        </>
    );
}

function Waiting() {
    return (
        <Card mb={6}>
            <CardContent>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius:3 }}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius:3 }}/>
                    </Grid>
                </Grid>

                <Grid container pb={1}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius:3 }}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius:3 }}/>
                    </Grid>
                </Grid>

                <Grid container pt={1}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius:3 }}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius:3 }}/>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius:3 }}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius:3 }}/>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={130} sx={{ borderRadius:3 }} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}


function EditContact() {
    const [contact, setContact] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const params = useParams();
  
  
    useEffect( async () => {
    
        try {
            let id = params.id;      
            id = decrypt(id);
            const cont = await getContact(id);
            setContact(cont);
          } catch (err) {
            setError(true);
            console.log(err);
          }
          setLoading(false);
        
    }, [])
 
  return (
    <React.Fragment>
      <Helmet title="Contacts" />
      <Typography variant="h3" gutterBottom display="inline">
        Modifier le contact
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/contacts/actifs">
          Contacts
        </Link>
        <Typography>Modifier</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      {loading ? <Waiting /> : <ContactForm contactTab={contact} errorStatus={error}/>}
    </React.Fragment>
  );
}

export default EditContact;
