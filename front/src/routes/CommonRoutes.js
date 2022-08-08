import async from "../components/Async";

import DashboardLayout from "../layouts/Dashboard";
import Blank from "../pages/pages/Blank";
import ProtectedPage from "../pages/protected/ProtectedPage";
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
                    element: <ProtectedPage />
                }
            ]
        }
    ]
};

export default CommonRoutes;