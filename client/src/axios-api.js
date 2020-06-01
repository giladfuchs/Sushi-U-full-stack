import axios from "axios";
import { localAddress, productionAddress } from "./apiAddress";
const instance = axios.create({
  // baseURL: localAddress,
  baseURL: productionAddress,
  headers: {
    "Access-Control-Allow-Origin": true,
    "Access-Control-Allow-Headers": " ",
    // token: "" + localStorage.getItem("token"),

  },
});
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["token"] = '' + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;
