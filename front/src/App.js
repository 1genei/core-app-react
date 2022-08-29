import React from "react";
import { useRoutes } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { CacheProvider } from "@emotion/react";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import "./i18n";
import createTheme from "./theme";

import useTheme from "./hooks/useTheme";
import createEmotionCache from "./utils/createEmotionCache";

import Loading from './pages/utils/Loading';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from './api/Axios';
import { login } from './store/reducers/Auth';
import MyRoutes from "./routes/index";


const clientSideEmotionCache = createEmotionCache();

function App({ emotionCache = clientSideEmotionCache }) {

    const { theme } = useTheme();
    const content = useRoutes(MyRoutes);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.post('auth/verify-token', {}, { withCredentials: true })
            .then((res) => {
                if (res?.data?.status === 200) {
                    const name = res?.data?.name;
                    const email = res?.data?.user?.email;
                    const user = res?.data?.user;
                    const created_at = res?.data?.user?.created_at;
                    const permissions = res?.data?.permissions;
                    const resAPI = { name, email, user, created_at, permissions };
                    dispatch(login({ resAPI }));
                }
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error)
                setLoading(false);
            });
    }, []);

    return (
        <CacheProvider value={emotionCache}>
            <HelmetProvider>
                <Helmet
                    titleTemplate="%s | Core App"
                    defaultTitle="Core App"
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MuiThemeProvider theme={createTheme(theme)}>
                        {loading ? <Loading /> : content}
                    </MuiThemeProvider>
                </LocalizationProvider>
            </HelmetProvider>
        </CacheProvider>
    );
}

export default App;
