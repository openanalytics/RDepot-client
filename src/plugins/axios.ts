import axios, { AxiosRequestConfig } from "axios";
import { updateToken } from "./keycloak";

const api = axios.create({
    baseURL: 'http://localhost:8017/api',
    timeout: 6000,
  });

  api.interceptors.request.use(function (config: AxiosRequestConfig) {let token = localStorage.getItem("userToken") 
    const multipart = localStorage.getItem("multipart")

    if (token) {
      config.headers!.Authorization = `Token ${token}`
    } else{
      // updateToken();
      token = localStorage.getItem('vue-token');
      config.headers!.Authorization = `Token ${token}`;
    }

    config.headers!.AccessControlAllowOrigin = '*'

    if(multipart == "true"){
      config.headers!['Content-Type'] = "multipart/form-data";
      localStorage.setItem("multipart", "false")
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

export default api