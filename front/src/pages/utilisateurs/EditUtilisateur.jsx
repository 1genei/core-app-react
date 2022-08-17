import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { getRoles, getUtilisateur, updateUtilisateur } from "../../services/UtilisateursServices";
import { validatorErrors } from "../../utils/errors";

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
    Skeleton,
} from "@mui/material";
import { spacing } from "@mui/system";
import { decrypt } from "../../utils/crypt";


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
    const [role, setRole] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    const [utilisateur, setUtilisateur] = useState({});

    const params = useParams();
    const navigate = useNavigate();

    // On récupère les roles et les contacts qui n'ont pas de compte utilisateur

    useEffect(async () => {

        let id = params.id;
        id = decrypt(id);

        const allRoles = await getRoles();
        setRoles(allRoles.roles);

        const util = await getUtilisateur(id);
        setUtilisateur(util);

        setRole(util?.role?.nom);

        setLoading(false);

    }, []);


    const optionsRoles = roles.map(option => ({ id: option.id, label: option.nom }));


    const handleSubmit = async (e) => {

        e.preventDefault();
        setAlertError(false);
        setAlertSuccess(false);

        const result = await updateUtilisateur(utilisateur?.id, roleId);

        if (result?.status === 200) {

            setMessageSuccess(result.message);
            setAlertSuccess(true);


        } else {

            let errors = validatorErrors(result.erreurs);

            setAlertError(true);
            setMessageErrors(errors);

        }

    };





    return (

        <Card mb={6}>
            <CardContent>
                {loading
                    ? <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                            <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius: 3 }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                            <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius: 3 }} />
                        </Grid>
                    </Grid>
                    : <>{alertSuccess && (
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
                                <Grid container>

                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                                        <Autocomplete
                                            options={{}}
                                            renderInput={(params) => <TextField required {...params} label="Contact" />}
                                            name="contact"
                                            fullWidth
                                            disabled
                                            value={utilisateur?.contact?.prenom + " " + utilisateur?.contact?.nom ?? ''}

                                            variant="outlined"
                                            my={2}
                                        />
                                    </Grid>
                                    {/* contacts.map((option) => option.nom+" "+ option.prenom) */}

                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                                        <Autocomplete

                                            options={optionsRoles}
                                            renderInput={(params) => <TextField required {...params} label="Rôle" />}
                                            name="role"
                                            fullWidth
                                            value={role ?? ''}
                                            onChange={(e, value) => {

                                                setRoleId(value?.id)
                                                setRole(value?.label)

                                            }}
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
                                    ml={3}
                                    size="large"
                                >
                                    Modifier
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    mt={3}
                                    size="large"
                                    onClick={() => navigate(-1)}
                                    ml={4}
                                >
                                    Annuler
                                </Button>
                            </form>
                        )}
                    </>
                }
            </CardContent>
        </Card>
    );
}

function CreateUtilisateur() {
    return (
        <React.Fragment>
            <Helmet title="Utilisateurs" />
            <Typography variant="h3" gutterBottom display="inline">
                Modifier le rôle
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} to="/utilisateurs/actifs">
                    Utilisateurs
                </Link>
                <Typography>Modification</Typography>
            </Breadcrumbs>

            <Divider my={6} />

            <UtilisateurForm />
        </React.Fragment>
    );
}

export default CreateUtilisateur;
