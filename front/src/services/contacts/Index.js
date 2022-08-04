import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;


/**
 * 
 * @returns la liste des contacts
 */
export const getContacts = () => {

    return axios.get(`${API_URL}/api/contact/all`).then( (res) => {
        
        return res.data.contacts;
        
    }).catch((error) => {
        
        console.log(`erreur: ${error}`);
        return error;
    } )

} 

/**
 * 
 * @returns la liste des contacts qui n'ont pas de compte utilisateur
 */
 export const getContactsNoUser = () => {

    return axios.get(`${API_URL}/api/contact/all/no-user`).then( (res) => {
        
        return res.data.contacts;
        
    }).catch((error) => {
        
        console.log(`erreur: ${error}`);
        return error;
    } )

} 


/**
 * 
 * @returns retourne le contact dont l'id est passé en paramètre
 */
 export const getContact = (contact_id) => {

    return axios.get(`${API_URL}/api/contact/${contact_id}`).then( (res) => {
        
   
        return res.data.contact;
        
    }).catch((error) => {
        
        console.log(`erreur: ${error}`);
        return error;
    } )

} 


/**
 * Ajouter un contact
 */
export const addContact = (contact) => {


    return axios.post(`${API_URL}/api/contact/store`, contact).then( (res) => {
       
        return res.data;
        
    }).catch((error) => {
        
        console.log(`erreur: ${error}`);
        return error;
    } )
}


/**
 * modifier le contact
*/
 export const updateContact = (contact, contact_id) => {


    return axios.put(`${API_URL}/api/contact/update/${contact_id}`, contact).then( (res) => {
    
        return res.data;
        
    }).catch((error) => {
        
        console.log(`erreur: ${error}`);
        return error;
    } )
}