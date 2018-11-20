import axios from 'axios';


const api = axios.create({
    baseURL: 'https://apitwitterclone.herokuapp.com'
});

export default api;