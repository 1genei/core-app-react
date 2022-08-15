import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';


const RequireNotAuth = () => {
    const location = useLocation();
    const user = useSelector((state) => state.auth);

    return (
        user?.status
            ? <Navigate to='/' state={{ from: location }} replace />
            : <Outlet />
    )
}

export default RequireNotAuth;