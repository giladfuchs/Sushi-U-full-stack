import axios from "axios";
import { localAddress, productionAddress } from "./apiAddress";
const instance = axios.create({
  baseURL: localAddress,
  // baseURL: productionAddress,
  headers: {
    "Access-Control-Allow-Origin": true,
    token: "" + localStorage.getItem("token"),

  },
});

export default instance;
