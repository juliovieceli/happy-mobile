import axios from 'axios';

const api = axios.create({
  baseURL: 'http://fcae330d5cc9.ngrok.io',
});

export default api;
