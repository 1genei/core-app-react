import axios from '../api/Axios';


/**
 * 
 * @returns la liste des users
 */
export const getUtilisateurs = async () => {

    return axios.get('user/all')
    .then( (res) => {
        return res.data.users;
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
}

/**
 * 
 * @returns retourne le user dont l'id est passé en paramètre
 */
 export const getUtilisateur = async (user_id) => {

    return axios.get(`user/${user_id}`)
    .then( (res) => {
        return res.data.user;
    })
    .catch((error) => {   
        console.log(`erreur: ${error}`);
        return error;
    });
} 


/**
 * Ajouter un user
 */
export const addUtilisateur = async (user) => {

    return axios.post('auth/register', user)
    .then( (res) => {
    console.log(res.data);
        return res.data; 
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
}

/**
 * retourne tous les rôles
 */
 export const getRoles = async () => {

    return axios.get('auth/get-roles').then( (res) => {
        return res.data;
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
}
