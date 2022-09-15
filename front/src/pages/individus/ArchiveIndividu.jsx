import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2'

import {
    Card as MuiCard,
    CardContent as MuiCardContent,
    Divider as MuiDivider,
    Paper as MuiPaper,
    Typography,
    Grid,
    IconButton,
    Skeleton,
    Breadcrumbs,
    Stack
} from "@mui/material";


import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@mui/system";

import {
    Unarchive as UnArchiveIcon,
    Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getArchivedContacts, restoreContact } from "../../services/ContactsServices";
import { encrypt } from "../../utils/crypt";


const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

function getIfUser(params) {
    return params?.row?.user === null ? 'Non' : 'Oui';
}


function DataGridContact({ contacts, columns }) {
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
                        rows={contacts}
                        columns={columns}
                        checkboxSelection
                    />
                </div>
            </Paper>
        </Card>
    );
}

function Contacts() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth);

    const columns = [
        //   { field: "id", headerName: "ID", width: 150 },
        {
            field: "prenom",
            headerName: "Prénom",
            width: 200,
            editable: false,
        },
        {
            field: "nom",
            headerName: "Nom",
            width: 200,
            editable: false,
        },
        {
            field: "email",
            headerName: "Email",
            width: 200,
            editable: false,
        },
        {
            field: "adresse",
            headerName: "Adresse",
            width: 200,
            editable: false,
        },
        {
            field: "user",
            headerName: "Utilisateur",
            width: 200,
            editable: false,
            valueGetter: getIfUser
        },
        {
            field: "Actions",
            width: 150,
            renderCell: (cellValues) => {

                return (
                    <>
                        <IconButton color="info" title="Informations" onClick={() => navigate(`/contact/info/${encrypt(cellValues.id)}`)}>
                            <VisibilityIcon />
                        </IconButton>

                        {user.permissions.includes('Edit-Contact') &&
                            <IconButton color="primary" title="Restaurer"
                                onClick={(event) => {
                                    handleClickArchive(event, cellValues);
                                }} >
                                <UnArchiveIcon />
                            </IconButton>}
                    </>
                );
            }
        }
    ];

    const loadingC = [
        {
            field: "Prénom",
            width: 200,
            renderCell: () => {
                return (
                    <Skeleton animation='wave' variant='text' width={170} />
                );
            }
        },
        {
            field: "Nom",
            width: 200,
            renderCell: () => {
                return (
                    <Skeleton animation='wave' variant='text' width={170} />
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
            field: "Adresse",
            width: 200,
            renderCell: () => {
                return (
                    <Skeleton animation='wave' variant='text' width={170} />
                );
            }
        },
        {
            field: "User",
            width: 200,
            renderCell: () => {
                return (
                    <Skeleton animation='wave' variant='text' width={75} />
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
                        {user.permissions.includes('Edit-Contact') &&
                            <Skeleton animation='wave' variant='rounded' width={35} height={35} sx={{ borderRadius: 3 }} />}
                    </Stack>
                );
            }
        }
    ];

    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {

        try {
            const listContacts = await getArchivedContacts();
            setContacts(listContacts);
        } catch (e) { }
        setLoading(false)

    }, []);


    // Archiver les contacts
    function handleClickArchive(event, cellValues) {


        const ligne = event.currentTarget;

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Voulez-vous restaurer le contact ?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
            reverseButtons: true
        }).then((result) => {


            if (result.isConfirmed) {

                restoreContact(cellValues.id).then((res) => {

                    if (res.status === 200) {

                        var newContacts = contacts.filter(contact => contact.id != cellValues.id);
                        setContacts(newContacts);

                        swalWithBootstrapButtons.fire(
                            'Contact restauré',
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
                    'Restauration annulée',
                    '',
                    'error'
                )
            }
        })
    }


    return (
        <React.Fragment>
            <Helmet title="Contacts" />

            <Grid container spacing={5}>
                <Grid item >
                    <Typography variant="h3" gutterBottom display="inline">
                        Contacts archivés
                    </Typography>
                    <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                        <Link component={NavLink} to="/contacts/actifs">
                            Contacts actifs
                        </Link>

                    </Breadcrumbs>
                </Grid>

            </Grid>

            <Divider my={6} />

            {loading ? <DataGridContact columns={loadingC} contacts={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }]} /> : <DataGridContact contacts={contacts} columns={columns} />}
        </React.Fragment>
    );
}

export default Contacts;
