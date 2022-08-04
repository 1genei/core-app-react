import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;


/**
 * 
 * @returns la liste des users
 */
export const getUtilisateurs = () => {

    return axios.get(`${API_URL}/api/user/all`).then( (res) => {
        
        // var users = res.data.users.map(user => {
        
        //         return {
        //             "id": user.id,
        //             "nom": user.nom,
        //             "email": user.email,
        //             "age": user.age,
        //         }
      
        
        // })
        // return users;
        
        return res.data.users;
        
    }).catch((error) => {
        
        console.log(`erreur: ${error}`);
        return error;
    } )

} 

      // var user_id = await encrypt(`${cellValues.id}`);
      // console.log(user_id);


/**
 * 
 * @returns retourne le user dont l'id est passé en paramètre
 */
 export const getUtilisateur= (user_id) => {

    return axios.get(`${API_URL}/api/user/${user_id}`).then( (res) => {
        
   
        return res.data.user;
        
    }).catch((error) => {
        
        console.log(`erreur: ${error}`);
        return error;
    } )

} 


/**
 * Ajouter un user
 */
export const addUtilisateur= (user) => {


    return axios.post(`${API_URL}/api/auth/register`, user).then( (res) => {
       
        return res.data;
        
    }).catch((error) => {
        
        console.log(`erreur: ${error}`);
        return error;
    } )
}

/**
 * retourne tous les rôles
 */
 export const getRoles= () => {


    return axios.get(`${API_URL}/api/auth/get-roles`).then( (res) => {
       
        return res.data;
        
    }).catch((error) => {
        
        console.log(`erreur: ${error}`);
        return error;
    } )
}
