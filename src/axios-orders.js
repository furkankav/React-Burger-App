import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-e4af5.firebaseio.com/'
});

export default instance;