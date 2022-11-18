import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8017/api',
    timeout: 6000,
  });

  api.interceptors.request.use(function (config: AxiosRequestConfig) {
    const multipart = localStorage.getItem("multipart")
    let token = null;

    if (token) {
      config.headers!.Authorization = `Token ${token}`
    } else{
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
