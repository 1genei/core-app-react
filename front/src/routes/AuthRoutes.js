import RequireAuth from './middlewares/RequireAuth';
import ProtectedPage from "../pages/protected/ProtectedPage";

import DashboardLayout from "../layouts/Dashboard";

const AuthRoutes = {
    path: '/',
    element: <DashboardLayout />,
    children: [
        {
            element: <RequireAuth permission={'Private'} />,
            children: [
                {
                    path:'private',
                    element: <ProtectedPage />
                }
            ]
        }
    ]
};

export default AuthRoutes;