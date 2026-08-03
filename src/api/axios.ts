import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  // baseURL: "https://codebridgeit-superadmin-8xtmzj182-itsmanrpchahals-projects.vercel.app/api/",
  baseURL: "http://localhost:8000/api/",
})

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = `application/json`;
      config.headers["Content-Type"] = `multipart/form-data`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
)

API.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<any>) => {

    const url = error.config?.url;

    // ✅ LOGIN request skip karo
    if (url?.includes("/admin/login")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.error("Session expired, login again");
      window.location.href = "/admin/login";
    }


    return Promise.reject(error);
  }
);


export default API;