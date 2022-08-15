import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useSelector } from 'react-redux';
import { parseDateTime } from "../../utils/datetime";
import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams, useNavigate } from "react-router-dom";
import { getContact } from "../../services/ContactsServices";
import Auth from "../../layouts/Auth";
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
    TextField as MuiTextField,
    Typography as MuiTypography,
    Skeleton,
    Fab,
    Stack
} from "@mui/material";
import { encrypt, decrypt } from "../../utils/crypt";
import { spacing } from "@mui/system";
import {
    Edit as EditIcon,
    LocationOn as LocationIcon,
    TextSnippet as NotesIcon,
    PhoneAndroid as MobileIcon,
    Phone as FixeIcon,
    CalendarToday as CalendarIcon,
    Email as EmailIcon,
    Person as PersonIcon,
    Inventory as InventoryIcon,
    AddCircle as AddIcon,
    AccountBox as AccountIcon
} from '@mui/icons-material';


const Divider = styled(MuiDivider)(spacing);
const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);


function InfoContact() {

    const [contact, setContact] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const params = useParams();
    const user = useSelector((state) => state.auth);


    useEffect(async () => {

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
        <>
            <Helmet title='Informations du contact' />
            <Grid container alignItems='center' justifyContent='flex-start' spacing={5}>
                <Grid item >
                    <Typography variant="h5" gutterBottom display="inline">
                        Informations du contact
                    </Typography>
                </Grid>
                {!loading && !error && user.permissions.includes('Edit-Contact') &&
                    <Grid item >
                        <Link to={`/contact/modifier/${encrypt(contact.id)}`}>
                            <Fab size="small" color="primary" aria-label="add">
                                <EditIcon />
                            </Fab>
                        </Link>
                    </Grid>}
            </Grid>
            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} to="/contacts/actifs">
                    Contacts
                </Link>
                <Typography>Informations</Typography>
            </Breadcrumbs>
            <Divider my={6} />
            {loading
                ? <Skeleton />
                : error
                    ? <>
                        <Card mb={6}>
                            <CardContent>
                                <Typography variant='h1' color='error'>
                                    Erreur !
                                </Typography>
                                <Typography variant='h5'>
                                    Impossible de trouver le contact
                                </Typography>
                            </CardContent>
                        </Card>
                    </>
                    : <>
                        <Box p={7} sx={{ maxWidth: 1000, margin: '0 auto', backgroundColor: 'background.paper', borderRadius: 10 }}>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <PersonIcon color="primary" />
                                        <Typography variant='h4' sx={{ textDecoration: 'underline', textDecorationColor: 'primary.main', fontWeight: 800 }}>Nom</Typography>
                                    </Stack>
                                    {contact?.nom
                                        ? <Typography noWrap>{contact.nom}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <PersonIcon color="primary" />
                                        <Typography variant='h4' sx={{ textDecoration: 'underline', textDecorationColor: 'primary.main', fontWeight: 800 }}>Prénom</Typography>
                                    </Stack>
                                    {contact?.prenom
                                        ? <Typography noWrap>{contact.prenom}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <CalendarIcon color="primary" />
                                        <Typography variant='h4' sx={{ textDecoration: 'underline', textDecorationColor: 'primary.main', fontWeight: 800 }}>Date de naissance</Typography>
                                    </Stack>
                                    {contact?.date_naissance
                                        ? <Typography noWrap>{parseDateTime(contact?.date_naissance)}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseignée</Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <EmailIcon color="primary" />
                                        <Typography variant='h4' sx={{ textDecoration: 'underline', textDecorationColor: 'primary.main', fontWeight: 800 }}>Email</Typography>
                                    </Stack>
                                    {contact?.email
                                        ? <Typography noWrap>{contact?.email}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <LocationIcon color="primary" />
                                        <Typography variant='h4' sx={{ textDecoration: 'underline', textDecorationColor: 'primary.main', fontWeight: 800 }}>Adresse</Typography>
                                    </Stack>
                                    {contact?.adresse
                                        ? <Typography noWrap>{contact?.adresse}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseignée</Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <LocationIcon color="primary" />
                                        <Typography variant='h4' sx={{ textDecoration: 'underline', textDecorationColor: 'primary.main', fontWeight: 800 }}>Complément d'adresse</Typography>
                                    </Stack>
                                    {contact?.complement_adresse
                                        ? <Typography noWrap>{contact?.complement_adresse}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <MobileIcon color="primary" />
                                        <Typography variant='h4' sx={{ textDecoration: 'underline', textDecorationColor: 'primary.main', fontWeight: 800 }}>Téléphone portable</Typography>
                                    </Stack>
                                    {contact?.telephone1
                                        ? <Typography noWrap>{contact?.telephone1}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <FixeIcon color="primary" />
                                        <Typography variant='h4' sx={{ textDecoration: 'underline', textDecorationColor: 'primary.main', fontWeight: 800 }}>Téléphone fixe</Typography>
                                    </Stack>
                                    {contact?.telephone2
                                        ? <Typography noWrap>{contact?.telephone2}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <InventoryIcon color="primary" />
                                        <Typography variant='h4' sx={{ textDecoration: 'underline', textDecorationColor: 'primary.main', fontWeight: 800 }}>Archive</Typography>
                                    </Stack>
                                    <Typography>{contact?.archive === 0 ? 'Non' : 'Oui'}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <AddIcon color="primary" />
                                        <Typography variant='h4' sx={{ textDecoration: 'underline', textDecorationColor: 'primary.main', fontWeight: 800 }}>Date de création</Typography>
                                    </Stack>
                                    {contact?.created_at
                                        ? <Typography noWrap>{parseDateTime(contact?.created_at)}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseignée</Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <AccountIcon color="primary" />
                                        <Typography variant='h4' sx={{ textDecoration: 'underline', textDecorationColor: 'primary.main', fontWeight: 800 }}>Utilisateur</Typography>
                                    </Stack>
                                    <Typography>{contact.user === null ? 'Non' : 'Oui'}</Typography>
                                </Grid>
                                {contact.user !== null &&
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                        <Grid container direction='column'>
                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                                <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                                    <InventoryIcon color="primary" />
                                                    <Typography variant='h4' sx={{ textDecoration: 'underline', textDecorationColor: 'primary.main', fontWeight: 800 }}>Archive</Typography>
                                                </Stack>
                                                <Typography>{contact?.user?.archive === 0 ? 'Non' : 'Oui'}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                                <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                                    <AddIcon color="primary" />
                                                    <Typography variant='h4' sx={{ textDecoration: 'underline', textDecorationColor: 'primary.main', fontWeight: 800 }}>Date de création</Typography>
                                                </Stack>
                                                {contact?.created_at
                                                    ? <Typography noWrap>{parseDateTime(contact?.user?.created_at)}</Typography>
                                                    : <Typography sx={{ color: 'text.secondary' }}>Non renseignée</Typography>
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                }
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <NotesIcon color="primary" />
                                        <Typography variant='h4' sx={{ textDecoration: 'underline', textDecorationColor: 'primary.main', fontWeight: 800 }}>Notes</Typography>
                                    </Stack>
                                    {contact?.notes
                                        ? <Typography noWrap>{contact?.notes}</Typography>
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

export default InfoContact;
