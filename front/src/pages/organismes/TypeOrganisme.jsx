import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import {
    Card as MuiCard,
    CardContent as MuiCardContent,
    Divider as MuiDivider,
    Paper as MuiPaper,
    Typography,
    Grid,
    IconButton,
    Fab,
    Skeleton,
    Stack,
    Modal,
    Box,
    Button,
    TextField,
    Alert,
    Chip,
    Snackbar
} from "@mui/material";


import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@mui/system";

import {
    Archive as ArchiveIcon,
    Edit as EditIcon,
    AccountBox as AccountBoxIcon,
    Add
} from '@mui/icons-material';
import { addTypeOrganisme, archiveOrganisme, archiveTypeOrganisme, getActiveTypeOrganisme, updateTypeOrganisme } from "../../services/OrganismesServices";
import { validatorErrors } from "../../utils/errors";




const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);


function DataGridOrganisme({ typeOrganismes, columns }) {
    const [pageSize, setPageSize] = React.useState(10);


    return (
        <Card mb={6}>
            <CardContent pb={1}>
                <Typography variant="h6" gutterBottom>
                    Liste
                </Typography>

            </CardContent>
            <Paper>
                <div style={{ height: 800, width: "100%" }}>
                    <DataGrid
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        pageSize={pageSize}
                        pagination
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rows={typeOrganismes}
                        columns={columns}

                    />
                </div>
            </Paper>
        </Card>
    );
}

function TypeOrganisme() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth);
    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageErrors, setMessageErrors] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const vertical = "top";
    const horizontal = "center";
    const [typeOrganismes, setTypeOrganismes] = useState([]);
    const [typeOrganisme, setTypeOrganisme] = useState({});
    const [loading, setLoading] = useState(true);
    const handleClose = () => setOpen(false);
    const handleOpen = () => {

        setOpen(true);
        setEdit(false);
        setTypeOrganisme({});
        setAlertSuccess(false);
        setAlertError(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = edit ? await updateTypeOrganisme(typeOrganisme, typeOrganisme?.id) : await addTypeOrganisme(typeOrganisme);

        if (result?.status === 200) {

            setIsSubmitting(false);

            setMessageSuccess(result?.message);
            setAlertSuccess(true);
            setAlertError(false);
            setOpen(false);
            setTypeOrganisme({});
            setLoading(true)

        } else {

            setIsSubmitting(false);

            let errors = validatorErrors(result?.errors);

            setAlertError(true);
            setMessageErrors(errors);

        }

    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        setTypeOrganisme({ ...typeOrganisme, [name]: value });

    }
    const handleClickEdit = (e, cell) => {
        e.preventDefault();
        setEdit(true);
        setOpen(true);
        setAlertSuccess(false);
        setAlertError(false);

        setTypeOrganisme({
            id: cell.row.id,
            type: cell.row.type,
            details: cell.row.details,
        })

    }

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

    const columns = [

        {
            field: "type",
            headerName: "Type",
            width: 200,
            editable: false,
        },
        {
            field: "details",
            headerName: "Détails",
            width: 200,
            editable: false,
        },

        {
            field: "Actions",
            width: 150,
            renderCell: (cellValues) => {

                return (
                    <>

                        <IconButton color="success" title="Modifier"
                            onClick={(event) => {
                                handleClickEdit(event, cellValues);
                            }} >
                            <EditIcon />
                        </IconButton>


                        <IconButton color="warning" title="Archiver"
                            onClick={(event) => {
                                handleClickArchive(event, cellValues);
                            }} >
                            <ArchiveIcon />
                        </IconButton>


                    </>


                );
            }
        }
    ];

    const loadingC = [
        {
            field: "Type",
            width: 200,
            renderCell: () => {
                return (
                    <Skeleton animation='wave' variant='text' width={170} />
                );
            }
        },
        {
            field: "Type",
            width: 200,
            renderCell: () => {
                return (
                    <Skeleton animation='wave' variant='text' width={170} />
                );
            }
        },



        {
            field: "Actions",
            width: 150,
            renderCell: () => {
                return (
                    <Stack direction='row' spacing={2}>
                        <Skeleton animation='wave' variant='rounded' width={35} height={35} sx={{ borderRadius: 3 }} />

                        <Skeleton animation='wave' variant='rounded' width={35} height={35} sx={{ borderRadius: 3 }} />

                        <Skeleton animation='wave' variant='rounded' width={35} height={35} sx={{ borderRadius: 3 }} />
                    </Stack>
                );
            }
        }
    ];



    useEffect(async () => {

        try {
            const listTypeOrganismes = await getActiveTypeOrganisme();
            setTypeOrganismes(listTypeOrganismes);
        } catch (e) { }
        setLoading(false)

    }, [loading]);


    // Archiver les type d'organisme
    function handleClickArchive(event, cellValues) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: "Voulez-vous archiver le type d'organisme ?",
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
            reverseButtons: true
        }).then((result) => {


            if (result.isConfirmed) {

                archiveTypeOrganisme(cellValues.id).then((res) => {

                    if (res.status === 200) {

                        var newTypeOrganismes = typeOrganismes.filter(typeOrganisme => typeOrganisme.id != cellValues.id);
                        setTypeOrganismes(newTypeOrganismes);

                        swalWithBootstrapButtons.fire(
                            "Type d'organisme archivé",
                            "",
                            "success"
                        )
                    }
                })
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Archivage annulé',
                    '',
                    'error'
                )
            }
        })
    }


    return (
        <React.Fragment>
            <Helmet title="Types d'organisme" />

            <Grid container alignItems='center' justifyContent='flex-start' spacing={5}>
                <Grid item  >
                    <Typography variant="h3" gutterBottom display="inline">
                        Types d'organisme
                    </Typography>

                </Grid>

                <Grid item >

                    <Fab onClick={handleOpen} size="small" color="primary" aria-label="add">
                        <Add />
                    </Fab>

                </Grid>
            </Grid>

            <Divider my={6} />


            <Grid container alignItems='center' justifyContent='flex-start' spacing={5} component={Paper}>

                <Grid item  >

                    {alertSuccess && (
                        <Snackbar open={alertSuccess} autoHideDuration={100} anchorOrigin={{ vertical, horizontal }}>
                            <Alert severity="success" onClose={() => setAlertSuccess(false)} my={3}>
                                <Typography variant="h6" component="h6" > {messageSuccess}  </Typography>
                            </Alert>
                        </Snackbar>
                    )}
                </Grid>

            </Grid>
            <div>

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
                                {edit ? "Modifier le type" : "Ajouter un type d'organisme"}

                            </Typography>
                        </Divider>
                        {alertError && (
                            <Alert severity="warning" onClose={() => setAlertError(false)} my={3}>
                                {messageErrors}
                            </Alert>
                        )}
                        <form onSubmit={handleSubmit}>
                            <Grid container pt={5} >
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={6} p={2}>
                                    <TextField
                                        name="type"
                                        label="Type"
                                        value={typeOrganisme?.type ?? ''}
                                        fullWidth
                                        onChange={handleChange}
                                        required
                                        variant="outlined"
                                        my={2}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={6} p={2}>
                                    <TextField
                                        name="details"
                                        label="Détails"
                                        value={typeOrganisme?.details ?? ''}
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

                            <Grid container>
                                <Grid item m={2}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color={edit ? "success" : "primary"}
                                        mt={3}
                                        size="large"
                                    >
                                        {edit ? "Modifier" : "Ajouter"}
                                    </Button>
                                </Grid>
                                <Grid item m={2}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="error"
                                        ml={3}
                                        onClick={() => setOpen(false)}
                                        mt={3}
                                        size="large"
                                    >
                                        Fermer
                                    </Button>
                                </Grid>
                            </Grid>

                        </form>
                    </Box>
                </Modal>

            </div>
            {loading ? <DataGridOrganisme columns={loadingC} typeOrganismes={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }]} /> : <DataGridOrganisme typeOrganismes={typeOrganismes} columns={columns} />}
        </React.Fragment>
    );
}

export default TypeOrganisme;

