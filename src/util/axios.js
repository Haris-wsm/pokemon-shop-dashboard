import axios from "axios";

const ApiReq = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_DOMAIN,
  withCredentials: true,
});

export default ApiReq;
