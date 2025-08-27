import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL: string = process.env.REACT_APP_BASE_URL || 'https://jsonplaceholder.typicode.com/posts';
// const BASE_URL = process.env.REACT_APP_BASE_URL || `${window.origin}/api`;

console.log(BASE_URL, 'line 6');

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use(
  (config:any) => {
    const token = localStorage.getItem('authToken');
    // Parse token if stored as JSON string
    const parsedToken: string | null = token ? JSON.parse(token) : null;

    if (parsedToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${parsedToken}`,
      };
    }
    return config;
  },
  (error:any) => Promise.reject(error)
);

// API method types
const get = <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return apiClient.get<T>(url, config);
};

const _delete = <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return apiClient.delete<T>(url, config);
};

const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return apiClient.put<T>(url, data, config);
};

const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return apiClient.post<T>(url, data, config);
};

// Export API methods
export { get, post, put, _delete };
