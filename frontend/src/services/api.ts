import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333/',
});

export const getFields = () => api.get('/campos');

export const createField = (data: { name: string; datatype: string }) => api.post('/campos', data);

export const getFills = () => api.get('/preenchimentos');

export const createFill = (data: { fieldId: string; value: string | number | boolean }) => api.post('/preenchimentos', data);

export default api;