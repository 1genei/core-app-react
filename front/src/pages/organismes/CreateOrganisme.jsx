import React, { useState } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { addOrganisme } from "../../services/OrganismesServices";
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
} from "@mui/material";
import { spacing } from "@mui/system";
import { validatorErrors } from "../../utils/errors";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Card = styled(MuiCard)(spacing);
const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);




function OrganismeForm() {

    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageErrors, setMessageErrors] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [organisme, setOrganisme] = useState({});
    
    
    const handleChange = (e) => {
      
      const {name,value} = e.target;
      setOrganisme({...organisme, [name]:value});
    }
    
    
    
    const handleSubmit = async (e ) => {
        
        e.preventDefault();
        
        setIsSubmitting(true);
  
    // try {
        setAlertError(false); 
        setAlertSuccess(false);
        
    
        const result =  await addOrganisme(organisme);
        
        if(result?.status === 200 ){
            
            setIsSubmitting(false);
            
            setMessageSuccess(result?.message);
            setAlertSuccess(true);
            setOrganisme({});

            
        }else{
        
            setIsSubmitting(false);
            
            let errors = validatorErrors(result?.errors);
            
            setAlertError(true);                
            setMessageErrors(errors);
    
        } 
    };



  return (

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
                        name="nom"
                        label="Nom"
                        value={organisme?.nom ?? ''}
                        fullWidth
                        onChange={handleChange}
                        required
                        variant="outlined"
                        my={2}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                        <TextField
                        name="site"
                        label="Site"
                        value={organisme?.site ?? ''}
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
                        value={organisme?.adresse ?? ''}
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
                            value={organisme?.complement_adresse ?? ''}
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
                        name="telephone"
                        label="Téléphone"
                        value={organisme?.telephone ?? ''}
                        fullWidth
                        
                        onChange={handleChange}
                        variant="outlined"
                        my={2}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                        <TextField
                        name="email"
                        label="Email"
                        value={organisme?.email ?? ''}
                        fullWidth
                        type="email"
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
                            value={organisme?.notes ?? ''}
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
                mt={3}
                size="large"
                >
                Ajouter
                </Button>
            </form>
            )}
          </CardContent>
        </Card>
   
  );
}

function CreateOrganisme() {
  return (
    <React.Fragment>
      <Helmet title="Organismes" />
      <Typography variant="h3" gutterBottom display="inline">
        Ajouter un organisme
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/organismes/actifs">
          Organismes
        </Link>
        <Typography>Ajout</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <OrganismeForm />
    </React.Fragment>
  );
}

export default CreateOrganisme;
