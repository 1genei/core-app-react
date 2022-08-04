import React, { useState } from "react";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { NavLink, useParams } from "react-router-dom";
import { Formik } from "formik";
import { Helmet } from "react-helmet-async";

import { getUtilisateur } from "../../services/UtilisateursServices";
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
import { useEffect } from "react";
import { decrypt } from "../../utils/crypt";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Card = styled(MuiCard)(spacing);
const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);



var initialValues = {
  prenom: "",
  nom: "",
  email: "",
};


const validationSchema = Yup.object().shape({
  prenom: Yup.string().required("Obligatoire"),
  nom: Yup.string().required("Obligatoire"),
  email: Yup.string().email().required("Obligatoire"),
});




function UtilisateurForm() {

    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageErrors, setMessageErrors] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    
    const [utilisateur, setUtilisateur] = useState([]);
  
    const params = useParams();
  
  
    useEffect( async () => {
      
      var id = params.id;
      
      id = decrypt(id);
      
      var cont = await getUtilisateur(id);
      setUtilisateur(cont);
    
    }, [])
  
    
    const handleSubmit = async (values,{ resetForm, setErrors, setStatus, setSubmitting }) => {
        
        // try {
            setAlertError(false); 
            setAlertSuccess(false);
            
        
            const result = {};
            
            
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
    
    // console.log(utilisateur.utilisateur.nom);

function handleChange (e){

    const {name, value} = e.target;
    setUtilisateur({...utilisateur, [name]:value});
    

}

  return (
  
    <>
    
    <Formik
     
     initialValues={utilisateur}
    //  validationSchema={validationSchema}
     onSubmit={handleSubmit}
   >
     {({
       errors,
       handleBlur,
      //  handleChange,
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
                      value={utilisateur.prenom ?? ''}
                      error={Boolean(touched.prenom && errors.prenom)}
                      fullWidth
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
                      value={utilisateur.nom ?? ''}
                      error={Boolean(touched.nom && errors.nom)}
                      fullWidth
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
                  value={utilisateur.email ?? ''}
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
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
                      value={utilisateur.telephone1 ?? ''}
                      error={Boolean(touched.telephone1 && errors.telephone1)}
                      fullWidth
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
                      value={utilisateur.telephone2 ?? ''}
                      error={Boolean(touched.telephone2 && errors.telephone2)}
                      fullWidth
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
                      value={utilisateur.adresse ?? ''}
                      error={Boolean(touched.adresse && errors.adresse)}
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextareaAutosize
                      name="notes"
                      label="Notes"
                      value={utilisateur.notes ?? ''}
                      error={Boolean(touched.notes && errors.notes)}
                      fullWidth
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
      )}
    </Formik>
    
    </>
  );
}

function EditUtilisateur() {

 
  return (
    <React.Fragment>
      <Helmet title="Utilisateurs" />
      <Typography variant="h3" gutterBottom display="inline">
        Modifier le utilisateur
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/utilisateurs">
          Utilisateurs
        </Link>
        <Typography>Modifier</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <UtilisateurForm/>
    </React.Fragment>
  );
}

export default EditUtilisateur;
