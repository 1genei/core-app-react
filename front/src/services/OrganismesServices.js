import axios from '../api/Axios';


/**
 * 
 * @returns la liste des organismes actifs
 */
 export const getActiveOrganismes = async () => {

    return axios.get('organisme/active')
    .then( (res) => {
        return res.data.organismes;
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
}


/**
 * 
 * @returns la liste des organismes archivés
 */
 export const getArchivedOrganismes = async () => {

    return axios.get('organisme/archived')
    .then( (res) => {
        return res.data.organismes;
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
}
/**
 * 
 * @returns la liste des organismes
 */
export const getOrganismes = async () => {

    return axios.get('organisme/all')
    .then( (res) => {
        return res.data.organismes;
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
}


/**
 * 
 * @returns retourne l'organisme dont l'id est passé en paramètre
 */
 export const getOrganisme = async (organisme_id) => {

    return axios.get(`organisme/${organisme_id}`)
    .then( (res) => {
        return res.data.organisme;
    });
} 


/**
 * Ajouter un organisme
 */
export const addOrganisme = async (organisme) => {

    return axios.post('organisme/store', organisme)
    .then( (res) => {
        return res.data;
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
}


/**
 * Modifier l'organisme
*/
 export const updateOrganisme = async (organisme, organisme_id) => {

    return axios.put(`organisme/update/${organisme_id}`, organisme)
    .then( (res) => {
        return res.data;
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
}


/**
 * Archiver l'organisme
*/
export const archiveOrganisme = async (id) => {
    return axios.put(`organisme/archive/${id}`)
    .then( (res) => {
    console.log(res.data);
        return res.data
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
}


/**
 * Désarchiver l'organisme
*/
export const restoreOrganisme = async (id) => {
    return axios.put(`organisme/restore/${id}`)
    .then( (res) => {
    console.log(res.data);
        return res.data
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
}