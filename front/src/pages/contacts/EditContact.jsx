import React, { useState } from "react";
import styled from "@emotion/styled";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { getActiveTypeContact, getContact, updateContact } from "../../services/ContactsServices";
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
    Skeleton,
    InputAdornment,
    MenuItem,
    Select,
    Autocomplete,
    ListItemText,
    Checkbox,
    OutlinedInput,
    Chip,
    InputLabel
} from "@mui/material";

import { spacing } from "@mui/system";
import { validatorErrors } from "../../utils/errors";
import { useEffect } from "react";
import { decrypt } from "../../utils/crypt";
import CodepostalVille from "../../utils/codepostalVille";
import PaysIndicatifs from "../../utils/paysIndicatifs";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Card = styled(MuiCard)(spacing);
const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);



function ContactForm({ contactTab, errorStatus }) {

    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageErrors, setMessageErrors] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [codePostal, setCodePostal] = useState(contactTab.code_postal);
    const [allCodepostalVilles, setAllCodepostalVilles] = useState([]);
    const [optionsCodePostaux, setOptionsCodePostaux] = useState([]);
    const [optionsPaysIndicatifs, setOptionsPaysIndicatifs] = useState([]);
    const [pays, setPays] = useState(contactTab.pays);
    const [otherCountry, setOtherCountry] = useState(false);
    const [contact, setContact] = useState(contactTab);
    const error = errorStatus;
    const navigate = useNavigate();
    const [types, setTypes] = useState([]);
    const [allTypes, setAllTypes] = useState([]);


    let optionsCodePostauxFilter = [];


    useEffect(() => {

        PaysIndicatifs().then(data => {
            setOptionsPaysIndicatifs(data);
        })
        console.log(contact.typecontacts);
        setTypes(['client1', 'hab']);

        getActiveTypeContact().then(data => {

            if (data.status == 200) {
                setAllTypes(data.typeContacts);

            }
        })


    }, []);


    useEffect(() => {

        if (pays == "France") {
            CodepostalVille().then(data => {

                setAllCodepostalVilles(data);
                optionsCodePostauxFilter = allCodepostalVilles.filter(option => option.fields.code_postal == codePostal);
                let options = optionsCodePostauxFilter.map((option, key) => { return { label: (key + 1) + "-" + option?.fields?.nom_de_la_commune, code_postal: option?.fields?.code_postal, ville: option?.fields?.nom_de_la_commune } });
                setOptionsCodePostaux(options);

            });
        } else {
            setOptionsCodePostaux([]);
        }



    }, [codePostal])


    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsSubmitting(true);

        setAlertError(false);
        setAlertSuccess(false);


        const result = await updateContact(contact, contact.id);


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

    function handleChange(e) {

        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });

    }


    const handleChangeCodePostal = (e,) => {

        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });

        setCodePostal(e.target.value);

    }

    const handleChangeVille = (e, value) => {
        setContact({ ...contact, ville: value?.ville });
    }

    const handleChangePays = (e) => {
        let list;
        setPays(e.target.value);
        list = optionsPaysIndicatifs.filter(option => option.pays == e.target.value);

        e.target.value != "France" ? setOtherCountry(true) : setOtherCountry(false);

        setContact({ ...contact, pays: e.target.value, indicatif2: list[0].indicatif, indicatif1: list[0].indicatif });

    }

    const handleChangeType = (e) => {

        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
        setTypes(value);

    };
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 0;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 200,
            },
        },
    };


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
                            Impossible de trouver le contact
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
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                                        <InputLabel id="demo-multiple-checkbox-label">Type</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            name="types"
                                            multiple
                                            value={types}
                                            fullWidth
                                            onChange={handleChangeType}
                                            input={<OutlinedInput label="Tag" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {allTypes.map((data) => (
                                                <MenuItem key={data.id} value={data.type}>
                                                    <Checkbox checked={types.indexOf(data.type) > -1} />
                                                    <ListItemText primary={data.type} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} ></Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                        <TextField
                                            name="prenom"
                                            label="Prénom"
                                            value={contact?.prenom ?? ''}
                                            fullWidth
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            my={2}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                        <TextField
                                            name="nom"
                                            label="Nom"
                                            value={contact?.nom ?? ''}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                            variant="outlined"
                                            my={2}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                        <TextField
                                            name="email"
                                            label="Email"
                                            value={contact?.email ?? ''}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                            type="email"
                                            variant="outlined"
                                            my={2}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                        <TextField
                                            name="date_naissance"
                                            value={contact?.date_naissance ?? ''}
                                            fullWidth
                                            type='date'
                                            onChange={handleChange}
                                            variant="outlined"
                                            my={2}
                                            helperText="Date de naissance"
                                        />
                                    </Grid>
                                </Grid>


                                <Grid container alignItems="center">
                                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} p={2}>

                                        <Select

                                            name="pays"
                                            id="pays"
                                            value={contact.pays ?? "France"}
                                            label="Pays"
                                            onChange={handleChangePays}
                                            renderValue={(value) => ` ${value}`}
                                            fullWidth
                                        >

                                            {
                                                optionsPaysIndicatifs.map(option => <MenuItem value={option.pays}>{option.pays}</MenuItem>)
                                            }

                                        </Select>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={1} lg={1} xl={1} p={2}>
                                        <TextField
                                            name="indicatif1"
                                            label="Indicatif"
                                            value={contact.indicatif1 ?? '33'}
                                            fullWidth
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">+</InputAdornment>,
                                                inputMode: 'numeric', pattern: '[0-9]*',
                                            }}
                                            onChange={handleChange}
                                            variant="outlined"
                                            my={2}
                                        />
                                    </Grid>
                                    <Grid item xs={10} sm={10} md={3} lg={3} xl={3} p={2}>
                                        <TextField
                                            name="telephone1"
                                            label="Téléphone mobile"
                                            value={contact?.telephone1 ?? ''}
                                            fullWidth

                                            onChange={handleChange}
                                            variant="outlined"
                                            my={2}
                                        />
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={1} lg={1} xl={1} p={2}>
                                        <TextField
                                            name="indicatif2"
                                            label="Indicatif"
                                            value={contact.indicatif2 ?? '33'}
                                            fullWidth
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">+</InputAdornment>,
                                                inputMode: 'numeric', pattern: '[0-9]*',
                                            }}
                                            onChange={handleChange}
                                            variant="outlined"
                                            my={2}
                                        />
                                    </Grid>
                                    <Grid item xs={10} sm={10} md={3} lg={3} xl={3} p={2}>
                                        <TextField
                                            name="telephone2"
                                            label="Téléphone fixe"
                                            value={contact?.telephone2 ?? ''}
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
                                            value={contact?.adresse ?? ''}
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
                                            value={contact?.complement_adresse ?? ''}
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
                                            name="code_postal"
                                            label="Code postal"
                                            value={contact?.code_postal ?? ''}
                                            fullWidth
                                            onChange={handleChangeCodePostal}
                                            variant="outlined"
                                        // my={2}
                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
                                        {
                                            pays == "France" ?
                                                <Autocomplete

                                                    options={optionsCodePostaux}

                                                    renderInput={(params) => <TextField required {...params} label="Ville" />}
                                                    name="ville"
                                                    isOptionEqualToValue={(option, value) => option.id === value.id}

                                                    fullWidth
                                                    value={contact.ville ?? ''}
                                                    onChange={(e, value) => pays == "France" ? handleChangeVille(e, value) : handleChange}
                                                    variant="outlined"
                                                    my={2}
                                                />
                                                :
                                                <TextField
                                                    name="ville"
                                                    label="Ville"
                                                    value={contact?.ville ?? ''}
                                                    fullWidth
                                                    onChange={handleChange}
                                                    variant="outlined"

                                                />
                                        }

                                    </Grid>


                                </Grid>

                                {
                                    otherCountry == true ?

                                        <Grid container alignItems="center">
                                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} p={2}>

                                                <TextField
                                                    name="region"
                                                    label="Région"
                                                    value={contact?.region ?? ''}
                                                    fullWidth

                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    my={2}
                                                />
                                            </Grid>

                                            <Grid item xs={10} sm={10} md={4} lg={4} xl={4} p={2}>
                                                <TextField
                                                    name="provence"
                                                    label="Provence"
                                                    value={contact?.provence ?? ''}
                                                    fullWidth

                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    my={2}
                                                />
                                            </Grid>

                                            <Grid item xs={10} sm={10} md={4} lg={4} xl={4} p={2}>
                                                <TextField
                                                    name="etat"
                                                    label="Etat"
                                                    value={contact?.etat ?? ''}
                                                    fullWidth

                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    my={2}
                                                />
                                            </Grid>
                                        </Grid>
                                        :

                                        ""
                                }
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} p={2}>
                                        <TextField
                                            name="notes"
                                            label="Notes"
                                            value={contact?.notes ?? ''}
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

                <Grid container pb={1}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius: 3 }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={3}>
                        <Skeleton animation='wave' variant='rounded' height={60} sx={{ borderRadius: 3 }} />
                    </Grid>
                </Grid>

                <Grid container pt={1}>
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


function EditContact() {
    const [contact, setContact] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const params = useParams();


    useEffect(async () => {

        try {
            let id = params.id;
            id = decrypt(id);
            const res = await getContact(id);
            setContact(res.contact);
        } catch (err) {
            setError(true);
            console.log(err);
        }
        setLoading(false);

    }, [])

    return (
        <React.Fragment>
            <Helmet title="Contacts" />
            <Typography variant="h3" gutterBottom display="inline">
                Modifier le contact
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} to="/contacts/actifs">
                    Contacts
                </Link>
                <Typography>Modifier</Typography>
            </Breadcrumbs>

            <Divider my={6} />

            {loading ? <Waiting /> : <ContactForm contactTab={contact} errorStatus={error} />}
        </React.Fragment>
    );
}

export default EditContact;
