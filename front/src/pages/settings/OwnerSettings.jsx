import styled from "@emotion/styled";
import { useSelector } from 'react-redux';
import { parseDate } from "../../utils/datetime";
import React, { useState, useEffect } from "react";
import { getInfos, updateInfos } from "../../services/OwnerServices";
import { styled as MuiStyled } from '@mui/material/styles';
import {
    Box,
    Divider as MuiDivider,
    Grid,
    Typography as MuiTypography,
    Skeleton,
    Stack,
    IconButton,
    Button,
    TextField,
    Alert
} from "@mui/material";
import { spacing } from "@mui/system";
import {
    Edit as EditIcon,
    Pin as PinIcon,
    LocationOn as LocationIcon,
    Email as EmailIcon,
    Abc as AbcIcon,
    Phone as PhoneIcon,
    CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { validatorErrors } from "../../utils/errors";


const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const TypoTitle = MuiStyled(Typography)(() => ({
    fontWeight: 900
}));


function OwnerSettings() {

    const [owner, setOwner] = useState([]);
    const [draft, setDraft] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageErrors, setMessageErrors] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const user = useSelector((state) => state.auth);

    function handleChange(e) {
        const { name, value } = e.target;
        setDraft({ ...draft, [name]: value });
    }

    async function submitChanges(e) {
        e.preventDefault();
        setSubmitting(true);
        setAlertError(false);
        setAlertSuccess(false);
        const result = await updateInfos(draft);
        if (result?.status === 200) {
            setSubmitting(false);
            setOwner(draft);
            setEditMode(false);
            setMessageSuccess(result.message);
            setAlertSuccess(true);
        } else {
            setSubmitting(false);
            let errors = validatorErrors(result.errors);
            setAlertError(true);
            setMessageErrors(errors);
        }
    }

    const cancelChanges = () => {
        setAlertError(false);
        setAlertSuccess(false);
        setDraft(owner);
        setEditMode(false);
    }

    useEffect(async () => {
        try {
            const resAPI = await getInfos();
            setOwner(resAPI);
            setDraft(resAPI);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }, [])

    return (
        <>
            <Grid container alignItems='center' justifyContent='flex-start' spacing={3} pt={5}>
                <Grid item >
                    <Typography variant="h5" gutterBottom display="inline">
                        Informations de la société
                    </Typography>
                </Grid>
                {!loading && !editMode && user.permissions.includes('Edit-Owner') &&
                    <Grid item >
                        <IconButton variant='contained' size='large' onClick={() => setEditMode(true)} sx={{ color: 'common.white', backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.main', color: 'common.white' } }}>
                            <EditIcon />
                        </IconButton>
                    </Grid>}
            </Grid>
            <Divider pb={2} />
            {loading
                ? <Box pt={2}>
                    <Grid container direction='column'>
                        <Grid item>
                            <Skeleton animation='wave' variant='text' width={350} height={90} />
                        </Grid>
                        <Grid item>
                            <Skeleton animation='wave' variant='text' width={350} height={90} />
                        </Grid>
                        <Grid item>
                            <Skeleton animation='wave' variant='text' width={350} height={90} />
                        </Grid>
                        <Grid item>
                            <Skeleton animation='wave' variant='text' width={350} height={90} />
                        </Grid>
                        <Grid item>
                            <Skeleton animation='wave' variant='text' width={350} height={90} />
                        </Grid>
                        <Grid item>
                            <Skeleton animation='wave' variant='text' width={350} height={90} />
                        </Grid>
                        <Grid item>
                            <Skeleton animation='wave' variant='text' width={350} height={90} />
                        </Grid>
                    </Grid>
                </Box>

                : <Box pt={2}>
                    {alertSuccess && (<Alert severity="success" onClose={() => setAlertSuccess(false)} my={3}>
                        <Typography variant="h6" component="h6" > {messageSuccess}  </Typography>
                    </Alert>)}

                    {alertError && (<Alert severity="warning" onClose={() => setAlertError(false)} my={3}>
                        {messageErrors}
                    </Alert>)}
                    <Grid container direction='column'>
                        <Grid item p={2}>
                            <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                <AbcIcon color="primary" fontSize='large' />
                                <TypoTitle variant='h4'>Nom {editMode && '*'}</TypoTitle>
                            </Stack>
                            {editMode && user.permissions.includes('Edit-Owner')
                                ? <TextField name='nom' onChange={(e) => handleChange(e)} value={draft.nom} sx={{ width: 350 }}></TextField>
                                : owner?.nom
                                    ? <Typography variant='subtitle1' style={{ wordWrap: 'break-word' }}>{owner.nom}</Typography>
                                    : <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                            }
                        </Grid>
                        <Grid item p={2}>
                            <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                <EmailIcon color="primary" fontSize='large' />
                                <TypoTitle variant='h4'>Email {editMode && '*'}</TypoTitle>
                            </Stack>
                            {editMode && user.permissions.includes('Edit-Owner')
                                ? <TextField name='email' type='email' onChange={(e) => handleChange(e)} value={draft.email} sx={{ width: 350 }}></TextField>
                                : owner?.email
                                    ? <Typography variant='subtitle1' style={{ wordWrap: 'break-word' }}>{owner?.email}</Typography>
                                    : <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                            }
                        </Grid>
                        <Grid item p={2}>
                            <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                <PhoneIcon color="primary" fontSize='large' />
                                <TypoTitle variant='h4'>Téléphone {editMode && '*'}</TypoTitle>
                            </Stack>
                            {editMode && user.permissions.includes('Edit-Owner')
                                ? <TextField name='telephone' onChange={(e) => handleChange(e)} value={draft.telephone} sx={{ width: 350 }}></TextField>
                                : owner?.telephone
                                    ? <Typography variant='subtitle1' style={{ wordWrap: 'break-word' }}>{owner?.telephone}</Typography>
                                    : <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                            }
                        </Grid>
                        <Grid item p={2}>
                            <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                <LocationIcon color="primary" fontSize='large' />
                                <TypoTitle variant='h4'>Adresse {editMode && '*'}</TypoTitle>
                            </Stack>
                            {editMode && user.permissions.includes('Edit-Owner')
                                ? <TextField name='adresse' onChange={(e) => handleChange(e)} value={draft.adresse} sx={{ width: 350 }}></TextField>
                                : owner?.adresse
                                    ? <Typography variant='subtitle1' style={{ wordWrap: 'break-word' }}>{owner?.adresse}</Typography>
                                    : <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>Non renseignée</Typography>
                            }
                        </Grid>
                        <Grid item p={2}>
                            <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                <LocationIcon color="primary" fontSize='large' />
                                <TypoTitle variant='h4'>Complément d'adresse</TypoTitle>
                            </Stack>
                            {editMode && user.permissions.includes('Edit-Owner')
                                ? <TextField name='complement_adresse' onChange={(e) => handleChange(e)} value={draft.complement_adresse} sx={{ width: 350 }}></TextField>
                                : owner?.complement_adresse
                                    ? <Typography variant='subtitle1' style={{ wordWrap: 'break-word' }}>{owner?.complement_adresse}</Typography>
                                    : <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                            }
                        </Grid>
                        <Grid item p={2}>
                            <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                <PinIcon color="primary" fontSize='large' />
                                <TypoTitle variant='h4'>Siret {editMode && '*'}</TypoTitle>
                            </Stack>
                            {editMode && user.permissions.includes('Edit-Owner')
                                ? <TextField name='siret' onChange={(e) => handleChange(e)} value={draft.siret} sx={{ width: 350 }}></TextField>
                                : owner?.siret
                                    ? <Typography variant='subtitle1' style={{ wordWrap: 'break-word' }}>{owner.siret}</Typography>
                                    : <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>Non renseigné</Typography>
                            }
                        </Grid>
                        <Grid item p={2}>
                            <Stack direction='row' alignItems='center' spacing={2} pb={4}>
                                <CalendarIcon color="primary" fontSize='large' />
                                <TypoTitle variant='h4'>Date de création</TypoTitle>
                            </Stack>
                            {editMode && user.permissions.includes('Edit-Owner')
                                ? <TextField name='created_at' type='date' onChange={(e) => handleChange(e)} value={draft.created_at} sx={{ width: 350 }}></TextField>
                                : owner?.created_at
                                    ? <Typography variant='subtitle1' style={{ wordWrap: 'break-word' }}>{parseDate(owner?.created_at)}</Typography>
                                    : <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>Non renseignée</Typography>
                            }
                        </Grid>
                        {editMode && <Grid item p={2}>
                            <Stack direction='row' spacing={2} justifyContent='flex-start' alignItems='center'>
                                <Button variant='contained' color='success' size='large' onClick={(e) => submitChanges(e)} disabled={submitting}>Modifier</Button>
                                <Button variant='contained' color='error' size='large' onClick={cancelChanges}>Annuler</Button>
                            </Stack>
                        </Grid>}
                    </Grid>
                </Box>
            }
        </>
    );
}

export default OwnerSettings;
