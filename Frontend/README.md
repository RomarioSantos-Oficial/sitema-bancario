# 🏦 Banco Vectra - Frontend

Sistema bancário completo desenvolvido com **Vite + React** consumindo a API do Banco Vectra.

## 🎨 Paleta de Cores

### Vectra Blue (Principal)
- **Azul Vectra**: `#1059FF`
- **Azul Escuro**: `#0A2B6B`
- **Azul Claro**: `#5FA4FF`

### Neutras
- **Cinza Suave**: `#E6E9F0`
- **Cinza Médio**: `#A3A9B8`
- **Cinza Escuro**: `#3C3F45`
- **Preto**: `#0C0C0C`

### Ações
- **Verde Sucesso**: `#35C46A`
- **Vermelho Erro**: `#E54646`
- **Amarelo Alerta**: `#F2C94C`

### Premium Black
- **Preto Profundo**: `#000000`
- **Grafite**: `#1A1A1A`
- **Ouro Premium**: `#C9A035`
- **Ouro Claro**: `#E5C87A`

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📁 Estrutura Criada

```
Frontend/
├── src/
│   ├── api/
│   │   └── client.js              ✅ Cliente Axios configurado
│   ├── auth/
│   │   ├── AuthContext.jsx        ✅ Context de autenticação
│   │   └── ProtectedRoute.jsx     ✅ Rotas protegidas
│   ├── components/
│   │   ├── AccountCard.jsx        ✅ Card de conta
│   │   └── TransactionCard.jsx    ✅ Card de transação
│   ├── hooks/
│   │   ├── useAccounts.js         ✅ Hook de contas
│   │   └── useTransactions.js     ✅ Hook de transações
│   ├── pages/
│   │   ├── Home.jsx               ✅ Landing page
│   │   ├── Login.jsx              ✅ Página de login
│   │   ├── Register.jsx           ⏳ A criar
│   │   ├── Dashboard.jsx          ⏳ A criar
│   │   ├── Accounts.jsx           ⏳ A criar
│   │   ├── Transactions.jsx       ⏳ A criar
│   │   └── Extract.jsx            ⏳ A criar
│   ├── utils/
│   │   ├── formatters.js          ✅ Formatadores
│   │   └── validators.js          ✅ Validadores
│   ├── App.jsx                    ✅ Rotas configuradas
│   ├── main.jsx                   ✅ Entry point
│   └── index.css                  ✅ Estilos globais
├── .env                           ✅ Variáveis de ambiente
├── index.html                     ✅ HTML base
├── package.json                   ✅ Dependências
├── tailwind.config.js             ✅ Configuração Tailwind
└── vite.config.js                 ✅ Configuração Vite
```

## 🔌 Integração com API

A aplicação está configurada para consumir a API em:
```
http://127.0.0.1:8000/api/v1
```

### Endpoints Disponíveis

- **Auth**: POST `/auth/login`
- **Usuários**: GET/POST/PUT `/users/`
- **Contas**: GET/POST `/accounts/`
- **Transações**: POST `/transactions/{tipo}`
- **Extrato**: GET `/transactions/`

## 📝 Próximos Passos

### Páginas a Criar

1. **Register.jsx** - Cadastro de usuário
2. **Dashboard.jsx** - Dashboard principal
3. **Accounts.jsx** - Gerenciar contas
4. **Transactions.jsx** - Realizar transações
5. **Extract.jsx** - Extrato bancário

### Componentes Adicionais

- Header.jsx - Cabeçalho com menu
- Sidebar.jsx - Menu lateral
- CreateAccountModal.jsx - Modal para criar conta
- TransactionModal.jsx - Modal para transações

## 🎯 Funcionalidades Implementadas

✅ Sistema de autenticação (JWT)
✅ Cliente Axios com interceptors
✅ React Query para cache
✅ Hooks personalizados
✅ Formatadores e validadores
✅ Componentes de Card
✅ Paleta de cores Vectra
✅ Tailwind CSS configurado
✅ Rotas protegidas

## 🔐 Dados de Teste

**CPFs válidos:**
- 11144477735
- 52998224725
- 84434229061

**Usuário exemplo:**
```json
{
  "nome": "João Silva",
  "cpf": "11144477735",
  "data_nascimento": "15/01/1990",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "endereco": "Rua ABC, 123",
  "senha": "senha123"
}
```

## 🛠️ Tecnologias

- React 18.3
- Vite 5.3
- React Router DOM 6.26
- TanStack React Query 5.51
- Axios 1.7
- Tailwind CSS 3.4
- React Hook Form 7.52
- React Toastify 10.0
- date-fns 3.6

## 📱 Responsividade

A aplicação é totalmente responsiva com breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

**Banco Vectra** - Seu banco digital completo 🏦💙
