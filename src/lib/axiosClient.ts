import axios, {type AxiosError } from "axios";


const axiosClient = axios.create({
  baseURL:"http://127.0.0.1:4010/api/",
});

axiosClient.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  // config.headers.Authorization = `Bearer ${token || ""}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error:AxiosError) => {
    
    if (error.status === 401) {
      // localStorage.removeItem("token");
  //  typeof window !== "undefined" && window.location.reload();
    } else if (error.status === 404) {
      //Show not found
    }

    throw error;
  }
);

export default axiosClient;
