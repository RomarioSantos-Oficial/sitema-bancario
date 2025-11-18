# 🏦 Banco Vectra - Frontend

Sistema bancário completo com interface web moderna para consumir a API do Banco Vectra.

## 📋 Visão Geral

Frontend completo de um banco digital com:
- Login e autenticação JWT
- Dashboard com visão geral das contas
- Gerenciamento de múltiplas contas (6 tipos)
- Transações: Saque, Depósito, PIX e Transferências
- Extrato com filtros por data e tipo
- Interface responsiva e moderna

## 🚀 Stack Tecnológica

- **Vite + React** - Build tool e framework
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **React Query** - Gerenciamento de estado servidor
- **Tailwind CSS** - Estilização
- **React Hook Form** - Formulários
- **date-fns** - Manipulação de datas
- **react-toastify** - Notificações

## 🛠️ Instalação e Configuração

### 1. Criar o projeto

```bash
# Criar app com Vite (template React)
npm create vite@latest . -- --template react

# Instalar dependências principais
npm install

# Instalar bibliotecas necessárias
npm install axios react-router-dom @tanstack/react-query
npm install react-hook-form date-fns react-toastify
npm install js-cookie

# Instalar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configurar variáveis de ambiente

Criar arquivo `.env` na raiz:

```env
VITE_API_URL=http://127.0.0.1:8000/api/v1
```

### 3. Configurar Tailwind CSS

Editar `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#3B82F6',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
      }
    },
  },
  plugins: [],
}
```

Adicionar no `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-primary hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded transition;
  }
  
  .btn-secondary {
    @apply bg-secondary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition;
  }
  
  .input {
    @apply w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none;
  }
  
  .card {
    @apply bg-white shadow-md rounded-lg p-6;
  }
}
```

## 📁 Estrutura de Pastas

```
Frontend/
├── public/
├── src/
│   ├── api/
│   │   └── client.js              # Axios instance com interceptors
│   ├── auth/
│   │   ├── AuthContext.jsx        # Context de autenticação
│   │   └── ProtectedRoute.jsx     # Componente de rota protegida
│   ├── components/
│   │   ├── Header.jsx             # Cabeçalho do site
│   │   ├── Sidebar.jsx            # Menu lateral
│   │   ├── AccountCard.jsx        # Card de conta
│   │   ├── TransactionCard.jsx    # Card de transação
│   │   ├── CreateAccountModal.jsx # Modal criar conta
│   │   └── TransactionModal.jsx   # Modal de transações
│   ├── hooks/
│   │   ├── useAccounts.js         # Hook para contas
│   │   ├── useTransactions.js     # Hook para transações
│   │   └── useUser.js             # Hook para usuário
│   ├── pages/
│   │   ├── Home.jsx               # Landing page
│   │   ├── Login.jsx              # Tela de login
│   │   ├── Register.jsx           # Cadastro de usuário
│   │   ├── Dashboard.jsx          # Dashboard principal
│   │   ├── Accounts.jsx           # Gerenciar contas
│   │   ├── Transactions.jsx       # Fazer transações
│   │   └── Extract.jsx            # Extrato bancário
│   ├── utils/
│   │   ├── formatters.js          # Formatação de CPF, moeda, data
│   │   └── validators.js          # Validações
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🔐 Fluxo de Autenticação

1. **Cadastro**: Usuário cria conta com CPF, dados pessoais e senha
2. **Login**: Autentica com CPF + senha (retorna JWT token)
3. **Token JWT**: Armazenado em localStorage e enviado em todas requisições
4. **Rotas Protegidas**: Verificam token antes de renderizar conteúdo
5. **Logout**: Remove token e redireciona para login

## 🎯 Funcionalidades do Frontend

### Páginas Públicas

#### Home (Landing Page)
- Apresentação do Banco Vectra
- Informações sobre tipos de conta
- Botões para Login e Cadastro

#### Login
- Campo CPF (formatado: 000.000.000-00)
- Campo Senha
- Validação de formulário
- Mensagens de erro claras

#### Cadastro
- Nome completo
- CPF (validado)
- Data de nascimento (formato DD/MM/AAAA)
- Email
- Telefone
- Endereço
- Senha (mínimo 6 caracteres)
- Cria automaticamente uma conta corrente

### Páginas Privadas (Autenticadas)

#### Dashboard
- **Resumo Financeiro**
  - Saldo total de todas as contas
  - Número de contas ativas
  - Últimas transações
- **Ações Rápidas**
  - Botões: Depositar, Sacar, Transferir, PIX

#### Minhas Contas
- **Listagem de Contas**
  - Card para cada conta (tipo, agência, número, saldo)
  - Indicador de conta ativa/inativa
- **Criar Nova Conta**
  - Modal com seleção de tipo
  - Validação de idade automática
  - Regras de cada tipo de conta exibidas

#### Transações
- **Abas por Tipo**
  - Depósito
  - Saque (limite diário)
  - PIX (chave = número da conta)
  - Transferência Interna
- **Formulários Específicos**
  - Seleção de conta origem
  - Valor (formatado em R$)
  - Conta destino (PIX/Transferência)
  - Descrição opcional
- **Validações em Tempo Real**
  - Saldo disponível
  - Limite de saque diário
  - Formato de valor

#### Extrato
- **Filtros**
  - Período (data início/fim)
  - Tipo de transação
  - Conta específica
- **Listagem**
  - Data e hora (DD/MM/AAAA HH:MM:SS)
  - Tipo (badge colorido)
  - Descrição
  - Valor (positivo verde, negativo vermelho)
  - Conta destino (se aplicável)
- **Paginação**
  - Scroll infinito ou botões prev/next

#### Perfil
- **Dados do Usuário**
  - Nome, CPF, Email, Telefone, Endereço
  - Editar informações
  - Alterar senha

## 🔌 Integração com a API

### Endpoints Utilizados

#### Autenticação
```javascript
POST /api/v1/auth/login
Body: { "cpf": "11144477735", "senha": "senha123" }
Response: { "access_token": "...", "token_type": "bearer" }
```

#### Usuários
```javascript
// Criar usuário
POST /api/v1/users/
Body: {
  "nome": "João Silva",
  "cpf": "11144477735",
  "data_nascimento": "15/01/1990",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "endereco": "Rua ABC, 123",
  "senha": "senha123"
}

// Dados do usuário logado
GET /api/v1/users/me
Headers: { "Authorization": "Bearer <token>" }

// Atualizar usuário
PUT /api/v1/users/me
Body: { "nome": "João da Silva", "telefone": "11988888888" }
```

#### Contas
```javascript
// Listar contas do usuário
GET /api/v1/accounts/
Response: [
  {
    "id": 1,
    "tipo_conta": "corrente",
    "agencia": "0001",
    "numero_conta": "00000001",
    "saldo": "1000.00",
    "ativa": true,
    "data_criacao": "18/11/2025 10:30:00"
  }
]

// Criar nova conta
POST /api/v1/accounts/
Body: { "tipo_conta": "poupanca" }

// Consultar saldo
GET /api/v1/accounts/{account_id}/balance
Response: {
  "numero_conta": "00000001",
  "agencia": "0001",
  "saldo": "1000.00"
}
```

#### Transações
```javascript
// Saque
POST /api/v1/transactions/saque
Body: {
  "account_id": 1,
  "valor": 100.00,
  "descricao": "Saque no caixa"
}

// Depósito
POST /api/v1/transactions/deposito
Body: {
  "account_id": 1,
  "valor": 500.00,
  "descricao": "Depósito em dinheiro"
}

// PIX
POST /api/v1/transactions/pix
Body: {
  "account_id": 1,
  "valor": 50.00,
  "destino_conta": "00000002",
  "descricao": "Pagamento"
}

// Transferência
POST /api/v1/transactions/transferencia
Body: {
  "account_id": 1,
  "valor": 200.00,
  "destino_conta": "00000003",
  "descricao": "Transferência entre contas"
}

// Extrato (com filtros)
GET /api/v1/transactions/?account_id=1&tipo_transacao=saque&skip=0&limit=20
Response: [
  {
    "id": 1,
    "tipo_transacao": "deposito",
    "valor": "500.00",
    "descricao": "Depósito",
    "data": "18/11/2025 14:30:00",
    "destino_conta": null
  }
]
```

### Tipos de Conta Disponíveis

| Tipo | Idade Mínima | Benefícios |
|------|--------------|------------|
| **corrente** | 18 anos | Conta padrão com todas operações |
| **poupanca** | Qualquer | Rendimento mensal |
| **salario** | 18 anos | Recebimento de salário |
| **universitaria** | 16-24 anos | Sem taxas, benefícios estudantis |
| **empresarial** | 18 anos | Para empresas |
| **black** | 18 anos | Conta premium com vantagens |

### Regras de Negócio

#### Saques
- **Limite diário**: R$ 1.000,00 (configurável)
- **Máximo de saques por dia**: 3 (configurável)
- Validação de saldo disponível

#### PIX e Transferências
- Chave PIX = número da conta
- Validação de conta destino existente
- Saldo suficiente na origem

#### Criação de Contas
- **Conta Corrente**: Criada automaticamente no cadastro
- **Conta Universitária**: Apenas 16-24 anos
- **Outras contas**: Idade mínima 18 anos
## 💻 Exemplos de Código

### Cliente Axios (`src/api/client.js`)

```javascript
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

// Interceptor de requisição - adiciona token
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

// Interceptor de resposta - trata erros
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
      toast.error("Sessão expirada. Faça login novamente.");
    } else if (error.response?.data?.detail) {
      toast.error(error.response.data.detail);
    } else {
      toast.error("Erro ao processar requisição");
    }
    return Promise.reject(error);
  }
);

export default client;
```

### Context de Autenticação (`src/auth/AuthContext.jsx`)

```javascript
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
      const { data } = await client.get("/users/me");
      setUser(data);
    } catch (error) {
      localStorage.removeItem("access_token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (cpf, senha) => {
    const { data } = await client.post("/auth/login", { cpf, senha });
    localStorage.setItem("access_token", data.access_token);
    await loadUser();
    toast.success("Login realizado com sucesso!");
    return data;
  };

  const register = async (userData) => {
    const { data } = await client.post("/users/", userData);
    toast.success("Cadastro realizado! Faça login para continuar.");
    return data;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    toast.info("Logout realizado");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### Rota Protegida (`src/auth/ProtectedRoute.jsx`)

```javascript
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

### Hook de Contas (`src/hooks/useAccounts.js`)

```javascript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../api/client";
import { toast } from "react-toastify";

export const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const { data } = await client.get("/accounts/");
      return data;
    },
    staleTime: 1000 * 60, // 1 minuto
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (tipo_conta) => {
      const { data } = await client.post("/accounts/", { tipo_conta });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["accounts"]);
      toast.success("Conta criada com sucesso!");
    },
  });
};

export const useAccountBalance = (accountId) => {
  return useQuery({
    queryKey: ["account-balance", accountId],
    queryFn: async () => {
      const { data } = await client.get(`/accounts/${accountId}/balance`);
      return data;
    },
    enabled: !!accountId,
  });
};
```

### Hook de Transações (`src/hooks/useTransactions.js`)

```javascript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../api/client";
import { toast } from "react-toastify";

export const useTransactions = (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.account_id) params.append("account_id", filters.account_id);
  if (filters.tipo_transacao) params.append("tipo_transacao", filters.tipo_transacao);
  if (filters.data_inicio) params.append("data_inicio", filters.data_inicio);
  if (filters.data_fim) params.append("data_fim", filters.data_fim);
  params.append("skip", filters.skip || 0);
  params.append("limit", filters.limit || 20);

  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: async () => {
      const { data } = await client.get(`/transactions/?${params}`);
      return data;
    },
  });
};

export const useSaque = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (transactionData) => {
      const { data } = await client.post("/transactions/saque", transactionData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["accounts"]);
      queryClient.invalidateQueries(["transactions"]);
      toast.success("Saque realizado!");
    },
  });
};

export const useDeposito = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (transactionData) => {
      const { data } = await client.post("/transactions/deposito", transactionData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["accounts"]);
      queryClient.invalidateQueries(["transactions"]);
      toast.success("Depósito realizado!");
    },
  });
};

export const usePix = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (transactionData) => {
      const { data } = await client.post("/transactions/pix", transactionData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["accounts"]);
      queryClient.invalidateQueries(["transactions"]);
      toast.success("PIX realizado!");
    },
  });
};

export const useTransferencia = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (transactionData) => {
      const { data } = await client.post("/transactions/transferencia", transactionData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["accounts"]);
      queryClient.invalidateQueries(["transactions"]);
      toast.success("Transferência realizada!");
    },
  });
};
```

### Utilitários - Formatadores (`src/utils/formatters.js`)

```javascript
// Formatar CPF: 12345678901 -> 123.456.789-01
export const formatCPF = (cpf) => {
  const cleaned = cpf.replace(/\D/g, "");
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

// Formatar moeda: 1000.50 -> R$ 1.000,50
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// Formatar data: 2025-11-18 -> 18/11/2025
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
};

// Formatar data e hora: 2025-11-18T10:30:00 -> 18/11/2025 10:30
export const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR");
};

// Formatar número de conta: 12345 -> 00000012345
export const formatAccountNumber = (number) => {
  return String(number).padStart(11, "0");
};

// Limpar CPF: 123.456.789-01 -> 12345678901
export const cleanCPF = (cpf) => {
  return cpf.replace(/\D/g, "");
};
```

### Utilitários - Validadores (`src/utils/validators.js`)

```javascript
// Validar CPF
export const isValidCPF = (cpf) => {
  const cleaned = cpf.replace(/\D/g, "");
  
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleaned)) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleaned.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleaned.charAt(10))) return false;
  
  return true;
};

// Validar email
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validar valor monetário
export const isValidAmount = (amount) => {
  return !isNaN(amount) && parseFloat(amount) > 0;
};
```