import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useSelector } from 'react-redux';
import { parseDateTime } from "../../utils/datetime";
import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { getUtilisateur } from "../../services/UtilisateursServices";
import { styled as MuiStyled } from '@mui/material/styles';
import {
    Box,
    Breadcrumbs as MuiBreadcrumbs,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Grid,
    Typography as MuiTypography,
    Skeleton,
    Fab,
    Stack
} from "@mui/material";
import { encrypt, decrypt } from "../../utils/crypt";
import { spacing } from "@mui/system";
import {
    Edit as EditIcon,
    Shield as ShieldIcon,
    TextSnippet as NotesIcon,
    Email as EmailIcon,
    Person as PersonIcon,
    Inventory as InventoryIcon,
    AddCircle as AddIcon,
} from '@mui/icons-material';


const Divider = styled(MuiDivider)(spacing);
const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const TypoTitle = MuiStyled(Typography)(() => ({
    textDecoration: 'underline',
    fontWeight: 800
}));


function InfoUtilisateur() {

    const [utilisateur, setUtilisateur] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const params = useParams();
    const user = useSelector((state) => state.auth);


    useEffect(async () => {

        try {
            let id = params.id;
            id = decrypt(id);
            const us = await getUtilisateur(id);
            setUtilisateur(us);
        } catch (err) {
            setError(true);
            console.log(err);
        }
        setLoading(false);

    }, [])

    return (
        <>
            <Helmet title="Informations de l'utilisateur" />
            <Grid container alignItems='center' justifyContent='flex-start' spacing={5}>
                <Grid item >
                    <Typography variant="h5" gutterBottom display="inline">
                        Informations de l'utilisateur
                    </Typography>
                </Grid>
                {!loading && !error && user.permissions.includes('Edit-User') &&
                    <Grid item >
                        <Link to={`/utilisateur/modifier/${encrypt(utilisateur.id)}`}>
                            <Fab size="small" color="primary" aria-label="add">
                                <EditIcon />
                            </Fab>
                        </Link>
                    </Grid>}
            </Grid>
            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} to="/utilisateurs/actifs">
                    Utilisateurs
                </Link>
                <Typography>Informations</Typography>
            </Breadcrumbs>
            <Divider my={6} />
            {loading
                ? <>
                    <Box p={7} sx={{ maxWidth: 1000, margin: '0 auto', backgroundColor: 'background.paper', borderRadius: 10 }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Skeleton animation='wave' variant='text' height={80} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Skeleton animation='wave' variant='text' height={80} />
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Skeleton animation='wave' variant='text' height={80} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Skeleton animation='wave' variant='text' height={80} />
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Skeleton animation='wave' variant='text' height={80} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Skeleton animation='wave' variant='text' height={80} />
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Skeleton animation='wave' variant='text' height={80} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Skeleton animation='wave' variant='text' height={80} />
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Skeleton animation='wave' variant='text' height={120} />
                            </Grid>
                        </Grid>
                    </Box>
                </>
                : error
                    ? <>
                        <Card mb={6}>
                            <CardContent>
                                <Typography variant='h1' color='error'>
                                    Erreur !
                                </Typography>
                                <Typography variant='h5'>
                                    Impossible de trouver l'utilisateur
                                </Typography>
                            </CardContent>
                        </Card>
                    </>
                    : <>
                        <Box p={7} sx={{ maxWidth: 1000, margin: '0 auto', backgroundColor: 'background.paper', borderRadius: 10 }}>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <EmailIcon color="primary" />
                                        <TypoTitle variant='h4'>Email</TypoTitle>
                                    </Stack>
                                    {utilisateur?.email
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{utilisateur.email}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <ShieldIcon color="primary" />
                                        <TypoTitle variant='h4'>Rôle</TypoTitle>
                                    </Stack>
                                    {utilisateur?.role?.nom
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{utilisateur.role.nom}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <InventoryIcon color="primary" />
                                        <TypoTitle variant='h4'>Archive</TypoTitle>
                                    </Stack>
                                    <Typography>{utilisateur?.archive === 0 ? 'Non' : 'Oui'}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <AddIcon color="primary" />
                                        <TypoTitle variant='h4'>Date de création</TypoTitle>
                                    </Stack>
                                    {utilisateur?.created_at
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{parseDateTime(utilisateur?.created_at)}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseignée</Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <PersonIcon color="primary" />
                                        <TypoTitle variant='h4'>Contact</TypoTitle>
                                    </Stack>
                                    <Typography>{utilisateur?.contact?.nom + ' ' + utilisateur?.contact?.prenom}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Grid container direction='column'>
                                        <Grid item pb={1}>
                                            <Typography>{utilisateur?.contact?.archive === 0 ? 'Actif' : 'Archivé'}</Typography>
                                        </Grid>
                                        <Grid item pt={1}>
                                            {utilisateur?.created_at
                                                ? <Typography style={{ wordWrap: 'break-word' }}> Créé le {parseDateTime(utilisateur?.contact?.created_at)}</Typography>
                                                : <Typography style={{ wordWrap: 'break-word' }} sx={{ color: 'text.secondary' }}>Date de création non renseignée</Typography>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <NotesIcon color="primary" />
                                        <TypoTitle variant='h4'>Notes</TypoTitle>
                                    </Stack>
                                    {utilisateur?.notes
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{utilisateur?.notes}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Pas de notes</Typography>
                                    }
                                </Grid>
                            </Grid>
                        </Box>
                    </>
            }
        </>
    );
}

export default InfoUtilisateur;
