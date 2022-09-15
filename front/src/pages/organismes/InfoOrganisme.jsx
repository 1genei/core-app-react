import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { NavLink, useParams, useNavigate, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { parseDateTime, parseDate } from "../../utils/datetime";
import { styled as MuiStyled } from '@mui/material/styles';
import Swal from 'sweetalert2'

import { useSelector } from "react-redux";

import {
    LocationOn as LocationIcon,
    TextSnippet as NotesIcon,
    Phone as FixeIcon,
    CalendarToday as CalendarIcon,
    Email as EmailIcon,
    Home as HomeIcon,
    AccountBox as AccountIcon,
    Archive as ArchiveIcon,
    Delete as DeleteIcon,
    Add,
    Edit as EditIcon,

} from '@mui/icons-material/';

import {
    Alert,
    Autocomplete,
    Avatar as MuiAvatar,
    Box,
    Breadcrumbs as MuiBreadcrumbs,
    Button as MuiButton,
    Card as MuiCard,
    CardContent,
    Chip,
    createFilterOptions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider as MuiDivider,
    Fab,
    Grid as MuiGrid,
    IconButton,
    InputLabel,
    Link,
    MenuItem,
    Modal,
    Paper,

    Select,

    Table,

    TableBody,

    TableCell,

    tableCellClasses,

    TableContainer,

    TableHead,

    TableRow,

    TextField,

    Typography as MuiTypography,
} from "@mui/material";

import { spacing } from "@mui/system";
import { decrypt, encrypt } from "../../utils/crypt";
import { addIndividus, getOrganisme, removeIndividus } from "../../services/OrganismesServices";
import { getIndividusNoOrganisme } from "../../services/IndividusServices";
import { getPostes } from "../../services/PosteService";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Button = styled(MuiButton)(spacing);

const Card = styled(MuiCard)(spacing);


const Divider = styled(MuiDivider)(spacing);

const Grid = styled(MuiGrid)(spacing);


const Spacer = styled.div(spacing);

const Typography = styled(MuiTypography)(spacing);

const Centered = styled.div`
  text-align: center;
`;

const Avatar = styled(MuiAvatar)`
  display: inline-block;
  height: 128px;
  width: 128px;
`;

const AboutIcon = styled.span`
  display: flex;
  padding-right: ${(props) => props.theme.spacing(4)};
  color:primary;

  svg {
    width: 18px;
    height: 18px;
  }
`;






function InfoOrganisme() {


    const [open, setOpen] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageErrors, setMessageErrors] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [edit, setEdit] = useState(false);

    function Details(props) {

        const { organisme } = props;

        const param = useParams();
        const organisme_id = decrypt(param.id);

        const [individuId, setIndividuId] = useState('');
        const [postes, setPostes] = useState([]);
        const [poste, setPoste] = useState('');
        const [individu, setIndividu] = useState([]);
        const [individus, setIndividus] = useState([]);

        const handleClose = () => setOpen(false);
        const handleOpen = () => {
            setOpen(true);
            setEdit(false);
            setAlertSuccess(false);
            setAlertError(false);
        }

        useEffect(async () => {


            const res = await getPostes();
            setPostes(res.postes);
            const allIndividus = await getIndividusNoOrganisme(organisme_id);
            setIndividus(allIndividus);

        }, [open]);


        // console.log(individus);

        const optionsIndividus = individus?.map((option, key) => ({ id: option.id, label: (key + 1) + " - " + option.nom })) ?? [];
        const optionsPostes = postes?.map(option => ({ label: option.nom })) ?? [];
        // const optionsPostes = [
        //     { id: 1, label: "directeur" },
        //     { id: 2, label: "commercial" },
        //     { id: 3, label: "support technique" },
        // ]

        const navigate = useNavigate();
        const handleSubmit = async (e) => {
            e.preventDefault();

            addIndividus({ individuId, poste }, organisme_id).
                then(res => {
                    setOpen(false);
                    <Navigate to="/dashboard" replace={true} />
                    // navigate(`/organisme/info/${param.id}`);

                });


            // const result = edit ? await updateTypeContact(typeContact, typeContact?.id) : await addTypeContact(typeContact);

            // if (result?.status === 200) {

            //     setIsSubmitting(false);

            //     setMessageSuccess(result?.message);
            //     setAlertSuccess(true);
            //     setAlertError(false);
            //     setOpen(false);
            //     setTypeContact({});
            //     setLoading(true)

            // } else {

            //     setIsSubmitting(false);

            //     let errors = validatorErrors(result?.errors);

            //     setAlertError(true);
            //     setMessageErrors(errors);

            // }

        }


        const [error, setError] = useState(false);


        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            bgcolor: 'background.paper',
            border: '2px solid #fff',
            boxShadow: 24,
            borderRadius: '10px',
            pt: 2,
            px: 4,
            pb: 3,
        };
        const filter = createFilterOptions();
        const [newPoste, setNewPoste] = useState(null);
        const [openNewPoste, toggleOpenNewPoste] = useState(false);

        const handleCancelNewPoste = () => {
            setPoste('');
            toggleOpenNewPoste(false);
        };

        const [dialogValue, setDialogValue] = useState({
            newPoste: '',
        });

        const handleSubmitNewPoste = (event) => {
            event.preventDefault();
            setPoste(dialogValue.newPoste);
            toggleOpenNewPoste(false);
        };
        return (
            <>



                <Card mb={6}>
                    <CardContent>

                        <Spacer mb={4} />

                        <Centered>
                            <Avatar alt="Lucy Lavender" src="/static/img/avatars/entreprise-1.jpg" />
                            <Typography variant="body2" component="div" gutterBottom>
                                <Box fontWeight="fontWeightMedium">{organisme?.nom} {organisme?.prenom}</Box>

                            </Typography>

                            <Link to={`/organisme/modifier/${encrypt(organisme?.id)}`} component={NavLink}>
                                <Button mr={4} variant="contained" color="success" size="small"  >
                                    Modifier
                                </Button>
                            </Link>

                            <Button mr={4} variant="contained" onClick={handleOpen} color="primary" size="small"  >
                                Ajouter des individus
                            </Button>

                            <Fab onClick={handleOpen} size="small" color="primary" aria-label="add">
                                <Add />
                            </Fab>
                        </Centered>
                    </CardContent>
                </Card >
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    hideBackdrop={false}
                >
                    <Box sx={style}>

                        <Divider>
                            <Typography id="modal-modal-title" variant="h5" color="secondary" my={5} component="h5">
                                {edit ? "Modifier le poste" : "Ajouter un individu "}

                            </Typography>
                        </Divider>
                        {alertError && (
                            <Alert severity="warning" onClose={() => setAlertError(false)} my={3}>
                                {messageErrors}
                            </Alert>
                        )}
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={6}>

                                <Grid item md={6}>
                                    <Autocomplete
                                        options={optionsIndividus}
                                        renderInput={(params) => <TextField required {...params} label="Individu" />}
                                        name="individu"
                                        fullWidth

                                        onChange={(e, value) => {
                                            setIndividuId(value.id)
                                        }}

                                        variant="outlined"
                                        my={2}
                                    />
                                </Grid>
                                {/* individus.map((option) => option.nom+" "+ option.prenom) */}

                                <Grid item md={6}>
                                    <Autocomplete

                                        options={optionsPostes}
                                        value={poste ?? ''}

                                        getOptionLabel={(option) => {
                                            // e.g value selected with enter, right from the input

                                            if (typeof option === 'string') {
                                                return option;
                                            }
                                            if (option.inputValue) {
                                                return option.inputValue;
                                            }
                                            return option.label;
                                        }}
                                        filterOptions={(options, params) => {
                                            const filtered = filter(options, params);

                                            if (params.inputValue !== '') {
                                                filtered.push({
                                                    label: `Ajouter "${params.inputValue}"`,
                                                    inputValue: params.inputValue,
                                                });
                                            }
                                            return filtered;
                                        }}
                                        renderInput={(params) => <TextField required {...params} label="Poste" />}
                                        name="poste"
                                        freeSolo={true}
                                        fullWidth
                                        onChange={(event, newValue) => {
                                            if (typeof newValue === 'string') {
                                                // timeout to avoid instant validation of the dialog's form.
                                                setTimeout(() => {
                                                    setNewPoste(true);
                                                    setDialogValue({
                                                        newPoste: newValue,
                                                    });
                                                });

                                            } else if (newValue && newValue.inputValue) {
                                                toggleOpenNewPoste(true);
                                                setDialogValue({
                                                    newPoste: newValue.inputValue,

                                                });


                                            } else {
                                                setPoste(newValue?.label);
                                            }
                                        }}

                                        variant="outlined"
                                        my={2}
                                        clearOnBlur
                                    />
                                </Grid>



                                <Dialog open={openNewPoste} onClose={handleCancelNewPoste}>
                                    <form onSubmit={handleSubmitNewPoste}>
                                        <DialogTitle>Créer un nouveau poste</DialogTitle>
                                        <DialogContent>

                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="newPoste"
                                                value={dialogValue.newPoste}
                                                onChange={(event) =>
                                                    setDialogValue({
                                                        ...dialogValue,
                                                        newPoste: event.target.value,
                                                    })
                                                }
                                                label="Poste"
                                                type="text"
                                                variant="standard"
                                            />

                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleCancelNewPoste}>Annuler</Button>
                                            <Button type="submit">Ajouter</Button>
                                        </DialogActions>
                                    </form>
                                </Dialog>
                            </Grid>


                            <Button
                                type="submit"
                                variant="contained"
                                color="error"
                                mt={3}
                                mr={3}
                                size="large"
                                onClick={() => setOpen(false)}
                            >
                                Fermer
                            </Button>
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
                    </Box>
                </Modal>
            </>
        );
    }


    function About(props) {

        const { organisme } = props;
        const individu = organisme.individu;
        const [messageSuccess, setMessageSuccess] = useState('');
        const [messageErrors, setMessageErrors] = useState('');
        const [alertSuccess, setAlertSuccess] = useState(false);
        const [alertError, setAlertError] = useState(false);
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [open, setOpen] = useState(false);
        const [edit, setEdit] = useState(false);
        const [typeContacts, setTypeContacts] = useState([]);
        const [typeContact, setTypeContact] = useState({});
        const [loading, setLoading] = useState(true);


        return (
            <>

                <Card mb={6}>
                    <CardContent>
                        <Typography variant="h3" gutterBottom>
                            Infos
                        </Typography>

                        <Spacer mb={10} />
                        <Grid container direction="row" alignItems="center" mb={4}>
                            <Grid item>
                                <AboutIcon color="primary">
                                    <EmailIcon color="primary" />
                                </AboutIcon>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">Email :  {organisme?.email ? organisme?.email : "..."} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" alignItems="center" mb={4}>
                            <Grid item>
                                <AboutIcon>
                                    <HomeIcon color="primary" />
                                </AboutIcon>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">Adresse :  {organisme?.adresse} {organisme?.complement_adresse} {organisme?.code_postal} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" alignItems="center" mb={4}>
                            <Grid item>
                                <AboutIcon>
                                    <LocationIcon color="primary" />
                                </AboutIcon>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">Ville: {organisme?.ville ? organisme?.ville : "..."}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" alignItems="center" mb={4}>
                            <Grid item>
                                <AboutIcon>
                                    <LocationIcon color="primary" />
                                </AboutIcon>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">Code postal: {organisme?.code_postal ? organisme?.code_postal : "..."}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" alignItems="center" mb={4}>
                            <Grid item>
                                <AboutIcon>
                                    <LocationIcon color="primary" />
                                </AboutIcon>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">Pays: {organisme?.pays ? organisme?.pays : "..."}</Typography>
                            </Grid>
                        </Grid>

                        {
                            organisme?.pays != "France" ?
                                <>
                                    <Grid container direction="row" alignItems="center" mb={4}>
                                        <Grid item>
                                            <AboutIcon>
                                                <LocationIcon color="primary" />
                                            </AboutIcon>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6">Région: {organisme?.region ? organisme?.region : "..."}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" alignItems="center" mb={4}>
                                        <Grid item>
                                            <AboutIcon>
                                                <LocationIcon color="primary" />
                                            </AboutIcon>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6">Etat: {organisme?.etat ? organisme?.etat : "..."}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" alignItems="center" mb={4}>
                                        <Grid item>
                                            <AboutIcon>
                                                <LocationIcon color="primary" />
                                            </AboutIcon>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6">Province: {organisme?.province ? organisme?.province : "..."}</Typography>
                                        </Grid>
                                    </Grid>
                                </>
                                :

                                ""
                        }

                        <Grid container direction="row" alignItems="center" mb={4}>
                            <Grid item>
                                <AboutIcon>
                                    <FixeIcon color="primary" />
                                </AboutIcon>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6"> Mobile:{organisme?.telephone1 ? organisme?.indicatif1 + ' ' + organisme?.telephone1 : "..."}</Typography>
                            </Grid>
                        </Grid>


                        <Grid container direction="row" alignItems="center" mb={4}>
                            <Grid item>
                                <AboutIcon>
                                    <FixeIcon color="primary" />
                                </AboutIcon>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6"> Fixe: {organisme?.telephone2 ? organisme?.indicatif2 + ' ' + organisme?.telephone2 : "..."}</Typography>
                            </Grid>
                        </Grid>


                    </CardContent>
                </Card>




            </>
        );
    }

    function Elsewhere(props) {

        const { organisme } = props;


        return (
            <Card mb={6}>
                <CardContent>
                    <Typography variant="h3" >
                        Autres infos
                    </Typography>

                    <Spacer mb={10} />

                    <Grid container direction="row" alignItems="center" mb={4}>
                        <Grid item>
                            <AboutIcon>
                                <NotesIcon color="primary" />
                            </AboutIcon>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">Notes: {organisme?.notes ? organisme?.notes : "..."}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center" mb={4}>
                        <Grid item>
                            <AboutIcon>
                                <CalendarIcon color="primary" />
                            </AboutIcon>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">Date de création: {organisme?.created_at ? parseDateTime(organisme?.created_at) : "..."}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center" mb={4}>
                        <Grid item>
                            <AboutIcon>
                                <AccountIcon color="primary" />
                            </AboutIcon>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">Est un utilisateur: {organisme?.user != null ? <Chip label="Oui" color="primary" variant="outlined" /> : <Chip label="Non" color="error" variant="outlined" />}  </Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center" mb={4}>
                        <Grid item>
                            <AboutIcon>
                                <ArchiveIcon color="primary" />
                            </AboutIcon>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">Archivé: {organisme?.archive === true ? <Chip label="Oui" color="primary" variant="outlined" /> : <Chip label="Non" color="error" variant="outlined" />}  </Typography>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        );
    }


    function IndivduGrid(props) {

        const { organisme, postes } = props;

        // console.log(props);
        const StyledTableCell = styled(TableCell)(({ theme }) => ({
            [`&.${tableCellClasses.head}`]: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            [`&.${tableCellClasses.body}`]: {
                fontSize: 14,
            },
        }));
        const param = useParams();
        const organisme_id = decrypt(param.id);

        const [individus, setIndividus] = useState([]);

        const StyledTableRow = styled(TableRow)(({ theme }) => ({
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
            // hide last border
            '&:last-child td, &:last-child th': {
                border: 0,
            },
        }));


        const handleClickEdit = (e, cell) => {
            e.preventDefault();
            setEdit(true);
            setOpen(true);
            setAlertSuccess(false);
            setAlertError(false);


        }
        const handleClickRemoveIndividu = (e, row) => {
            e.preventDefault();
            const ligne = e.currentTarget;


            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Voulez-vous retirer cet individu ?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Oui',
                cancelButtonText: 'Non',
                reverseButtons: true
            }).then((result) => {


                if (result.isConfirmed) {

                    removeIndividus(organisme_id, row.id).then((res) => {

                        if (res.status === 200) {

                            swalWithBootstrapButtons.fire(
                                'Individu retiré',
                                '',
                                'success'
                            )
                            ligne.closest('tr').remove();
                        }
                    })
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Annulé',
                        '',
                        'error'
                    )
                }
            })

        }



        const rows = organisme.individus;

        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nom</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Contact</StyledTableCell>
                            <StyledTableCell align="right">Mission/Poste</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.nom} {row.prenom}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.email}</StyledTableCell>
                                <StyledTableCell align="right">{row.telephone1}</StyledTableCell>
                                <StyledTableCell align="right">{postes[row.pivot.poste_id]}</StyledTableCell>
                                <StyledTableCell align="right">

                                    {/* 
                                    <IconButton color="success" title="Modifier" onClick={(event) => {
                                        handleClickEdit(event, row);
                                    }} >
                                        <EditIcon />
                                    </IconButton> */}


                                    <IconButton color="error" title="Retirer"
                                        onClick={(event) => {
                                            handleClickRemoveIndividu(event, row);
                                        }} >
                                        <DeleteIcon />
                                    </IconButton>

                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    const auth = useSelector((state) => state.auth);

    const [organisme, setOrganisme] = useState({});
    const [postes, setPostes] = useState({});
    const param = useParams();
    const organisme_id = decrypt(param.id);
    // let postes = [];
    useEffect(() => {

        getOrganisme(organisme_id)
            .then(res => {

                if (res.status == 200) {
                    setPostes(res.postes);
                    setOrganisme(res.organisme);
                }

            });

    }, [open]);

    return (
        <React.Fragment>
            <Helmet title="Profile" />

            <Typography variant="h3" gutterBottom display="inline">
                Organisme
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={4}>
                <Link component={NavLink} to="/organismes">
                    Organismes
                </Link>

                <Typography>Détail</Typography>
            </Breadcrumbs>

            <Divider my={6} />

            <Grid container spacing={6} component={Paper} >

                <Grid item xs={12} lg={12} xl={12} >
                    <Grid container spacing={3}  >
                        <Grid item xs={12} > <Details organisme={organisme} /></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={12} xl={6} >
                    <Grid container spacing={3}  >
                        <Grid item xs={12} sm={6} lg={6} ><About organisme={organisme} /></Grid>
                        <Grid item xs={12} sm={6} lg={6} ><Elsewhere organisme={organisme} /></Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12} lg={12} xl={6}>
                    {/* <Permissions auth={auth} /> */}
                    <Grid item xs={12} > <IndivduGrid organisme={organisme} postes={postes} /></Grid>


                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default InfoOrganisme;
