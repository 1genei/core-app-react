import { Typography } from '@mui/material';
import React from 'react'


/** 
* Prend en paramètres un objet d'erreurs qui viennent du errors validator laravel et les retourne sous forme de chaine de caractère  
*/
export const validatorErrors = (errors) => {
    
    var validateErr = [];

    for(const champ in errors){                
        errors[champ].map( error => {
            validateErr.push(<Typography variant="h6" > {error}  </Typography> )
        })
    }
    
    return validateErr;
}
