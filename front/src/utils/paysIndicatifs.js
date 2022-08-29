import Axios from "../api/Axios";

const PaysIndicatifs = () => {

    return Axios.get(`get-pays`)
        .then((res) => {
            return res.data.pays;
        })
        .catch((error) => {
            console.log(`erreur: ${error}`);
            return error;
        });

}

export default PaysIndicatifs;