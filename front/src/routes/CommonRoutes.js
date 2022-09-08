import async from "../components/Async";

import DashboardLayout from "../layouts/Dashboard";
import Profile from "../pages/profile";
import Parametres from "../pages/settings";
import RequireAuth from './middlewares/RequireAuth';

const Analytics = async(() => import("../pages/dashboards/Analytics"));


const CommonRoutes = {
    path: '/',
    element: <RequireAuth />,
    children: [
        {
            element: <DashboardLayout />,
            children: [
                {
                    path: '',
                    element: <Analytics />
                },

                {
                    path: 'profil',
                    children: [
                        {
                            path: '',
                            element: <Profile />
                        }
                    ]
                },
                {
                    path: 'parametres',
                    element: <Parametres />
                }
            ]
        }
    ]
};

export default CommonRoutes;