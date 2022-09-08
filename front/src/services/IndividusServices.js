import axios from '../api/Axios';


/**
 * 
 * @returns la liste des individus actifs
 */
export const getActiveIndividus = async () => {

    return axios.get('individu/active')
        .then((res) => {
            return res.data.individus;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}


/**
 * 
 * @returns la liste des individus archivés
 */
export const getArchivedIndividus = async () => {

    return axios.get('individu/archived')
        .then((res) => {
            return res.data.individus;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}
/**
 * 
 * @returns la liste des individus
 */
export const getIndividus = async () => {

    return axios.get('individu/all')
        .then((res) => {
            return res.data.individus;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}

/**
 * 
 * @returns la liste des individus qui n'ont pas de compte utilisateur
 */
export const getIndividusNoUser = async () => {

    return axios.get('individu/no-user')
        .then((res) => {
            return res.data.individus;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}


/**
 * 
 * @returns retourne le individu dont l'id est passé en paramètre
 */
export const getIndividu = async (individu_id) => {

    return axios.get(`individu/${individu_id}`)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });;
}


/**
 * Ajouter un individu
 */
export const addIndividu = async (individu) => {

    return axios.post('individu/store', individu)
        .then((res) => {

            console.log(res.data);
            return res.data;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}


/**
 * Modifier le individu
*/
export const updateIndividu = async (individu, individu_id) => {

    return axios.put(`individu/update/${individu_id}`, individu)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}


/**
 * Archiver le individu
*/
export const archiveIndividu = async (id) => {
    return axios.put(`individu/archive/${id}`)
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
 * Désarchiver le individu
*/
export const restoreIndividu = async (id) => {
    return axios.put(`individu/restore/${id}`)
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
 * @returns retourne les types de individu 
 */
export const getActiveTypeIndividu = async () => {

    return axios.get(`individu/type/all`)
        .then((res) => {
            console.log(res.data);

            return res.data;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });;
}


/**
 * Ajouter un type de individu
 */
export const addTypeIndividu = async (typeIndividu) => {

    return axios.post('individu/type/store', typeIndividu)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}


/**
 * Modifier le type de individu
*/
export const updateTypeIndividu = async (typeIndividu, typeIndividu_id) => {

    return axios.put(`individu/type/update/${typeIndividu_id}`, typeIndividu)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}


/**
 * Archiver le type de individu
*/
export const archiveTypeIndividu = async (id) => {
    return axios.put(`individu/type/archive/${id}`)
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}


/**
 * Désarchiver le type de individu
*/
export const restoreTypeIndividu = async (id) => {
    return axios.put(`individu/type/restore/${id}`)
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}