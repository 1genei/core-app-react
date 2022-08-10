import async from "../components/Async";

import DashboardLayout from "../layouts/Dashboard";
import Blank from "../pages/pages/Blank";
import Profile from "../pages/profile";
import EditProfile from "../pages/profile/Edit";
import Parametres from "../pages/settings";
import RequireAuth from './middlewares/RequireAuth';

const Analytics = async(() => import("../pages/dashboards/Analytics"));
const DataGrid = async(() => import("../pages/tables/DataGrid"));


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
                    path: 'blank',
                    element: <Blank />
                },
                {
                    path: 'liste',
                    element: <DataGrid />
                },
                {
                    path:'profile',
                    children: [
                        {
                            path: '',
                            element: <Profile />
                        },
                        {
                            path: 'edit',
                            element: <EditProfile />
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