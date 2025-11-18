import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";

const client = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de requisição - adiciona token automaticamente
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta - trata erros globalmente
client.interceptors.response.use(
  (response) => response,
  (error) => {
    // Erro 401 - Não autorizado
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      
      // Só redireciona se não estiver na página de login
      if (!window.location.pathname.includes('/login')) {
        window.location.href = "/login";
        toast.error("Sessão expirada. Faça login novamente.");
      }
    }
    
    // Não mostra toast para outros erros, deixa o componente tratar
    return Promise.reject(error);
  }
);

export default client;
