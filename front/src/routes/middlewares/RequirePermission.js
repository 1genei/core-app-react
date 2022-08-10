import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';


const RequirePermission = ({ permission }) => {
    const location = useLocation();
    const user = useSelector( (state) => state.auth);

    return (
        user?.permissions.includes(permission)
            ? <Outlet />
            : <Outlet />
            
            // user?.status
            //     ? <Navigate to='/unauthorized' state={{ from: location }} replace />
            //     : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequirePermission;