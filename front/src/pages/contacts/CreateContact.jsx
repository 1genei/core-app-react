import React, { useState } from "react";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import { Helmet } from "react-helmet-async";

import { addContact } from "../../services/contacts/Index";
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




function ContactForm() {

    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageErrors, setMessageErrors] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);

    const handleSubmit = async (values,{ resetForm, setErrors, setStatus, setSubmitting }) => {
        
        // try {
            setAlertError(false); 
            setAlertSuccess(false);
            
        
            const result =  await addContact(values);
            
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
                    <TextField
                      name="prenom"
                      label="Prénom"
                      value={values.prenom}
                      error={Boolean(touched.prenom && errors.prenom)}
                      fullWidth
                      helperText={touched.prenom && errors.prenom}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="nom"
                      label="Nom"
                      value={values.nom}
                      error={Boolean(touched.nom && errors.nom)}
                      fullWidth
                      helperText={touched.nom && errors.nom}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                </Grid>

                <TextField
                  name="email"
                  label="Email"
                  value={values.email}
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  variant="outlined"
                  my={2}
                />

                <Grid container spacing={6}>
                  <Grid item md={6}>
                    <TextField
                      name="telephone1"
                      label="Téléphone mobile"
                      value={values.telephone1}
                      error={Boolean(touched.telephone1 && errors.telephone1)}
                      fullWidth
                      helperText={touched.telephone1 && errors.telephone1}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="telephone2"
                      label="Téléphone fixe"
                      value={values.telephone2}
                      error={Boolean(touched.telephone2 && errors.telephone2)}
                      fullWidth
                      helperText={touched.telephone2 && errors.telephone2}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                </Grid>
                
                <Grid container spacing={6}>
                  <Grid item md={6}>
                    <TextField
                      name="adresse"
                      label="Adresse"
                      value={values.adresse}
                      error={Boolean(touched.adresse && errors.adresse)}
                      fullWidth
                      helperText={touched.adresse && errors.adresse}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextareaAutosize
                      name="note"
                      label="Note"
                      value={values.note}
                      error={Boolean(touched.note && errors.note)}
                      fullWidth
                      helperText={touched.note && errors.note}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                      minRows={8}
                      placeholder="Notes"

                      style={{ width: '100%' }}
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

function CreateContact() {
  return (
    <React.Fragment>
      <Helmet title="Contacts" />
      <Typography variant="h3" gutterBottom display="inline">
        Ajouter un contact
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/contacts">
          Contacts
        </Link>
        <Typography>Ajout</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <ContactForm />
    </React.Fragment>
  );
}

export default CreateContact;
