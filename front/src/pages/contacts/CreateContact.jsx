import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { addContact } from "../../services/ContactsServices";
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
    InputAdornment,
    Link,
    MenuItem,
    Select,
    TextField as MuiTextField,
    Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { validatorErrors } from "../../utils/errors";
import CodepostalVille from "../../utils/codepostalVille";
import PaysIndicatifs from "../../utils/paysIndicatifs";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Card = styled(MuiCard)(spacing);
const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);



function ContactForm() {

    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageErrors, setMessageErrors] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [contact, setContact] = useState({});
    const [codePostal, setCodePostal] = useState('');
    const [allCodepostalVilles, setAllCodepostalVilles] = useState([]);
    const [optionsCodePostaux, setOptionsCodePostaux] = useState([]);
    const [optionsPaysIndicatifs, setOptionsPaysIndicatifs] = useState([]);
    const [pays, setPays] = useState("France");
    const [otherCountry, setOtherCountry] = useState(false);


    let optionsCodePostauxFilter = [];


    useEffect(() => {

        PaysIndicatifs().then(data => {
            setOptionsPaysIndicatifs(data);
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




    const handleChange = (e) => {

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



    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsSubmitting(true);
        setContact({ ...contact, pays: e.target.pays.value, indicatif2: e.target.indicatif2.value, indicatif1: e.target.indicatif1.value });

        setAlertError(false);
        setAlertSuccess(false);


        const result = await addContact(contact);

        if (result?.status === 200) {

            setIsSubmitting(false);

            setMessageSuccess(result?.message);
            setAlertSuccess(true);
            setContact({});


        } else {

            setIsSubmitting(false);

            let errors = validatorErrors(result?.errors);

            setAlertError(true);
            setMessageErrors(errors);

        }


    };



    return (

        <Card mb={4}>
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
                                    label="Age"
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
                            color="primary"
                            mt={3}
                            size="large"
                        >
                            Ajouter
                        </Button>
                    </form>
                )}
            </CardContent>
        </Card >

    );
}

function CreateContact() {
    return (
        <React.Fragment>
            <Helmet title="Contacts" />
            <Typography variant="h3" gutterBottom display="inline">
                Ajouter un contact
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} to="/contacts/actifs">
                    Contacts
                </Link>
                <Typography>Ajout</Typography>
            </Breadcrumbs>

            <Divider my={6} />
            <ContactForm />
        </React.Fragment>
    );
}

export default CreateContact;
