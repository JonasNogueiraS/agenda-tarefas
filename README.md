# Agenda de Tarefas

## Descrição

Este é um projeto de um simples sistema de agenda de tarefas, onde o usuário pode se cadastrar, fazer login e gerenciar suas tarefas. As tarefas são salvas em um banco de dados e são privadas para cada usuário.

## Funcionalidades

- Cadastro de novos usuários
- Login de usuários
- Adicionar novas tarefas
- Editar tarefas existentes
- Marcar tarefas como concluídas
- Logout

## Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Firebase](https://firebase.google.com/) (Authentication e Firestore)

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/agenda-tarefas.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto com as suas credenciais do Firebase:
   ```
    REACT_APP_FIREBASE_API_KEY=sua-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=seu-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=seu-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=seu-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu-messaging-sender-id
    REACT_APP_FIREBASE_APP_ID=seu-app-id
    REACT_APP_FIREBASE_MEASUREMENT_ID=seu-measurement-id
   ```
4. Inicie o projeto:
   ```bash
   npm start
   ```
