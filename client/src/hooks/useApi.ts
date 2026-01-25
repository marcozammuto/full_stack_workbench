import axios from "axios";
import { useBackend } from "../context/BackendContext";

export const useApi = () => {
  const { backend } = useBackend();

  const api = axios.create({
    baseURL: backend?.endpoint,
    withCredentials: true,
    // headers: { "Access-Control-Allow-Origin": "*" },
  });
  return api;
};
