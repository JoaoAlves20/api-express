# API de controle de usuário

## Sobre o projeto

Este projeto foi desenvolvido para testar meus conhecimentos na linguagem, no começo ele apenas estava fazendo um CRUD padrão, mas agora está com funcionalidades JWT e com testes inseridos. Esse controle faz todo o CRUD necessário, além de ter a parte de login, para receber o token e poder fazer o CRUD depois do login! Além disso, temos dois testes, um das funcionalidades do SERVICE e outro dos ENDPOINTS.

## Tecnologias

- JavaScript
- Node.js
- Express
- JWT
- Mocha e Supertest

## Como rodar o projeto

Antes de ir direto rodando o projeto, é importante verificar se você tem o Node instalado na sua máquina!!

### Clonando o projeto

```bash
# Primeiro vai ser necessário clonar este projeto na sua máquina
$ git clone https://github.com/JoaoAlves20/api-user-control.git

# Depois basta entrar na pasta clonada
$ cd api-user-control
```

### Rodando o projeto

```bash
# Dentro da pasta, primeiro é preciso instalar as dependências
$ npm i
# Depois basta rodar o projeto na sua máquina
$ npm run dev

# PARA RODAR OS TESTES NA SUA MÁQUINA

# Teste dos SERVICES
$ npm run test:services
# Teste dos ENDPOINTSA
$ npm run test:endpoint
```
