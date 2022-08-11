import axios from '../api/Axios';


/**
 * 
 * @returns la liste des contacts actifs
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
 * @returns la liste des contacts archivés
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
 * @returns la liste des contacts
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
 * @returns retourne le contact dont l'id est passé en paramètre
 */
 export const getOrganisme = async (contact_id) => {

    return axios.get(`organisme/${contact_id}`)
    .then( (res) => {
        return res.data.organisme;
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
} 


/**
 * Ajouter un contact
 */
export const addOrganisme = async (contact) => {

    return axios.post('organisme/store', contact)
    .then( (res) => {
        return res.data;
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
}


/**
 * Modifier le contact
*/
 export const updateOrganisme = async (contact, contact_id) => {

    return axios.put(`organisme/update/${contact_id}`, contact)
    .then( (res) => {
        return res.data;
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
}


/**
 * Archiver le contact
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
 * Désarchiver le contact
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