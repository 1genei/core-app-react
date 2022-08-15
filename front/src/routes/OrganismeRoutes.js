import { Outlet } from "react-router-dom";
import DashboardLayout from "../layouts/Dashboard";
import RequirePermission from './middlewares/RequirePermission';
import RequireAuth from "./middlewares/RequireAuth";
import Organismes from "../pages/organismes/Index";
import ArchiveOrganisme from '../pages/organismes/ArchiveOrganisme';
import CreateOrganisme from "../pages/organismes/CreateOrganisme";
import EditOrganisme from "../pages/organismes/EditOrganisme";
import InfoOrganisme from "../pages/organismes/InfoOrganisme";


const OrganismeRoutes = {
    path: '/',
    element: <RequireAuth />,
    children: [
        {
            element: <DashboardLayout />,
            children: [
                {
                    element: <RequirePermission permission={'View-Organismes'} />,
                    children: [
                        {
                            path: "organismes",
                            element: <Outlet />,
                            children: [
                                {
                                    path: 'actifs',
                                    element: <Organismes />
                                },
                                {
                                    path: 'archives',
                                    element: <ArchiveOrganisme />
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'organisme',
                    element: <Outlet />,
                    children: [
                        {
                            path: "info/:id",
                            element: <RequirePermission permission={'View-Organismes'} />,
                            children: [
                                {
                                    path: '',
                                    element: <InfoOrganisme />,
                                }
                            ]
                        },
                        {
                            path: "ajouter",
                            element: <RequirePermission permission={'Add-Organisme'} />,
                            children: [
                                {
                                    path: '',
                                    element: <CreateOrganisme />,
                                }
                            ]
                        },
                        {
                            path: "modifier/:id",
                            element: <RequirePermission permission={'Edit-Organisme'} />,
                            children: [
                                {
                                    path: '',
                                    element: <EditOrganisme />,
                                }
                            ]
                        },
                    ]
                }
            ]
        }
    ]
};

export default OrganismeRoutes;