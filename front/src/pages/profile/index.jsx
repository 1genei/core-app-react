import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useSelector } from 'react-redux';
import { parseDateTime } from "../../utils/datetime";

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Stack,
  Button
} from "@mui/material";
import { spacing } from "@mui/system";
import { useNavigate } from "react-router-dom";


const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);


function Profile() {
    const navigate = useNavigate();
    const user = useSelector( (state) => state.auth);
  return (
    <React.Fragment>
      <Helmet title="Profil" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
            <Typography variant="h3" gutterBottom>
                Profil
            </Typography>
            <Typography variant="subtitle1">
                {'Ceci est votre profil ' + user?.name}
            </Typography>
            </Grid>

            <Grid item>
                <Button onClick={() => navigate('/profile/edit')} variant='contained' size='large'>
                    Modifier le profil
                </Button>
            </Grid>
        </Grid>

        <Divider my={6} />

        <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={6} lg={3} xl>
            <Typography variant='h4'>
                Email lié à l'utilisateur : {user.email}
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3} xl>
            <Typography variant='h4'>
                Inscrit depuis : {parseDateTime(user.created_at)}
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3} xl>
                <Stack direction='column'>
                <Typography variant='h4'>
                    Permissions : 
                </Typography>
                {user.permissions.map((index) => (
                    <Typography variant='subtitle'>
                    - {index}
                    </Typography>
                ))}
                </Stack>
            </Grid>
        </Grid>
    </React.Fragment>
  );
}

export default Profile;
