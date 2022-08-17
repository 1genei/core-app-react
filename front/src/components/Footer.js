import * as React from "react";
import styled from "@emotion/styled";

import {
    Grid,
    Typography
} from "@mui/material";

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(0.25)}
    ${(props) => props.theme.spacing(4)};
  background: ${(props) => props.theme.footer.background};
  position: relative;
`;

function Footer() {
    return (
        <Wrapper>
            <Grid container alignItems='center' justifyContent='center'>
                <Grid item p={4}>
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>{`© ${new Date().getFullYear()} - Core App`}</Typography>
                </Grid>
            </Grid>
        </Wrapper>
    );
}

export default Footer;
