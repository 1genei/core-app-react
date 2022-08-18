import React, { useState } from "react";
import styled from "@emotion/styled";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { getOrganisme, updateOrganisme } from "../../services/OrganismesServices";
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



function OrganismeForm({ organismeTab, errorStatus }) {

    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageErrors, setMessageErrors] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [organisme, setOrganisme] = useState(organismeTab);
    const error = errorStatus;
    const navigate = useNavigate();



    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsSubmitting(true);

        setAlertError(false);
        setAlertSuccess(false);


        const result = await updateOrganisme(organisme, organisme.id);


        if (result?.status === 200) {

            setIsSubmitting(false);
            setMessageSuccess(result.message);
            setAlertSuccess(true);

        } else {

            setIsSubmitting(false);
            let errors = validatorErrors(result.errors);
            setAlertError(true);
            setMessageErrors(errors);

        }



    };

    // console.log(contact.contact.nom);

    function handleChange(e) {

        const { name, value } = e.target;
        setOrganisme({ ...organisme, [name]: value });
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
                        <Typography variant='subtitle1'>
                            Il se peut que l'organisme soit archivé ou n'existe pas
                        </Typography>
                    </CardContent>
                </Card>
                :
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
                                    color="success"
                                    mt={3}
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
                        <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius: 3 }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius: 3 }} />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius: 3 }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius: 3 }} />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius: 3 }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius: 3 }} />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={130} sx={{ borderRadius: 3 }} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

function EditOrganisme() {
    const [organisme, setOrganisme] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const params = useParams();


    useEffect(async () => {

        try {
            let id = params.id;
            id = decrypt(id);
            const org = await getOrganisme(id);
            setOrganisme(org);
            if (org?.archive === 1) {
                setError(true);
            }
        } catch (err) {
            setError(true);
            console.log(err);
        }
        setLoading(false);

    }, [])

    return (
        <React.Fragment>
            <Helmet title="Organismes" />
            <Typography variant="h3" gutterBottom display="inline">
                Modifier l'organisme
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} to="/organismes/actifs">
                    Organismes
                </Link>
                <Typography>Modifier</Typography>
            </Breadcrumbs>

            <Divider my={6} />

            {loading ? <Waiting /> : <OrganismeForm organismeTab={organisme} errorStatus={error} />}
        </React.Fragment>
    );
}

export default EditOrganisme;
