import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

instance.interceptors.response.use((response) => {
  return response.data;
});

export default instance;
