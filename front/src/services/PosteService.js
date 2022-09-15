import axios from '../api/Axios';

/**
 * 
 * @returns retourne tous les postes
 */
export const getPostes = async () => {

    return axios.get('poste/all')
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        })
}
