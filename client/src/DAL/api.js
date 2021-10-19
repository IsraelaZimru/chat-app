import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `http://localhost:5000`;
axios.defaults.headers['Access-Control-Allow-Origin'] = `http://localhost:5000`;



export const checkLoginAccess = async ({ email, password }) => {
    const result = await axios.post('/users/login', { email, password });
    return result.data;
}


export const addNewUser = async (details) => {
    const response = await axios.post(`/users/signup`, details);
    return response.data;
}

export const getRooms = async () => {
    const response = await axios(`/rooms`);
    return response.data;
}

export const getRoomData = async (id) => {
    const response = await axios(`/rooms/${id}`);
    return response.data;
}


export const isUserLogin = async () => {
    const response = await axios(`/users`);
    return response.data;
}