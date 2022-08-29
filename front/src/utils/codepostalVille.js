import axios from 'axios';

const CodepostalVille = () => {

    return axios.get("http://localhost:3000/datas/codepostal_ville.json").then(res => {

        return res.data;
    })

}

export default CodepostalVille;