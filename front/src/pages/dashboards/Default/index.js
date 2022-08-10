import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import { parseDateTime } from "../../../utils/datetime";

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



function Default() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector( (state) => state.auth);


  return (
    <React.Fragment>
      <Helmet title="Default Dashboard" />
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
            Inscirt depuis : {parseDateTime(user.created_at)}
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
        {/*<Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Sales Today"
            amount="2.532"
            chip="Today"
            percentagetext="+26%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Visitors"
            amount="170.212"
            chip="Annual"
            percentagetext="-14%"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Total Earnings"
            amount="$ 24.300"
            chip="Monthly"
            percentagetext="+18%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Pending Orders"
            amount="45"
            chip="Yearly"
            percentagetext="-9%"
            percentagecolor={red[500]}
            illustration="/static/img/illustrations/waiting.png"
          />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <LineChart />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DoughnutChart />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={4}>
          <BarChart />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Table />
        </Grid>*/}
      </Grid>
    </React.Fragment>
  );
}

export default Default;
