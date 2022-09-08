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
import { getOrganisme } from "../../services/OrganismesServices";

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

    const { organisme } = props;

    return (
        <Card mb={6}>
            <CardContent>

                <Spacer mb={4} />

                <Centered>
                    <Avatar alt="Lucy Lavender" src="/static/img/avatars/avatar-1.jpg" />
                    <Typography variant="body2" component="div" gutterBottom>
                        <Box fontWeight="fontWeightMedium">{organisme?.nom} {organisme?.prenom}</Box>

                    </Typography>

                    <Link to={`/organisme/modifier/${encrypt(organisme?.id)}`} component={NavLink}>
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

    const { organisme } = props;

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


function InfoOrganisme() {


    const auth = useSelector((state) => state.auth);

    const [organisme, setOrganisme] = useState({});
    const param = useParams();
    const organisme_id = decrypt(param.id);

    useEffect(() => {


        getOrganisme(organisme_id)
            .then(res => {

                if (res.status == 200) {
                    setOrganisme(res.organisme);
                }

            })

    }, [])

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
                <Grid item xs={12} >
                    <Grid container spacing={3}  >
                        <Grid item xs={12} > <Details organisme={organisme} /></Grid>
                        <Grid item xs={12} sm={6} lg={6} ><About organisme={organisme} /></Grid>
                        <Grid item xs={12} sm={6} lg={6} ><Elsewhere organisme={organisme} /></Grid>
                    </Grid>



                </Grid>
                <Grid item xs={12} lg={8} xl={9}>
                    {/* <Permissions auth={auth} /> */}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default InfoOrganisme;
