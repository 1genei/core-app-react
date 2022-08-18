import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useSelector } from 'react-redux';
import { parseDateTime, parseDate } from "../../utils/datetime";
import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { getContact } from "../../services/ContactsServices";
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

const TypoTitle = MuiStyled(Typography)(() => ({
    textDecoration: 'underline',
    fontWeight: 800
}));


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
                {!loading && !error && user.permissions.includes('Edit-Contact') && contact?.archive === 0 &&
                    <Grid item >
                        <Link to={`/contact/modifier/${encrypt(contact.id)}`}>
                            <Fab size="small" color="primary" aria-label="add">
                                <EditIcon />
                            </Fab>
                        </Link>
                    </Grid>}
            </Grid>
            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} to={contact?.archive === 0 ? "/contacts/actifs" : "/contacts/archives"}>
                    Contacts
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
                                        <TypoTitle variant='h4'>Nom</TypoTitle>
                                    </Stack>
                                    {contact?.nom
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{contact.nom}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <PersonIcon color="primary" />
                                        <TypoTitle variant='h4'>Prénom</TypoTitle>
                                    </Stack>
                                    {contact?.prenom
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{contact.prenom}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <CalendarIcon color="primary" />
                                        <TypoTitle variant='h4'>Date de naissance</TypoTitle>
                                    </Stack>
                                    {contact?.date_naissance
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{parseDate(contact?.date_naissance)}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseignée</Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <EmailIcon color="primary" />
                                        <TypoTitle variant='h4'>Email</TypoTitle>
                                    </Stack>
                                    {contact?.email
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{contact?.email}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <LocationIcon color="primary" />
                                        <TypoTitle variant='h4'>Adresse</TypoTitle>
                                    </Stack>
                                    {contact?.adresse
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{contact?.adresse}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseignée</Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <LocationIcon color="primary" />
                                        <TypoTitle variant='h4'>Complément d'adresse</TypoTitle>
                                    </Stack>
                                    {contact?.complement_adresse
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{contact?.complement_adresse}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <MobileIcon color="primary" />
                                        <TypoTitle variant='h4'>Téléphone portable</TypoTitle>
                                    </Stack>
                                    {contact?.telephone1
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{contact?.telephone1}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <FixeIcon color="primary" />
                                        <TypoTitle variant='h4'>Téléphone fixe</TypoTitle>
                                    </Stack>
                                    {contact?.telephone2
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{contact?.telephone2}</Typography>
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
                                    <Typography>{contact?.archive === 0 ? 'Non' : 'Oui'}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <AddIcon color="primary" />
                                        <TypoTitle variant='h4'>Date de création</TypoTitle>
                                    </Stack>
                                    {contact?.created_at
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{parseDateTime(contact?.created_at)}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseignée</Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <AccountIcon color="primary" />
                                        <TypoTitle variant='h4'>Utilisateur</TypoTitle>
                                    </Stack>
                                    <Typography>{contact.user === null ? 'Non' : 'Oui'}</Typography>
                                </Grid>
                                {contact.user !== null &&
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                        <Grid container direction='column'>
                                            <Grid item pb={1}>
                                                <Typography>{contact?.user?.archive === 0 ? 'Actif' : 'Archivé'}</Typography>
                                            </Grid>
                                            <Grid item pt={1}>
                                                {contact?.created_at
                                                    ? <Typography style={{ wordWrap: 'break-word' }}> Créé le {parseDateTime(contact?.user?.created_at)}</Typography>
                                                    : <Typography style={{ wordWrap: 'break-word' }} sx={{ color: 'text.secondary' }}>Date de création non renseignée</Typography>
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
                                        <TypoTitle variant='h4'>Notes</TypoTitle>
                                    </Stack>
                                    {contact?.notes
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{contact?.notes}</Typography>
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
