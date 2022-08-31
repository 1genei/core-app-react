import { Outlet } from "react-router-dom";
import DashboardLayout from "../layouts/Dashboard";
import Contacts from "../pages/contacts/Index";
import ArchiveContact from '../pages/contacts/ArchiveContact';
import CreateContact from "../pages/contacts/CreateContact"
import EditContact from "../pages/contacts/EditContact";
import InfoContact from "../pages/contacts/InfoContact";
import RequirePermission from './middlewares/RequirePermission';
import RequireAuth from "./middlewares/RequireAuth";
import TypeContact from "../pages/contacts/TypeContact";

const ContactRoutes = {
    path: '/',
    element: <RequireAuth />,
    children: [
        {
            element: <DashboardLayout />,
            children: [
                {
                    element: <RequirePermission permission={'View-Contacts'} />,
                    children: [
                        {
                            path: "contacts",
                            element: <Outlet />,
                            children: [
                                {
                                    path: 'actifs',
                                    element: <Contacts />
                                },
                                {
                                    path: 'archives',
                                    element: <ArchiveContact />
                                },
                                {
                                    path: 'types',
                                    element: <TypeContact />,

                                }

                            ]
                        }
                    ]
                },
                {
                    path: 'contact',
                    element: <Outlet />,
                    children: [
                        {
                            path: "info/:id",
                            element: <RequirePermission permission={'View-Contacts'} />,
                            children: [
                                {
                                    path: '',
                                    element: <InfoContact />,
                                }
                            ]
                        },
                        {
                            path: "ajouter",
                            element: <RequirePermission permission={'Add-Contact'} />,
                            children: [
                                {
                                    path: '',
                                    element: <CreateContact />,
                                }
                            ]
                        },
                        {
                            path: "modifier/:id",
                            element: <RequirePermission permission={'Edit-Contact'} />,
                            children: [
                                {
                                    path: '',
                                    element: <EditContact />,
                                }
                            ]
                        },
                    ]
                }
            ]
        }
    ]
};

export default ContactRoutes;