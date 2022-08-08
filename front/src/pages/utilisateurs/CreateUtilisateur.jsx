import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import { Helmet } from "react-helmet-async";

import { addUtilisateur, getRoles } from "../../services/UtilisateursServices";
import { validatorErrors } from "../../utils/errors";
import { getContactsNoUser } from "../../services/ContactsServices";

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
    const [roles, setRoles] = useState([]);
    const [roleId, setRoleId] = useState('');
    const [contacts, setContacts] = useState([]);
    const [contactId, setContactId] = useState('');
    
    
    // On récupère les roles et les contacts qui n'ont pas de compte utilisateur
    
    useEffect( async ()=> {
      
      const allRoles = await getRoles();
      setRoles(allRoles.roles);
      
      const allContacts = await getContactsNoUser();
      setContacts(allContacts);
    }, []);
    

    const optionsContacts = contacts?.map(option => ({ id: option.id, label: option.nom + ' ' + option.prenom})) ?? [];
    const optionsRoles = roles.map(option => ({ id: option.id, label: option.nom}));

    const handleSubmit = async (values,{ resetForm, setErrors, setStatus, setSubmitting }) => {
        
        // try {
            setAlertError(false); 
            setAlertSuccess(false);

            const user = {
              role_id: roleId,
              contact_id: contactId
            }

            const result =  await addUtilisateur(user);

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
        //handleChange,
        //handleSubmit,
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
                      options={optionsContacts}
                      onChange={(event, newValue) => {
                        setContactId(newValue?.id);
                        console.log(contactId)
                      }}
                      renderInput={(params) => <TextField {...params} label="Contact" />}
                      name="contact"

                      error={Boolean(touched.role && errors.role).toString()}
                      fullWidth
                      helpertext={touched.contact && errors.contact}
                      onBlur={handleBlur}
                      // onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  {/* contacts.map((option) => option.nom+" "+ option.prenom) */}
                  
                  <Grid item md={6}>
                      <Autocomplete
                  
                        options={optionsRoles}
                        // options={roles.map((option) => option.nom)}
                        //getOptionLabel={(option) => option.nom}
                        
                        renderInput={(params) => <TextField {...params} label="Rôle" />}
                        name="role"
                        
                    
                        error={Boolean(touched.role && errors.role).toString()}
                        fullWidth
                        helpertext={touched.role && errors.role}
                        onBlur={handleBlur}
                        onChange={(e, value) => setRoleId(value?.id)}
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
