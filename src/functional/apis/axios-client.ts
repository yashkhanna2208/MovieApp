import axios from 'axios';
import Config from 'react-native-config';

const axiosClient = axios.create({
  baseURL: Config.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Added token without condition in the header because we are directly picking it from env
axiosClient.interceptors.request.use(
  config => {
    const token = Config.TOKEN;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error),
);

export default axiosClient;
