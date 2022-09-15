import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { parseDateTime, parseDate } from "../../utils/datetime";
import { styled as MuiStyled } from '@mui/material/styles';

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

} from '@mui/icons-material/';

import {
    Avatar as MuiAvatar,
    Box,
    Breadcrumbs as MuiBreadcrumbs,
    Button as MuiButton,
    Card as MuiCard,
    CardContent,
    Chip,
    Divider as MuiDivider,
    Grid as MuiGrid,
    Link,
    Paper,

    Typography as MuiTypography,
} from "@mui/material";

import { spacing } from "@mui/system";
import { decrypt, encrypt } from "../../utils/crypt";
import { getContact } from "../../services/ContactsServices";

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




function Details(props) {

    const { contact } = props;

    console.log(contact);
    return (
        <Card mb={6}>
            <CardContent>

                <Spacer mb={4} />

                <Centered>
                    <Avatar alt="Lucy Lavender" src="/static/img/avatars/avatar-1.jpg" />
                    <Typography variant="body2" component="div" gutterBottom>
                        <Box fontWeight="fontWeightMedium">{contact?.nom} {contact?.prenom}</Box>

                    </Typography>

                    <Link to={`/contact/modifier/${encrypt(contact?.id)}`} component={NavLink}>
                        <Button mr={4} variant="contained" color="success" size="small"  >
                            Modifier
                        </Button>
                    </Link>

                </Centered>
            </CardContent>
        </Card >
    );
}


function About(props) {

    const { contact } = props;

    const [error, setError] = useState(false);
    const TypoTitle = MuiStyled(Typography)(() => ({
        textDecoration: 'underline',
        fontWeight: 800
    }));
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
                            <Typography variant="h6">Email :  {contact?.email ? contact?.email : "..."} </Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" alignItems="center" mb={4}>
                        <Grid item>
                            <AboutIcon>
                                <HomeIcon color="primary" />
                            </AboutIcon>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">Adresse :  {contact?.adresse} {contact?.complement_adresse} {contact?.code_postal} </Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" alignItems="center" mb={4}>
                        <Grid item>
                            <AboutIcon>
                                <LocationIcon color="primary" />
                            </AboutIcon>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">Ville: {contact?.ville ? contact?.ville : "..."}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center" mb={4}>
                        <Grid item>
                            <AboutIcon>
                                <LocationIcon color="primary" />
                            </AboutIcon>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">Code postal: {contact?.code_postal ? contact?.code_postal : "..."}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" alignItems="center" mb={4}>
                        <Grid item>
                            <AboutIcon>
                                <LocationIcon color="primary" />
                            </AboutIcon>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">Pays: {contact?.pays ? contact?.pays : "..."}</Typography>
                        </Grid>
                    </Grid>

                    {
                        contact?.pays != "France" ?
                            <>
                                <Grid container direction="row" alignItems="center" mb={4}>
                                    <Grid item>
                                        <AboutIcon>
                                            <LocationIcon color="primary" />
                                        </AboutIcon>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6">Région: {contact?.region ? contact?.region : "..."}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" mb={4}>
                                    <Grid item>
                                        <AboutIcon>
                                            <LocationIcon color="primary" />
                                        </AboutIcon>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6">Etat: {contact?.etat ? contact?.etat : "..."}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" mb={4}>
                                    <Grid item>
                                        <AboutIcon>
                                            <LocationIcon color="primary" />
                                        </AboutIcon>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6">Province: {contact?.province ? contact?.province : "..."}</Typography>
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
                            <Typography variant="h6"> Mobile:{contact?.telephone1 ? contact?.indicatif1 + ' ' + contact?.telephone1 : "..."}</Typography>
                        </Grid>
                    </Grid>


                    <Grid container direction="row" alignItems="center" mb={4}>
                        <Grid item>
                            <AboutIcon>
                                <FixeIcon color="primary" />
                            </AboutIcon>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6"> Fixe: {contact?.telephone2 ? contact?.indicatif2 + ' ' + contact?.telephone2 : "..."}</Typography>
                        </Grid>
                    </Grid>


                </CardContent>
            </Card>



        </>
    );
}

function Elsewhere(props) {

    const { contact } = props;


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
                        <Typography variant="h6">Notes: {contact?.notes ? contact?.notes : "..."}</Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" mb={4}>
                    <Grid item>
                        <AboutIcon>
                            <CalendarIcon color="primary" />
                        </AboutIcon>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">Date de création: {contact?.created_at ? parseDateTime(contact?.created_at) : "..."}</Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" mb={4}>
                    <Grid item>
                        <AboutIcon>
                            <AccountIcon color="primary" />
                        </AboutIcon>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">Est un utilisateur: {contact?.user != null ? <Chip label="Oui" color="primary" variant="outlined" /> : <Chip label="Non" color="error" variant="outlined" />}  </Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" mb={4}>
                    <Grid item>
                        <AboutIcon>
                            <ArchiveIcon color="primary" />
                        </AboutIcon>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">Archivé: {contact?.archive === true ? <Chip label="Oui" color="primary" variant="outlined" /> : <Chip label="Non" color="error" variant="outlined" />}  </Typography>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    );
}


function InfoContact() {


    const auth = useSelector((state) => state.auth);

    const [contact, setContact] = useState({});
    const param = useParams();
    const contact_id = decrypt(param.id);

    useEffect(() => {


        getContact(contact_id)
            .then(res => {

                if (res.status == 200) {
                    setContact(res.contact);
                }
            })

    }, [])

    return (
        <React.Fragment>
            <Helmet title="Profile" />

            <Typography variant="h3" gutterBottom display="inline">
                Contact
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={4}>
                <Link component={NavLink} to="/contacts/actifs">
                    Contacts
                </Link>

                <Typography>Détail</Typography>
            </Breadcrumbs>

            <Divider my={6} />

            <Grid container spacing={6} component={Paper} >
                <Grid item xs={12} >
                    <Grid container spacing={3}  >
                        <Grid item xs={12} > <Details contact={contact} /></Grid>
                        <Grid item xs={12} sm={6} lg={6} ><About contact={contact} /></Grid>
                        <Grid item xs={12} sm={6} lg={6} ><Elsewhere contact={contact} /></Grid>
                    </Grid>



                </Grid>
                <Grid item xs={12} lg={8} xl={9}>
                    {/* <Permissions auth={auth} /> */}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default InfoContact;
