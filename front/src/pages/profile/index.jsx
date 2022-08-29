import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useSelector } from "react-redux";
import {
    ExternalLink,
    Home,
    MapPin,
    Phone,
    Mail
} from "react-feather";
import EditIcon from '@mui/icons-material/Edit';

import {
    Alert,
    Avatar as MuiAvatar,
    Box,
    Breadcrumbs as MuiBreadcrumbs,
    Button as MuiButton,
    Card as MuiCard,
    CardContent,
    Checkbox,
    Divider as MuiDivider,
    FormGroup,
    Grid as MuiGrid,
    Link,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography as MuiTypography,
} from "@mui/material";

import { spacing } from "@mui/system";
import { getUserPermissions, updateUserPermissions } from "../../services/AuthServices";
import { encrypt } from "../../utils/crypt";

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
  padding-right: ${(props) => props.theme.spacing(2)};

  svg {
    width: 14px;
    height: 14px;
  }
`;


const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

function Details(props) {

    const { auth } = props;
    const contact = auth?.user?.contact;
    console.log(auth);
    return (
        <Card mb={6}>
            <CardContent>

                <Spacer mb={4} />

                <Centered>
                    <Avatar alt="Lucy Lavender" src="/static/img/avatars/avatar-1.jpg" />
                    <Typography variant="body2" component="div" gutterBottom>
                        <Box fontWeight="fontWeightMedium">{auth?.name}</Box>
                        <Box fontWeight="fontWeightRegular">{auth?.user?.role?.nom}</Box>
                    </Typography>

                    <Link to={`/contact/modifier/${encrypt(contact?.id)}`} component={NavLink}>
                        <Button mr={2} variant="contained" color="success" size="small" endIcon={<EditIcon />} >
                            Modifier
                        </Button>
                    </Link>

                </Centered>
            </CardContent>
        </Card >
    );
}


function About(props) {

    const { auth } = props;
    const contact = auth?.user?.contact;
    return (
        <Card mb={6}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Infos
                </Typography>

                <Spacer mb={4} />
                <Grid container direction="row" alignItems="center" mb={2}>
                    <Grid item>
                        <AboutIcon>
                            <Mail />
                        </AboutIcon>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" > {contact?.email}</Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" mb={2}>
                    <Grid item>
                        <AboutIcon>
                            <Home />
                        </AboutIcon>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6"> {contact?.adresse} {contact?.complement_adresse} {contact?.code_postal} </Typography>
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <AboutIcon>
                            <MapPin />
                        </AboutIcon>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6"> {contact?.ville}</Typography>
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center" mb={2}>
                    <Grid item>
                        <AboutIcon>
                            <Phone />
                        </AboutIcon>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6"> {contact?.telephone1}</Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" mb={2}>
                    <Grid item>
                        <AboutIcon>
                            <Phone />
                        </AboutIcon>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6"> {contact?.telephone2}</Typography>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    );
}

function Elsewhere(props) {

    const { auth } = props;
    const contact = auth?.user?.contact;

    return (
        <Card mb={6}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Autres infos
                </Typography>

                <Spacer mb={4} />

                <Grid container direction="row" alignItems="center" mb={2}>
                    <Grid item>
                        <AboutIcon>
                            <ExternalLink />
                        </AboutIcon>
                    </Grid>
                    <Grid item>
                        ...
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    );
}





function Row(props) {
    const { groupName, permissionUser, permissions, setPermissionUserChecked, permissionUserChecked } = props;

    const user_id = 1;
    function handleChange(e) {
        const { value, checked } = e.target;
        e.target.checked = !e.target.checked;
        setPermissionUserChecked({ ...permissionUserChecked, [value]: checked })


    }

    return (
        <React.Fragment>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>


                    <Typography variant="h5" gutterBottom component="div" sx={{ fontWeight: 800, textDecoration: 'underline' }} mt={2}>{groupName}</Typography>

                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell width={250}>&nbsp;</TableCell>

                                <TableCell >#</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {permissions.map((permission) => {
                                var checked = permissionUser.includes(permission.id)
                                return (
                                    <TableRow key={permission.id}>
                                        <TableCell width={250}>{permission.description}</TableCell>
                                        <TableCell ><Checkbox key={permission.id + '_' + user_id} checked={permissionUserChecked[permission.id] ?? checked} onChange={handleChange} value={permission.id} /> </TableCell>

                                    </TableRow>
                                )
                            }
                            )}
                        </TableBody>
                    </Table>

                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function Permissions() {

    const [roles, setRoles] = useState([]);
    const [permissionGroups, setPermissionGroups] = useState([]);
    const [permissionUser, setPermissionUser] = useState([]);
    const [permissionUserChecked, setPermissionUserChecked] = useState([]);
    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageErrors, setMessageErrors] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const vertical = "top";
    const horizontal = "center";

    useEffect(() => {

        getUserPermissions(1).then(data => {

            setRoles(data.roles);
            setPermissionGroups(data.permissionGroups);
            setPermissionUser(data.permissionUser);

        });

    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        setAlertSuccess(false);
        setAlertError(false);


        updateUserPermissions(permissionUserChecked, 1).then(data => {

            if (data.status == 200) {
                setAlertSuccess(true);
                setMessageSuccess(data.message);
            } else {
                setAlertError(true);
                setMessageErrors(" Erreur: permissions non modifiées");

            }

        })

    }

    return (
        <Card mb={6}>
            <CardContent>
                <Grid container direction="row" justifyContent="center" mb={{ xs: 10, lg: 15 }}>
                    <Grid>
                        <Typography variant="h3" gutterBottom>
                            Modifier les Permissions
                        </Typography>
                    </Grid>
                </Grid>


                <TableWrapper>
                    <FormGroup >
                        {alertSuccess && (

                            <Snackbar open={alertSuccess} anchorOrigin={{ vertical, horizontal }}>
                                <Alert severity="success" onClose={() => setAlertSuccess(false)} my={3}>
                                    <Typography variant="h6" component="h6" > {messageSuccess}  </Typography>
                                </Alert>
                            </Snackbar>
                        )}
                        {alertError && (
                            <Snackbar open={alertError} autoHideDuration={6} anchorOrigin={{ vertical, horizontal }}>
                                <Alert severity="warning" onClose={() => setAlertError(false)} my={3}>
                                    <Typography variant="h6" component="h6" > {messageErrors}  </Typography>
                                </Alert>
                            </Snackbar>
                        )}

                        <form onSubmit={handleSubmit}>


                            <TableContainer component={Paper} sx={{ width: '100%', overflow: 'hidden' }}>
                                <Table stickyHeader aria-label="sticky table " >
                                    <TableHead >
                                        <TableRow>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {permissionGroups.map((group) => (
                                            <Row key={group.id} roles={roles} groupName={group.nom} permissionUser={permissionUser} permissions={group.permissions} setPermissionUserChecked={setPermissionUserChecked} permissionUserChecked={permissionUserChecked} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Grid container direction="row" justifyContent="center">
                                <Grid item mt={10} mb={5}>
                                    <Button type="submit" size="large" variant="contained" color="success" endIcon={<EditIcon />}>
                                        Enregistrer
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </FormGroup>
                </TableWrapper>
            </CardContent>
        </Card>
    );
}



function Profile() {


    const auth = useSelector((state) => state.auth);

    return (
        <React.Fragment>
            <Helmet title="Profile" />

            <Typography variant="h3" gutterBottom display="inline">
                Profil
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} to="/">
                    Dashboard
                </Link>

                <Typography>Profil</Typography>
            </Breadcrumbs>

            <Divider my={6} />

            <Grid container spacing={6} component={Paper} >
                <Grid item xs={12} lg={4} xl={3}>
                    <Grid container spacing={3}  >
                        <Grid xs={12} > <Details auth={auth} /></Grid>
                        <Grid xs={6} lg={12} ><About auth={auth} /></Grid>
                        <Grid xs={6} lg={12} ><Elsewhere auth={auth} /></Grid>
                    </Grid>



                </Grid>
                <Grid item xs={12} lg={8} xl={9}>
                    <Permissions auth={auth} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Profile;
