import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';


const RequireAuth = () => {
    const location = useLocation();
    const user = useSelector( (state) => state.auth);

    return (
        user?.status
        ? <Outlet />
        : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth;