import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8017/api',
    timeout: 6000,
  });

  api.interceptors.request.use(function (config: AxiosRequestConfig) {
    const token = localStorage.getItem("userToken") 
    const multipart = localStorage.getItem("multipart") 

    if (token) {
      config.headers!.Authorization = `Token ${token}`
    }

    if(multipart == "true"){
      config.headers!['Content-Type'] = "multipart/form-data";
      localStorage.setItem("multipart", "false")
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

export default api