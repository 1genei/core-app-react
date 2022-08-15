import CryptoJS from 'crypto-js';




export const encrypt = (value) => {

    // btoa(), quant à elle, permet de créer une chaîne ASCII en base64 à partir d'une « chaîne » de données binaires.
    return window.btoa(value);
    return CryptoJS.SHA256.encrypt(value, 'no-secret').toString();
}

export const decrypt = (cryptedValue) => {

    // atob() permet de décoder des données encodées en une chaîne de caractères en base 64
    return window.atob(cryptedValue);

    return CryptoJS.SHA256.decrypt(cryptedValue, 'no-secret').toString(CryptoJS.enc.Utf8);
}