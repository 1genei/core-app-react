import RequireNotAuth from './middlewares/RequireNotAuth';


import AuthLayout from "../layouts/Auth";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";

const GuestRoutes = {
    path: '/',
    element: <AuthLayout />,
    children: [
        {
            element: <RequireNotAuth />,
            children: [
                {
                    path: "login",
                    element: <SignIn />,
                  },
                  {
                    path: "register",
                    element: <SignUp />,
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