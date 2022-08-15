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
    Stack
} from "@mui/material";


import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@mui/system";

import {
    Archive as ArchiveIcon,
    Edit as EditIcon,
    AccountBox as AccountBoxIcon,
    Add
} from '@mui/icons-material';
import { archiveUser, getActiveUsers } from "../../services/UtilisateursServices";
import { encrypt } from "../../utils/crypt";


const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

function getFullName(params) {
    return `${params.row.contact.prenom || ''} ${params.row.contact.nom || ''}`;
}

function getRoleName(params) {
    return `${params.row.role.nom}`;
}



function handleEdit(event, cellValues) {
    console.log(cellValues);
}



function DataGridUtilisateur({ utilisateurs, columns }) {
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
                        rows={utilisateurs}
                        columns={columns}
                        checkboxSelection
                    />
                </div>
            </Paper>
        </Card>
    );
}

function Utilisateurs() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth);

    const [utilisateurs, setUtilisateurs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        try {
            const listUtilisateurs = await getActiveUsers();
            setUtilisateurs(listUtilisateurs);
        } catch (e) { }
        setLoading(false)
    }, []);

    const columns = [
        //   { field: "id", headerName: "ID", width: 150 },
        {
            field: "contact",
            headerName: "Contact",
            width: 200,
            editable: false,
            valueGetter: getFullName
        },
        {
            field: "email",
            headerName: "Email",
            width: 200,
            editable: false,
        },
        {
            field: "role",
            headerName: "Rôle",
            width: 200,
            editable: false,
            valueGetter: getRoleName
        },
        {
            field: "Actions",
            width: 150,
            renderCell: (cellValues) => {
                return (
                    <>
                        <IconButton color="info" title="Informations" onClick={() => navigate(`/utilisateur/info/${encrypt(cellValues.id)}`)}>
                            <AccountBoxIcon />
                        </IconButton>

                        {user.permissions.includes('Edit-User') &&
                            <IconButton color="success" title="Modifier" onClick={() => navigate(`/utilisateur/modifier/${encrypt(cellValues.id)}`)}>
                                <EditIcon />
                            </IconButton>}

                        {user.permissions.includes('Edit-User') &&
                            <IconButton color="warning" title="Archiver"
                                onClick={(event) => {
                                    handleClickArchive(event, cellValues);
                                }} >
                                <ArchiveIcon />
                            </IconButton>}


                    </>


                );
            }
        }
    ];

    const loadingC = [
        {
            field: "Contact",
            width: 200,
            renderCell: () => {
                return (
                    <Stack direction='row' spacing={2}>
                        <Skeleton animation='wave' variant='text' width={65} />
                        <Skeleton animation='wave' variant='text' width={100} />
                    </Stack>
                );
            }
        },
        {
            field: "Email",
            width: 200,
            renderCell: () => {
                return (
                    <Skeleton animation='wave' variant='text' width={170} />
                );
            }
        },
        {
            field: "Rôle",
            width: 200,
            renderCell: () => {
                return (
                    <Skeleton animation='wave' variant='text' width={140} />
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
                        {user.permissions.includes('Edit-User') &&
                            <Skeleton animation='wave' variant='rounded' width={35} height={35} sx={{ borderRadius: 3 }} />}
                        {user.permissions.includes('Edit-User') &&
                            <Skeleton animation='wave' variant='rounded' width={35} height={35} sx={{ borderRadius: 3 }} />}
                    </Stack>
                );
            }
        }
    ];


    function handleClickArchive(event, cellValues) {


        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Voulez-vous archiver l\'utilisateur ?',
            text: "Vous retrouverez l'utilisateur dans les archives!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
            reverseButtons: true
        }).then((result) => {


            if (result.isConfirmed) {

                archiveUser(cellValues.id).then((res) => {

                    if (res.status === 200) {
                        console.log(utilisateurs);
                        var newUtilisateurs = utilisateurs.filter(utilisateur => utilisateur.id != cellValues.id);
                        setUtilisateurs(newUtilisateurs);

                        swalWithBootstrapButtons.fire(
                            'Archivé!',
                            'Utilisateur archivé!',
                            'success'
                        )
                    }
                })
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Annulé',
                    'Archivage annulé',
                    'error'
                )
            }
        })
    }




    return (
        <React.Fragment>
            <Helmet title="Utilisateurs" />

            <Grid container alignItems='center' justifyContent='flex-start' spacing={5}>
                <Grid item >
                    <Typography variant="h3" gutterBottom display="inline">
                        Utilisateurs
                    </Typography>
                </Grid>
                {user.permissions.includes('Add-User') &&
                    <Grid item >
                        <Link to="/utilisateur/ajouter">
                            <Fab size="small" color="primary" aria-label="add">
                                <Add />
                            </Fab>
                        </Link>
                    </Grid>}
            </Grid>

            <Divider my={6} />
            {loading ? <DataGridUtilisateur columns={loadingC} utilisateurs={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }]} /> : <DataGridUtilisateur utilisateurs={utilisateurs} columns={columns} />}
        </React.Fragment>
    );
}

export default Utilisateurs;
