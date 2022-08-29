import axios from '../api/Axios';


export const RegisterAPI = async (newUser) => {
    return axios.post('auth/register', newUser, { headers: { 'Content-Type': 'application/json' } });
}

export const LoginAPI = async (loginUser) => {
    return axios.post('auth/login', loginUser, { withCredentials: true })
        .then((res) => {
            const name = res?.data?.name?.prenom + ' ' + res?.data?.name?.nom;
            const email = res?.data?.user?.email;
            const user = res?.data?.user;
            const created_at = res?.data?.user?.created_at;
            const permissions = res?.data?.permissionsName;
            return { name, email, user, created_at, permissions };
        });
}

export const LogoutAPI = async () => {
    return axios.post('auth/logout', {}, { withCredentials: true });
}


/**
* retourne les rôles et permissions et les groupes de permissions
*/
export const getRolesPermissions = () => {

    return axios.get('auth/get-roles-permissions')
        .then((res) => {
            return res.data;

        })
        .catch((error) => {

            console.log(`erreur: ${error}`);
            return error;
        })
}

/**
* modifier les les permissions des roles
*/

export const updateRolesPermissions = (permissionRoleChecked) => {

    return axios.put('auth/update-roles-permissions', permissionRoleChecked)
        .then((res) => {
            return res.data;

        })
        .catch((error) => {

            console.log(`erreur: ${error}`);
            return error;
        })
}



/**
* retourne  permissions de l'utilisateur
*/
export const getUserPermissions = (user_id) => {

    return axios.get('auth/get-user-permissions/' + user_id)
        .then((res) => {
            return res.data;

        })
        .catch((error) => {

            console.log(`erreur: ${error}`);
            return error;
        })
}

/**
* modifier les permissions de de l'utilisateur
*/

export const updateUserPermissions = (permissionUserChecked, user_id) => {


    return axios.put('auth/update-user-permissions/' + user_id, permissionUserChecked)
        .then((res) => {
            return res.data;

        })
        .catch((error) => {

            console.log(`erreur: ${error}`);
            return error;
        })
}
