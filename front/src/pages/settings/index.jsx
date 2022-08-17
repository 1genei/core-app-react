import { useState } from 'react';
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
import EditProfile from "../profile/Edit";
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
                    <Tab label='Mon profil' icon={<PersonIcon />} iconPosition="start" />
                    <Tab label='Application' icon={<AppsIcon />} iconPosition="start" />
                    {user?.permissions.includes('View-Owner') && <Tab label='Société' icon={<BusinessCenterIcon />} iconPosition="start" />}
                    {user?.permissions.includes('View-RolesPermissions') && <Tab label='Rôles & Permissions' icon={<ShieldIcon />} iconPosition="start" />}
                </Tabs>
                {tabsValue === 0 && <EditProfile />}
                {tabsValue === 1 && <AppSettings />}
                {tabsValue === 2 && user?.permissions.includes('View-Owner') && <OwnerSettings />}
                {tabsValue === 3 && user?.permissions.includes('View-RolesPermissions') && <RolesPermissionsSettings />}
            </Box>
        </>
    )
};