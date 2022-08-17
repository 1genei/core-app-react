import RequireNotAuth from './middlewares/RequireNotAuth';


import AuthLayout from "../layouts/Auth";
import SignIn from "../pages/auth/SignIn";
import ResetPassword from "../pages/auth/ResetPassword";

const GuestRoutes = {
    path: '/',
    element: <RequireNotAuth />,
    children: [
        {
            element: <AuthLayout />,
            children: [
                {
                    path: "login",
                    element: <SignIn />,
                },
                {
                    path: "reset-password",
                    element: <ResetPassword />,
                },
            ]
        }
    ]
};

export default GuestRoutes;