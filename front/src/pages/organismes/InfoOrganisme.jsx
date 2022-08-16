import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useSelector } from 'react-redux';
import { parseDateTime } from "../../utils/datetime";
import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { getOrganisme } from "../../services/OrganismesServices";
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
    Stack,
    Link as MuiLink
} from "@mui/material";
import { encrypt, decrypt } from "../../utils/crypt";
import { spacing } from "@mui/system";
import {
    Edit as EditIcon,
    LocationOn as LocationIcon,
    TextSnippet as NotesIcon,
    Phone as FixeIcon,
    Email as EmailIcon,
    Language as SiteIcon,
    Storefront as OrgIcon,
    Inventory as InventoryIcon,
    AddCircle as AddIcon
} from '@mui/icons-material';


const Divider = styled(MuiDivider)(spacing);
const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const TypoTitle = MuiStyled(Typography)(() => ({
    textDecoration: 'underline',
    fontWeight: 800
}));


function InfoOrganisme() {

    const [organisme, setOrganisme] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const params = useParams();
    const user = useSelector((state) => state.auth);


    useEffect(async () => {

        try {
            let id = params.id;
            id = decrypt(id);
            const org = await getOrganisme(id);
            setOrganisme(org);
        } catch (err) {
            setError(true);
            console.log(err);
        }
        setLoading(false);

    }, [])

    return (
        <>
            <Helmet title="Informations de l'organisme" />
            <Grid container alignItems='center' justifyContent='flex-start' spacing={5}>
                <Grid item >
                    <Typography variant="h5" gutterBottom display="inline">
                        Informations de l'organisme
                    </Typography>
                </Grid>
                {!loading && !error && user.permissions.includes('Edit-Organisme') &&
                    <Grid item >
                        <Link to={`/organisme/modifier/${encrypt(organisme.id)}`}>
                            <Fab size="small" color="primary" aria-label="add">
                                <EditIcon />
                            </Fab>
                        </Link>
                    </Grid>}
            </Grid>
            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} to="/organismes/actifs">
                    Organismes
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
                                    Impossible de trouver l'organisme
                                </Typography>
                            </CardContent>
                        </Card>
                    </>
                    : <>
                        <Box p={7} sx={{ maxWidth: 1000, margin: '0 auto', backgroundColor: 'background.paper', borderRadius: 10 }}>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <OrgIcon color="primary" />
                                        <TypoTitle variant='h4'>Nom</TypoTitle>
                                    </Stack>
                                    {organisme?.nom
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{organisme.nom}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <SiteIcon color="primary" />
                                        <TypoTitle variant='h4'>Site</TypoTitle>
                                    </Stack>
                                    {organisme?.site
                                        ? <Typography style={{ wordWrap: 'break-word' }}>
                                            <MuiLink href={'//' + organisme.site} target="_blank" rel="noreferrer">{organisme.site}</MuiLink>
                                        </Typography>
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
                                    {organisme?.adresse
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{organisme?.adresse}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseignée</Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <LocationIcon color="primary" />
                                        <TypoTitle variant='h4'>Complément d'adresse</TypoTitle>
                                    </Stack>
                                    {organisme?.complement_adresse
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{organisme?.complement_adresse}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <EmailIcon color="primary" />
                                        <TypoTitle variant='h4'>Email</TypoTitle>
                                    </Stack>
                                    {organisme?.email
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{organisme?.email}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <FixeIcon color="primary" />
                                        <TypoTitle variant='h4'>Téléphone</TypoTitle>
                                    </Stack>
                                    {organisme?.telephone
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{organisme?.telephone}</Typography>
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
                                    <Typography>{organisme?.archive === 0 ? 'Non' : 'Oui'}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <AddIcon color="primary" />
                                        <TypoTitle variant='h4'>Date de création</TypoTitle>
                                    </Stack>
                                    {organisme?.created_at
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{parseDateTime(organisme?.created_at)}</Typography>
                                        : <Typography sx={{ color: 'text.secondary' }}>Non renseignée</Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} p={2}>
                                    <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                        <NotesIcon color="primary" />
                                        <TypoTitle variant='h4'>Notes</TypoTitle>
                                    </Stack>
                                    {organisme?.notes
                                        ? <Typography style={{ wordWrap: 'break-word' }}>{organisme?.notes}</Typography>
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

export default InfoOrganisme;
