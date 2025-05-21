# teste\_tecnico\_fullStack

Este projeto consiste em uma aplicação Full Stack simples que permite ao usuário criar e gerenciar campos personalizados e seus preenchimentos. A aplicação é composta por uma API REST construída com Node.js e um frontend desenvolvido com React.

## Tecnologias Utilizadas

### Backend

* Node.js
* Express
* MongoDB (via Mongoose)

### Frontend

* React
* Axios
* React Router

## Pré-requisitos

* Node.js (versão 14 ou superior)
* npm ou yarn
* MongoDB em execução localmente ou uma instância acessível remotamente

## Passo a Passo para Rodar o Projeto Localmente

### 1. Clone o Repositório

```bash
git clone https://github.com/dognini/teste_tecnico_fullStack.git
cd teste_tecnico_fullStack
```

### 2. Configure o Backend

```bash
cd backend
npm install
```

Inicie o servidor backend:

```bash
npm run dev:server
```

### 3. Configure o Frontend

```bash
cd ../frontend
npm install
```

Para rodar a migraton use o comando:

```bash
npm run typeorm -- -d .src/database/data-source.ts migration:run
```

Inicie o servidor frontend:

```bash
npm run dev
```

Acesse o aplicativo no navegador através de `http://localhost:3000`.

## Estrutura do Projeto

```plaintext
teste_tecnico_fullStack/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── public/
└── README.md
```