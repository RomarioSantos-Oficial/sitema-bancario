🏦 Banco Vectra API — README

API completa de um banco digital fictício chamado Banco Vectra (771), construída com FastAPI, SQLite, SQLAlchemy, JWT, Pydantic e arquitetura modular seguindo boas práticas.
O objetivo do projeto é simular um sistema bancário real com autenticação, multi-contas, transações, regras de conta, consultas e extratos, depósitos, saques, pix, entre outras operações.

📁 Estrutura do Projeto
```
Backend/bank_api/
│
├── app/
│   ├── main.py                    # Arquivo principal da API
│   ├── init_db.py                 # Inicialização do banco de dados
│   │
│   ├── core/
│   │   ├── config.py              # Configurações gerais
│   │   ├── security.py            # Hash, JWT, autenticação
│   │   └── database.py            # Conexão SQLite + session
│   │
│   ├── models/
│   │   ├── user.py                # Modelo de usuário
│   │   ├── account.py             # Modelo de conta
│   │   └── transaction.py         # Modelo de transação
│   │
│   ├── schemas/
│   │   ├── user.py                # Schemas Pydantic de usuário
│   │   ├── account.py             # Schemas Pydantic de conta
│   │   └── transaction.py         # Schemas Pydantic de transação
│   │
│   ├── services/
│   │   ├── auth_service.py        # Lógica de autenticação
│   │   ├── user_service.py        # Lógica de negócio de usuário
│   │   ├── account_service.py     # Lógica de negócio de conta
│   │   └── transaction_service.py # Lógica de transações
│   │
│   ├── routers/
│   │   ├── auth.py                # Rotas de autenticação
│   │   ├── users.py               # Rotas de usuários
│   │   ├── accounts.py            # Rotas de contas
│   │   └── transactions.py        # Rotas de transações
│   │
│   └── utils/
│       ├── validators.py          # Validadores customizados
│       └── generators.py          # Geradores (número de conta, etc)
│
├── tests/
│   ├── test_auth.py               # Testes de autenticação
│   ├── test_accounts.py           # Testes de contas
│   └── test_transactions.py       # Testes de transações
│
├── requirements.txt               # Dependências do projeto
└── README.md                      # Documentação do projeto
```

🏦 Informações do Banco Vectra

| Informação        | Valor         |
|-------------------|---------------|
| Nome do banco     | Banco Vectra  |
| Código            | 771           |
| Agência padrão    | 0001          |

## 🧾 Tipos de Conta

| Tipo de conta        | Número base | Regra                                                    |
|----------------------|-------------|----------------------------------------------------------|
| Conta Corrente       | 000000-0    | Todos os clientes recebem automaticamente                |
| Conta Poupança       | 000000-3    | Permitida a partir de 13 anos                            |
| Conta Salário        | 000000-4    | Permitida a partir de 16 anos                            |
| Conta Universitária  | 000000-5    | Permitida a partir de 16 anos                            |
| Conta Empresarial    | 000000-7    | Permitida a partir de 21 anos                            |
| Conta Black          | 000000-9    | Para maiores de 18 anos com saldo ≥ R$ 50.000          |
## 📜 Regras de Criação de Contas

### 💠 Idade mínima geral
**Idade mínima para criar um cliente no banco: 13 anos**

### 🧒 Entre 13 e 15 anos
**Permitido:**
- ✔ Conta Corrente (obrigatória)
- ✔ Conta Poupança

### 🧑 De 16 a 17 anos
**Permitido:**
- ✔ Conta Corrente
- ✔ Conta Poupança
- ✔ Conta Salário
- ✔ Conta Universitária

### 🧑‍🦱 A partir de 18 anos
**Permitido:**
- ✔ Todas as anteriores
- ✔ Conta Black (se saldo ≥ R$ 50.000)

### 🧔 A partir de 21 anos
**Permitido:**
- ✔ Todas as anteriores
- ✔ Conta Empresarial

## 🔐 Regras de Acesso e Autenticação

**O login pode ser feito usando:**
- CPF
- Número da conta
- Senha

**Segurança:**
- A autenticação usa JWT (token de acesso + refresh token)
- Senhas são armazenadas com bcrypt (Passlib)
- Tokens têm tempo de expiração configurável

## 🗄️ Banco de Dados (SQLite)

### Tabela: `users`
| Campo            | Tipo        | Descrição                    |
|------------------|-------------|------------------------------|
| id               | Integer     | Chave primária               |
| nome             | String      | Nome completo                |
| cpf              | String      | CPF (único)                  |
| data_nascimento  | Date        | Data de nascimento           |
| email            | String      | E-mail (único)               |
| telefone         | String      | Telefone de contato          |
| endereco         | String      | Endereço completo            |
| senha_hash       | String      | Senha criptografada (bcrypt) |
| data_criacao     | DateTime    | Data de criação do usuário   |

### Tabela: `accounts`
| Campo        | Tipo     | Descrição                           |
|--------------|----------|-------------------------------------|
| id           | Integer  | Chave primária                      |
| user_id      | Integer  | FK para users                       |
| tipo_conta   | String   | Tipo (corrente, poupança, etc)      |
| agencia      | String   | Agência (padrão: 0001)              |
| numero_conta | String   | Número da conta (único)             |
| saldo        | Decimal  | Saldo atual                         |
| ativa        | Boolean  | Status da conta                     |
| data_criacao | DateTime | Data de criação da conta            |

### Tabela: `transactions`
| Campo          | Tipo     | Descrição                                    |
|----------------|----------|----------------------------------------------|
| id             | Integer  | Chave primária                               |
| account_id     | Integer  | FK para accounts                             |
| tipo_transacao | String   | Tipo (pix, saque, deposito, transferência)   |
| valor          | Decimal  | Valor da transação                           |
| data           | DateTime | Data e hora da transação                     |
| descricao      | String   | Descrição opcional                           |
| destino_conta  | String   | Conta destino (para transferências/pix)      |

## 💸 Operações Disponíveis na API

| Operação                  | Status              | Endpoint               |
|---------------------------|---------------------|------------------------|
| Criar usuário             | ✔ Implementado      | POST /users            |
| Login / JWT               | ✔ Implementado      | POST /auth/login       |
| Refresh Token             | ✔ Implementado      | POST /auth/refresh     |
| Criar conta extra         | ✔ Implementado      | POST /accounts         |
| Consultar contas          | ✔ Implementado      | GET /accounts          |
| Consultar saldo           | ✔ Implementado      | GET /accounts/{id}     |
| Consultar extrato         | ✔ Implementado      | GET /transactions      |
| Saque                     | ✔ Implementado      | POST /transactions/saque |
| Depósito                  | ✔ Implementado      | POST /transactions/deposito |
| Pix                       | ✔ Implementado      | POST /transactions/pix |
| Transferência interna     | ✔ Implementado      | POST /transactions/transferencia |
| Filtrar transações        | ✔ Implementado      | GET /transactions?tipo=... |
| Bloquear conta            | 🔄 Futuro           | PATCH /accounts/{id}/block |
| Desbloquear conta         | 🔄 Futuro           | PATCH /accounts/{id}/unblock |
| Cartão de crédito         | 🔄 Futuro           | -                      |
## 🔧 Tecnologias Usadas

| Tecnologia      | Descrição                                    |
|-----------------|----------------------------------------------|
| **FastAPI**     | Framework web moderno e de alta performance  |
| **Uvicorn**     | Servidor ASGI para rodar a aplicação         |
| **SQLite**      | Banco de dados relacional leve               |
| **SQLAlchemy**  | ORM para manipulação do banco de dados       |
| **Pydantic**    | Validação de dados e serialização            |
| **Passlib**     | Hashing de senhas com bcrypt                 |
| **Python-JOSE** | Implementação de JWT para autenticação       |
| **Alembic**     | Gerenciador de migrações (opcional)          |
| **Pytest**      | Framework de testes                          |

## ▶️ Como Executar

### 1️⃣ Instalar dependências
```bash
cd Backend/bank_api
pip install -r requirements.txt
```

### 2️⃣ Inicializar o banco de dados
```bash
python -m app.init_db
```

### 3️⃣ Executar a aplicação
```bash
uvicorn app.main:app --reload
```

### 4️⃣ Acessar a API
- **API Base:** http://localhost:8000
- **Documentação Swagger:** http://localhost:8000/docs
- **Documentação ReDoc:** http://localhost:8000/redoc

## 🚀 Possíveis Melhorias Futuras

- [ ] Sistema de cartão de crédito com limite e fatura
- [ ] Pix com chave aleatória, email, CPF e telefone
- [ ] Contas conjuntas
- [ ] Sistema de empréstimos com taxas e parcelas
- [ ] Métodos de auditoria e segurança extra (2FA)
- [ ] Notificações por e-mail/SMS
- [ ] Painel admin para gestão
- [ ] Investimentos (CDB, Tesouro Direto, etc)
- [ ] Agendamento de transações
- [ ] Histórico de senhas e logs de acesso
- [ ] API Gateway e Rate Limiting
- [ ] Containerização com Docker
- [ ] CI/CD com GitHub Actions