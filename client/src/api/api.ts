import axios, { AxiosInstance } from "axios";

export let BASE_URL: string = "";

export let BASE_URL_SOCKET_SERVER: string = "";

const IS_PROD: boolean = true;

if (IS_PROD) {
  BASE_URL = "/api/";
  BASE_URL_SOCKET_SERVER = "https://server-codecollaborateapi.onrender.com";
} else {
  BASE_URL = "http://localhost:8080/api/";
  BASE_URL_SOCKET_SERVER = "http://localhost:8080";
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const executeCodeApi = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});
