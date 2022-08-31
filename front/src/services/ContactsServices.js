import axios from '../api/Axios';




/**
 * 
 * @returns la liste des contacts actifs
 */
export const getActiveContacts = async () => {

    return axios.get('contact/active')
        .then((res) => {
            return res.data.contacts;
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
export const getArchivedContacts = async () => {

    return axios.get('contact/archived')
        .then((res) => {
            return res.data.contacts;
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
export const getContacts = async () => {

    return axios.get('contact/all')
        .then((res) => {
            return res.data.contacts;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}

/**
 * 
 * @returns la liste des contacts qui n'ont pas de compte utilisateur
 */
export const getContactsNoUser = async () => {

    return axios.get('contact/no-user')
        .then((res) => {
            return res.data.contacts;
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
export const getContact = async (contact_id) => {

    return axios.get(`contact/${contact_id}`)
        .then((res) => {
            return res.data.contact;
        });
}


/**
 * Ajouter un contact
 */
export const addContact = async (contact) => {

    return axios.post('contact/store', contact)
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
 * Modifier le contact
*/
export const updateContact = async (contact, contact_id) => {

    return axios.put(`contact/update/${contact_id}`, contact)
        .then((res) => {
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
export const archiveContact = async (id) => {
    return axios.put(`contact/archive/${id}`)
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
 * Désarchiver le contact
*/
export const restoreContact = async (id) => {
    return axios.put(`contact/restore/${id}`)
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
 * @returns retourne les types de contact 
 */
export const getActiveTypeContact = async () => {

    return axios.get(`contact/type/all`)
        .then((res) => {

            return res.data.typeContacts;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });;
}


/**
 * Ajouter un type de contact
 */
export const addTypeContact = async (typeContact) => {

    return axios.post('contact/type/store', typeContact)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}


/**
 * Modifier le type de contact
*/
export const updateTypeContact = async (typeContact, typeContact_id) => {

    return axios.put(`contact/type/update/${typeContact_id}`, typeContact)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}


/**
 * Archiver le type de contact
*/
export const archiveTypeContact = async (id) => {
    return axios.put(`contact/type/archive/${id}`)
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}


/**
 * Désarchiver le type de contact
*/
export const restoreTypeContact = async (id) => {
    return axios.put(`contact/type/restore/${id}`)
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });
}