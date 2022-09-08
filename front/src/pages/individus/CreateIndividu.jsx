import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { addIndividu } from "../../services/IndividusServices";
import { getActiveTypeContact } from "../../services/ContactsServices";
import {
    Alert as MuiAlert,
    Autocomplete,
    Box,
    Breadcrumbs as MuiBreadcrumbs,
    Button as MuiButton,
    Card as MuiCard,
    CardContent,
    Checkbox,
    Chip,
    CircularProgress,
    Divider as MuiDivider,
    Grid,
    InputAdornment,
    InputLabel,
    Link,
    ListItemText,
    MenuItem,
    OutlinedInput,
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



function IndividuForm() {

    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageErrors, setMessageErrors] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [individu, setIndividu] = useState({});
    const [codePostal, setCodePostal] = useState('');
    const [allCodepostalVilles, setAllCodepostalVilles] = useState([]);
    const [optionsCodePostaux, setOptionsCodePostaux] = useState([]);
    const [optionsPaysIndicatifs, setOptionsPaysIndicatifs] = useState([]);
    const [pays, setPays] = useState("France");
    const [otherCountry, setOtherCountry] = useState(false);
    const [allTypes, setAllTypes] = useState([]);

    let optionsCodePostauxFilter = [];


    useEffect(() => {

        PaysIndicatifs().then(data => {
            setOptionsPaysIndicatifs(data);
        })


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




    const handleChange = (e) => {

        const { name, value } = e.target;
        setIndividu({ ...individu, [name]: value });


    }

    const handleChangeCodePostal = (e,) => {

        const { name, value } = e.target;
        setIndividu({ ...individu, [name]: value });

        setCodePostal(e.target.value);

    }

    const handleChangeVille = (e, value) => {
        setIndividu({ ...individu, ville: value?.ville });
    }

    const handleChangePays = (e) => {
        let list;
        setPays(e.target.value);
        list = optionsPaysIndicatifs.filter(option => option.pays == e.target.value);

        e.target.value != "France" ? setOtherCountry(true) : setOtherCountry(false);

        setIndividu({ ...individu, pays: e.target.value, indicatif2: list[0].indicatif, indicatif1: list[0].indicatif });

    }



    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsSubmitting(true);
        setIndividu({ ...individu, pays: e.target.pays.value, indicatif2: e.target.indicatif2.value, indicatif1: e.target.indicatif1.value });

        setAlertError(false);
        setAlertSuccess(false);


        const result = await addIndividu(individu);

        if (result?.status === 200) {

            setIsSubmitting(false);

            setMessageSuccess(result?.message);
            setAlertSuccess(true);
            setIndividu({});


        } else {

            setIsSubmitting(false);

            let errors = validatorErrors(result?.errors);

            setAlertError(true);
            setMessageErrors(errors);

        }


    };
    const [types, setTypes] = useState([]);

    const handleChangeType = (e) => {

        const { name, value } = e.target;
        setIndividu({ ...individu, [name]: value });
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
                                    value={individu?.prenom ?? ''}
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
                                    value={individu?.nom ?? ''}
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
                                    value={individu?.email ?? ''}
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
                                    value={individu?.date_naissance ?? ''}
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
                                    value={individu.pays ?? "France"}
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
                                    value={individu.indicatif1 ?? '33'}
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
                                    value={individu?.telephone1 ?? ''}
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
                                    value={individu.indicatif2 ?? '33'}
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
                                    value={individu?.telephone2 ?? ''}
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
                                    value={individu?.adresse ?? ''}
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
                                    value={individu?.complement_adresse ?? ''}
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
                                    value={individu?.code_postal ?? ''}
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
                                            value={individu.ville ?? ''}
                                            onChange={(e, value) => pays == "France" ? handleChangeVille(e, value) : handleChange}
                                            variant="outlined"
                                            my={2}
                                        />
                                        :
                                        <TextField
                                            name="ville"
                                            label="Ville"
                                            value={individu?.ville ?? ''}
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
                                            value={individu?.region ?? ''}
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
                                            value={individu?.provence ?? ''}
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
                                            value={individu?.etat ?? ''}
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
                                    value={individu?.notes ?? ''}
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

function CreateIndividu() {
    return (
        <React.Fragment>
            <Helmet title="Individus" />
            <Typography variant="h3" gutterBottom display="inline">
                Ajouter un individu
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} to="/individus">
                    Individus
                </Link>
                <Typography>Ajout</Typography>
            </Breadcrumbs>

            <Divider my={6} />
            <IndividuForm />
        </React.Fragment>
    );
}

export default CreateIndividu;
