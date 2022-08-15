import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
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





function UtilisateurForm() {

    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageErrors, setMessageErrors] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [roles, setRoles] = useState([]);
    const [roleId, setRoleId] = useState('');
    const [contacts, setContacts] = useState([]);
    const [contactId, setContactId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    // On récupère les roles et les contacts qui n'ont pas de compte utilisateur

    useEffect(async () => {

        const allRoles = await getRoles();
        setRoles(allRoles.roles);

        const allContacts = await getContactsNoUser();
        setContacts(allContacts);
    }, []);

    // console.log(contacts);

    const optionsContacts = contacts?.map((option, key) => ({ id: option.id, label: (key + 1) + " - " + option.nom })) ?? [];
    const optionsRoles = roles.map(option => ({ id: option.id, label: option.nom }));


    const handleSubmit = async (e) => {

        e.preventDefault();
        setAlertError(false);
        setAlertSuccess(false);

        const result = await addUtilisateur({ contact_id: contactId, role_id: roleId });

        if (result?.status === 200) {

            setMessageSuccess(result.message);
            setAlertSuccess(true);

            // Réactualisation de la liste des contacts
            var newContacts = contacts.filter(contact => contact.id != contactId);

            setContacts(newContacts);

            console.log(newContacts);

        } else {

            let errors = validatorErrors(result.erreurs);

            console.log(result);
            setAlertError(true);
            setMessageErrors(errors);

        }

    };





    return (

        <Card mb={6}>
            <CardContent>

                {alertSuccess && (
                    <Alert severity="success" onClose={() => setAlertSuccess(false)} my={3}>
                        <Typography variant="h6" component="h6" > {messageSuccess}  </Typography>
                    </Alert>
                )}

                {alertError && (
                    <Alert severity="warning" onClose={() => setAlertError(false)} my={3}>
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
                                    renderInput={(params) => <TextField required {...params} label="Contact" />}
                                    name="contact"
                                    fullWidth

                                    onChange={(e, value) => {
                                        setContactId(value.id)
                                        console.log(contactId);
                                    }}

                                    variant="outlined"
                                    my={2}
                                />
                            </Grid>
                            {/* contacts.map((option) => option.nom+" "+ option.prenom) */}

                            <Grid item md={6}>
                                <Autocomplete

                                    options={optionsRoles}
                                    renderInput={(params) => <TextField required {...params} label="Rôle" />}
                                    name="role"

                                    fullWidth

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
                <Link component={NavLink} to="/utilisateurs/actifs">
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
