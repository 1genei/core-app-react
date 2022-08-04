import AuthLayout from "../layouts/Auth";

import Page404 from "../pages/auth/Page404";
import Page401 from "../pages/auth/Page401";



const ErrorRoutes = {
    path: '/',
    element: <AuthLayout />,
    children: [
        {
            path: 'unauthorized',
            element: <Page401 />
        },
        {
            path: "*",
            element: <Page404 />
        }
    ]
};

export default ErrorRoutes;