import { Outlet } from "react-router-dom";
import DashboardLayout from "../layouts/Dashboard";
import Individus from "../pages/individus/Index";
import ArchiveIndividu from '../pages/individus/ArchiveIndividu';
import CreateIndividu from "../pages/individus/CreateIndividu"
import EditIndividu from "../pages/individus/EditIndividu";
import InfoIndividu from "../pages/individus/InfoIndividu";
import RequirePermission from './middlewares/RequirePermission';
import RequireAuth from "./middlewares/RequireAuth";
import TypeIndividu from "../pages/individus/TypeIndividu";

const IndividuRoutes = {
    path: '/',
    element: <RequireAuth />,
    children: [
        {
            element: <DashboardLayout />,
            children: [
                {
                    element: <RequirePermission permission={'View-Individu'} />,
                    children: [
                        {
                            path: "individus",
                            element: <Outlet />,
                            children: [
                                {
                                    path: '',
                                    element: <Individus />
                                },
                                {
                                    path: 'archives',
                                    element: <ArchiveIndividu />
                                },
                                {
                                    path: 'types',
                                    element: <TypeIndividu />,

                                }

                            ]
                        }
                    ]
                },
                {
                    path: 'individu',
                    element: <Outlet />,
                    children: [
                        {
                            path: "info/:id",
                            element: <RequirePermission permission={'View-Individu'} />,
                            children: [
                                {
                                    path: '',
                                    element: <InfoIndividu />,
                                }
                            ]
                        },
                        {
                            path: "ajouter",
                            element: <RequirePermission permission={'Add-Individu'} />,
                            children: [
                                {
                                    path: '',
                                    element: <CreateIndividu />,
                                }
                            ]
                        },
                        {
                            path: "modifier/:id",
                            element: <RequirePermission permission={'Edit-Individu'} />,
                            children: [
                                {
                                    path: '',
                                    element: <EditIndividu />,
                                }
                            ]
                        },
                    ]
                }
            ]
        }
    ]
};

export default IndividuRoutes;