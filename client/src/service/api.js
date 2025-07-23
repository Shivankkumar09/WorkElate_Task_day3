


import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/response',
});

export const addFormResponse = (payload) => 
  API.post('/add', payload);

export const getFormResponses = (formId) => 
 API.get(`/?formId=${formId}`);