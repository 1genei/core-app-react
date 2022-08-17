import axios from '../api/Axios';

/**
 * 
 * @returns retourne les infos de la société
 */
export const getInfos = async () => {

    return axios.get('owner/infos')
        .then((res) => {
            return res.data.owner;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        })
}

/**
 * Modifier la société
*/
export const updateInfos = async (infos) => {

    return axios.put('owner/update', infos)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}