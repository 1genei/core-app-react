import { Outlet } from 'react-router-dom';
import async from "../components/Async";

import DashboardLayout from "../layouts/Dashboard";
import Blank from "../pages/pages/Blank";
import Utilisateurs from "../pages/utilisateurs/Index";
import CreateUtilisateur from "../pages/utilisateurs/CreateUtilisateur";
import EditUtilisateur from "../pages/utilisateurs/EditUtilisateur";
import Contacts from "../pages/contacts/Index";
import CreateContact from "../pages/contacts/CreateContact"
import EditContact from "../pages/contacts/EditContact";

const Analytics = async(() => import("../pages/dashboards/Analytics"));
const DataGrid = async(() => import("../pages/tables/DataGrid"));


const PublicRoutes = {
    path: '/',
    element: <DashboardLayout />,
    children: [
        {
            path: '',
            element: <Analytics />
        },
        {
            path: 'blank',
            element: <Blank />
        },
        {
            path: 'liste',
            element: <DataGrid />
        },
        {
            path: "utilisateurs",
            element: <Utilisateurs />
        },
        {
            path: "utilisateur",
            element: <Outlet />,
            children: [
                {
                    path: "ajouter",
                    element: <CreateUtilisateur />,
                },
                {
                    path: "modifier/:id",
                    element: <EditUtilisateur />,
                },
            ]
        },
        {
            path: "contacts",
            element: <Contacts />,
        },
        {
            path: 'contact',
            element: <Outlet />,
            children: [
                {
                    path: "ajouter",
                    element: <CreateContact />,
                },
                {
                    path: "modifier/:id",
                    element: <EditContact />,
                },
            ]
        }
    ]
};

export default PublicRoutes;