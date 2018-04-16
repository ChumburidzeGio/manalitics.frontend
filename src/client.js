import axios from 'axios'

let getToken = () => {
    const token = localStorage.getItem('access_token');
    return token ? 'Bearer ' + token : false;
};

export default axios.create({
    baseURL: 'http://localhost:90/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken(),
    },
})