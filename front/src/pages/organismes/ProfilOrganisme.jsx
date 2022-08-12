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


function ProfilOrganisme() {

    return (
        <>
            <Helmet title='Organisme Name' />
            <h1>Organisme Profil</h1>
        </>
  );
}

export default ProfilOrganisme;
