import React, { useState } from "react";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import { Helmet } from "react-helmet-async";

import { addUtilisateur } from "../../services/utilisateurs/Index";
import {
  Alert as MuiAlert,
  Autocomplete,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  Grid,
  Link,
  TextareaAutosize,
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


const initialValues = {
  prenom: "",
  nom: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  prenom: Yup.string().required("Obligatoire"),
  nom: Yup.string().required("Obligatoire"),
  email: Yup.string().email("Ce champs doit être une adresse mail").required("Obligatoire"),
});




function UtilisateurForm() {

    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageErrors, setMessageErrors] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    
    const roles = [
       'Administrateur' ,
       'Super Administrateur' ,
       'Editeur' ,
     
    ]
    
    const contacts = [
      { id: 1, nom: 'Gre', prenom: "alain" },
      { id: 2, nom: 'Stev', prenom: "marque" },
      { id: 3, nom: 'Spreph', prenom: "venant" },
      
    ]

    const handleSubmit = async (values,{ resetForm, setErrors, setStatus, setSubmitting }) => {
        
        // try {
            setAlertError(false); 
            setAlertSuccess(false);
            
        
            const result =  await addUtilisateur(values);
            
            if(result?.status === 200 ){
            
                setMessageSuccess(result.message);
                setAlertSuccess(true);
                // resetForm();
                // setStatus({ sent: true });
                setSubmitting(true);
                
            }else{
            
                var errors = validatorErrors(result.errors);
                
                setAlertError(true);                
                setMessageErrors(errors);
                setStatus({ sent: false });
                setErrors({ submit: result.message });
                setSubmitting(false);
            }
   
       
  };



  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        status,
      }) => (
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
                <Grid container spacing={6}>
                
                  <Grid item md={6}>
                    <Autocomplete
                      options={contacts.map((option) => option.nom+" "+ option.prenom)}
                      renderInput={(params) => <TextField {...params} label="Contact" />}
                      name="contact"
                      
                      error={Boolean(touched.role && errors.role)}
                      fullWidth
                      helperText={touched.contact && errors.contact}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  
                  
                  <Grid item md={6}>
                      <Autocomplete
                  
                        options={roles.map((option) => option)}
                        renderInput={(params) => <TextField {...params} label="Rôle" />}
                        name="role"
                    
                        error={Boolean(touched.role && errors.role)}
                        fullWidth
                        helperText={touched.role && errors.role}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        variant="outlined"
                        my={2}
                      />
                  </Grid>
                  
     
                
                </Grid>


                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  mt={3}
                  size="large"
                >
                  Ajouter
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}

function CreateUtilisateur() {
  return (
    <React.Fragment>
      <Helmet title="Utilisateurs" />
      <Typography variant="h3" gutterBottom display="inline">
        Ajouter un utilisateur
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/utilisateurs">
          Utilisateurs
        </Link>
        <Typography>Ajout</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <UtilisateurForm />
    </React.Fragment>
  );
}

export default CreateUtilisateur;
