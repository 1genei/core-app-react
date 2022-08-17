import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from "react-helmet-async";

import {
    Tabs,
    Tab,
    Box
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import AppsIcon from '@mui/icons-material/Apps';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShieldIcon from '@mui/icons-material/Shield';

import AppSettings from './AppSettings';
import OwnerSettings from './OwnerSettings';
import RolesPermissionsSettings from './RolesPermissionsSettings';

export default function Parametres() {

    const [tabsValue, setTabsValue] = useState(0);
    const user = useSelector((state) => state.auth);

    return (
        <>
            <Helmet title="Paramètres" />
            <Box sx={{ width: '100%', height: '100%' }}>
                <Tabs value={tabsValue} onChange={(e, val) => setTabsValue(val)} variant="scrollable" scrollButtons="auto">
                    <Tab label='Application' icon={<AppsIcon />} iconPosition="start" />
                    <Tab label='Mon profil' icon={<PersonIcon />} iconPosition="start" />
                    {user?.permissions.includes('Edit-Owner') && <Tab label='Société' icon={<BusinessCenterIcon />} iconPosition="start" />}
                    {user?.permissions.includes('Edit-RolesPermissions') && <Tab label='Rôles & Permissions' icon={<ShieldIcon />} iconPosition="start" />}
                </Tabs>
                {tabsValue === 0 && <AppSettings />}
                {tabsValue === 1 && <Navigate to='/profile/edit' />}
                {tabsValue === 2 && user?.permissions.includes('Edit-Owner') && <OwnerSettings />}
                {tabsValue === 3 && user?.permissions.includes('Edit-RolesPermissions') && <RolesPermissionsSettings />}
            </Box>
        </>
    )
};