import axios from "axios";

const instense = axios.create({
    baseURL : "https://api.themoviedb.org/3"
});

export default instense;