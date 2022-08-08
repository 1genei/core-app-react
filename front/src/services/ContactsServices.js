import axios from '../api/Axios';

/**
 * 
 * @returns la liste des contacts
 */
export const getContacts = async () => {

    return axios.get('contact/all')
    .then( (res) => {
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
    .then( (res) => {
        console.log(res.data);
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
    .then( (res) => {
        return res.data.contact;
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
} 


/**
 * Ajouter un contact
 */
export const addContact = async (contact) => {

    return axios.post('contact/store', contact)
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
 export const updateContact = async (contact, contact_id) => {

    return axios.put(`contact/update/${contact_id}`, contact)
    .then( (res) => {
        return res.data;
    })
    .catch((error) => {
        console.log(`erreur: ${error}`);
        return error;
    });
}