import { Outlet } from "react-router-dom";
import DashboardLayout from "../layouts/Dashboard";
import RequirePermission from './middlewares/RequirePermission';
import RequireAuth from "./middlewares/RequireAuth";
import Utilisateurs from "../pages/utilisateurs/Index";
import ArchiveUtilisateur from '../pages/utilisateurs/ArchiveUtilisateur';
import CreateUtilisateur from "../pages/utilisateurs/CreateUtilisateur";
import EditUtilisateur from "../pages/utilisateurs/EditUtilisateur";
import ProfilUtilisateur from "../pages/utilisateurs/ProfilUtilisateur";


const UserRoutes = {
    path: '/',
    element: <RequireAuth />,
    children: [
        {
            element: <DashboardLayout />,
            children: [
                {
                    element: <RequirePermission permission={'View-Users'} />,
                    children: [
                        {
                            path: "utilisateurs",
                            element: <Outlet />,
                            children: [
                                {
                                    path: 'actifs',
                                    element: <Utilisateurs />
                                },
                                {
                                    path: 'archives',
                                    element: <ArchiveUtilisateur />
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'utilisateur',
                    element: <Outlet />,
                    children: [
                        {
                            path: "info/:id",
                            element: <RequirePermission permission={'View-Users'} />,
                            children: [
                                {
                                    path: '',
                                    element: <ProfilUtilisateur />,
                                }
                            ] 
                        },
                        {
                            path: "ajouter",
                            element: <RequirePermission permission={'Add-User'} />,
                            children: [
                                {
                                    path: '',
                                    element: <CreateUtilisateur />,
                                }
                            ] 
                        },
                        {
                            path: "modifier/:id",
                            element: <RequirePermission permission={'Edit-User'} />,
                            children: [
                                {
                                    path: '',
                                    element: <EditUtilisateur />,
                                }
                            ] 
                        },
                    ]
                }
            ]
        }
    ]
};

export default UserRoutes;