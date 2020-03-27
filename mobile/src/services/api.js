import axios from 'axios';

const api = axios.create({

    baseURL: 'http://192.168.10.113:3333'

});

export default api;