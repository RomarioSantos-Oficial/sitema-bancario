import React, { createContext, useContext, useState, useEffect } from "react";
import client from "../api/client";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      console.log('🔍 Carregando dados do usuário...');
      const { data } = await client.get("/users/me");
      console.log('✅ Usuário carregado:', data);
      setUser(data);
    } catch (error) {
      console.error('❌ Erro ao carregar usuário:', error);
      localStorage.removeItem("access_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (cpf, senha) => {
    try {
      console.log('🔐 Tentando fazer login...');
      
      // O backend espera "login" (não "cpf")
      const { data } = await client.post("/auth/login", { 
        login: cpf, 
        senha 
      });
      
      console.log('✅ Login bem-sucedido, token recebido');
      
      if (!data.access_token) {
        throw new Error('Token não recebido do servidor');
      }
      
      localStorage.setItem("access_token", data.access_token);
      
      // Carrega dados do usuário
      await loadUser();
      
      toast.success("Login realizado com sucesso!");
      return data;
    } catch (error) {
      console.error('❌ Erro no login:', error);
      
      // Remove token se houver erro
      localStorage.removeItem("access_token");
      
      // Extrai mensagem de erro
      let errorMessage = 'Erro ao fazer login';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (Array.isArray(errorData.detail)) {
          errorMessage = errorData.detail.map(e => e.msg).join(', ');
        } else if (typeof errorData.detail === 'string') {
          errorMessage = errorData.detail;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await client.post("/users/", userData);
      toast.success("Cadastro realizado! Faça login para continuar.");
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    toast.info("Logout realizado");
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
