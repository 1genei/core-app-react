import axios from '../api/Axios';


/**
 * 
 * @returns la liste des organismes actifs
 */
export const getActiveOrganismes = async () => {

    return axios.get('organisme/active')
        .then((res) => {
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
        .then((res) => {
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
        .then((res) => {
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
        .then((res) => {
            return res.data;
        });
}


/**
 * Ajouter un organisme
 */
export const addOrganisme = async (organisme) => {

    return axios.post('organisme/store', organisme)
        .then((res) => {
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
        .then((res) => {
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
        .then((res) => {
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
        .then((res) => {
            console.log(res.data);
            return res.data
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}

/**
 * 
 * @returns retourne les types d'organisme 
 */
export const getActiveTypeOrganisme = async () => {

    return axios.get(`organisme/type/all`)
        .then((res) => {

            return res.data.typeOrganismes;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });;
}


/**
 * Ajouter un type d'organisme
 */
export const addTypeOrganisme = async (typeOrganisme) => {

    return axios.post('organisme/type/store', typeOrganisme)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}


/**
 * Modifier le type d'organisme
*/
export const updateTypeOrganisme = async (typeOrganisme, typeOrganisme_id) => {

    return axios.put(`organisme/type/update/${typeOrganisme_id}`, typeOrganisme)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}


/**
 * Archiver le type d'organisme
*/
export const archiveTypeOrganisme = async (id) => {
    return axios.put(`organisme/type/archive/${id}`)
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}


/**
 * Désarchiver le type d'organisme
*/
export const restoreTypeOrganisme = async (id) => {
    return axios.put(`organisme/type/restore/${id}`)
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}