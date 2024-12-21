import axios, { AxiosInstance } from "axios";

export const BASE_URL: string = "http://localhost:8080/api/";

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
