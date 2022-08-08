import axios from '../api/Axios';


/**
 * 
 * @returns la liste des users
 */
export const getActiveUsers = async () => {

    return axios.get('utilisateur/active')
    .then( (res) => {
        return res.data.utilisateurs;
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
}

export const getArchivedUsers = async () => {

    return axios.get('utilisateur/archived')
    .then( (res) => {
        return res.data.utilisateurs;
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

    return axios.get(`utilisateur/${user_id}`)
    .then( (res) => {
        return res.data.utilisateur;
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

    return axios.get('auth/get-roles')
    .then( (res) => {
        return res.data;
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
}

export const archiveUser = async (id) => {
    return axios.put(`utilisateur/archive/${id}`)
    .then( (res) => {
        return res.data
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
}