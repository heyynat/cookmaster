# 🚧DOCUMENTAÇÃO EM CONSTRUÇÃO🚧

<br></br>
<p align="center">Uma API CRUD para receitas</p>
<br></br>

# Tabela de conteúdos
<!--ts-->
* [Sobre](#sobre)
* [Como usar](#como-usar)
    * [Pré-requisitos](#pr%C3%A9-requisitos)
    * [Instalação](#instala%C3%A7%C3%A3o)
* [Tecnologias](#tecnologias)
* [Requisitos do projeto](#requisitos-do-projeto)
    - [1 - Cadastro de usuários](#1---cadastro-de-usuários)
    - [2 - Login de usuários](#2---login-de-usuários)
    - [3 - Cadastro de receitas](#3---cadastro-de-receitas)
    - [4 - Listagem de receitas](#4---listagem-de-receitas)
    - [5 - Buscar uma receita específica](#5---buscar-uma-receita-específica)
    - [6 - Crie uma query em mongo que insira uma pessoa usuária com permissões de admin](#6---crie-uma-query-em-mongo-que-insira-uma-pessoa-usuária-com-permissões-de-admin)
    - [7 - Editar uma receita](#7---editar-uma-receita)
    - [8 - Excluir de uma receita](#8---excluir-uma-receita)
    - [9 - Adicionar uma imagem a uma receita](#9---adicionar-uma-imagem-a-uma-receita)
    - [10 - Crie um endpoint para acessar a imagem de uma receita](#10---crie-um-endpoint-para-acessar-a-imagem-de-uma-receita)
    - [11 - Testes de integração no mínimo 90% dos arquivos em `src`, com um mínimo de 150 linhas cobertas](#11---testes-de-integração-no-mínimo-90%-dos-arquivos-em-src,-com-um-mínimo-de-150-linhas-cobertas)
* [Contribuição](#contribui%C3%A7%C3%A3o)
<!--te-->

# Sobre

Este projeto consiste uma API CRUD para receitas, desenvolvido durante o módulo de Back-end na Trybe, visando consolidar conhecimentos a cerca de MongoDB, JWT e Testes de integração.

---

# Como usar

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), MongoDB. 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Instalação

```bash
# Clone este repositório
git clone <git@github.com:heyynat/cookmaster.git>

# Acesse a pasta do projeto no terminal/cmd
cd cookmaster

# Instale as dependências
npm install

# Execute a aplicação em modo de desenvolvimento
npm run dev

# O projeto inciará em <http://localhost:3000>
```
---

# Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/) - Node.js é um software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web;
- Express
- Mocha
- Jest
- JavaScript
- MongoDB
- Joi
- JWT
- Lint

---

# Requisitos do projeto

### 1 - Cadastro de usuários

- A rota para essa operação é (`/users`).

- No banco um usuário precisa ter os campos Email, Senha, Nome e Role.

- Para criar um usuário através da API, todos os campos são obrigatórios, com exceção do Role.

- O campo Email deve ser único.

- Usuários criados através desse endpoint teram campo `Role` com o atributo _user_, ou seja, devem ser usuários comuns, e não admins.

- O body da requisição deve conter o seguinte formato:

  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

Se o usuário não tiver o campo "name" o resultado retornado deverá ser um status http `400`;

Se o usuário não tiver o campo "email" o resultado retornado deverá ser um status http `400`;

Se o usuário tiver o campo email inválido o resultado retornado deverá ser um status http `400`;

Se o usuário não tiver o campo "senha" o resultado retornado deverá ser um status http `400`;

Se o usuário cadastrar o campo "email" com um email que já existe, o resultado retornado deverá ser um status http `409`;

Se o usuário for cadastrado com sucesso o resultado retornado deverá ser um status http `201`;

Se o usuário for criado com sucesso o resultado retornado deverá ser um status http `201`;

### 2 - Login de usuários

- A rota para essa operação é (`/login`).

- A rota deve receber os campos Email e Senha e esses campos devem ser validados no banco de dados.

- Um token `JWT` será retornado caso haja sucesso no login. No seu payload deve estar presente o id, email e role do usuário.

- O body da requisição deve conter o seguinte formato:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

Se o login não tiver o campo "email" o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`;

Se o login não tiver o campo "password" o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:

Se o login tiver o email inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:

Se o login tiver a senha inválida o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:

Se foi feito login com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:

### 3 - Cadastro de receitas

- A rota para essa operação é (`/recipes`).

- A receita só pode ser criada caso o usuário esteja logado e o token `JWT` validado.

- No banco, a receita deve ter os campos Nome, Ingredientes, Modo de preparo, URL da imagem e Id do Autor.

- Nome, ingredientes e modo de preparo devem ser recebidos no corpo da requisição, com o seguinte formato:

  ```json
  {
    "name": "string",
    "ingredients": "string",
    "preparation": "string"
  }
  ```

- O campo dos ingredientes pode ser um campo de texto aberto.

- O campo ID do autor, deve ser preenchido automaticamente com o ID do usuário logado, que deve ser extraído do token JWT.

- A URL da imagem será preenchida através de outro endpoint

Se a receita não tiver o campo "name" o resultado retornado deverá ser um status http `400`:

Se a receita não tiver o campo "ingredients" o resultado retornado deverá ser um status http `400`:

Se a receita não tiver o campo "preparation" o resultado retornado deverá ser um status http `400`:

Se a receita não tiver o token válido o resultado retornado deverá ser um status http `401`:

O resultado retornado para cadastrar a receita com sucesso deverá ser um status http `201`:

### 4 - Listagem de receitas

- A rota para essa operação é (`/recipes`).

- A rota pode ser acessada por usuários logados ou não;

O resultado retornado para listar receitas com sucesso deverá ser um status http `200` contento um array com todas as receitas presentes no banco;

### 5 - Visualizar uma receita específica

- A rota para essa operação é (`/recipes/:id`).

- A rota pode ser acessada por usuários logados ou não

O resultado retornado para listar uma receita com sucesso deverá ser um status http `200`, contento a receita com o id correspondente á passada no parametro da requisição;

O resultado retornado para listar uma receita que não existe deverá ser conforme exibido abaixo, com um status http `404`:

### 6 - Crie uma query em mongo que insira uma pessoa usuária com permissões de admin

Uma query do Mongo DB capaz de inserir um usuário na coleção _users_ com os seguintes valores:

`{ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }`

**Obs.:** Esse usuário tem o poder de criar, deletar, atualizar ou remover qualquer receita, independente de quem a cadastrou.

### 7 - Editar uma receita

- A rota para essa operação é (`/recipes/:id`).

- A receita só pode ser atualizada caso o usuário esteja logado e o token `JWT` validado.

- A receita só pode ser atualizada caso pertença ao usuário logado, ou caso esse usuário seja um admin.

- O corpo da requisição deve receber o seguinte formato:

  ```json
  {
    "name": "string",
    "ingredients": "string",
    "preparation": "string"
  }
  ```
- **[Não é possível editar receita sem estar autenticado]**

O resultado retornado para editar receita sem autenticação deverá ser um status http `401`;

O resultado retornado para editar receita com token inválido deverá ser um status http `401`;

O resultado retornado para editar uma receita com sucesso deverá ser um status http `200`;

O resultado retornado para editar uma receita com sucesso deverá ser um status http `200`;

### 8 - Excluir uma receita

- A rota para essa operação é (`/recipes/:id`).

- A receita só pode ser excluída caso o usuário esteja logado e o token `JWT` validado.

- A receita só pode ser excluída caso pertença ao usuário logado, ou caso o usuário logado seja um admin.

- **[Não é possível excluir receita sem estar autenticado]**

O resultado retornado para excluir uma receita sem autenticação deverá ser conforme exibido abaixo, com um status http `401`;

O resultado retornado para excluir uma receita com sucesso deverá ser conforme exibido abaixo, com um status http `204`;

O resultado retornado para excluir uma receita com sucesso deverá ser conforme exibido abaixo, com um status http `204`;

### 9 - Adicionar uma imagem a uma receita

- A rota para essa operação é (`/recipes/:id/image/`).

- A imagem deve ser lida do campo `image`.

- O endpoint deve aceitar requisições no formato `multipart/form-data`.

- A receita só pode ser atualizada caso o usuário esteja logado e o token `JWT` validado.

- A receita só pode ser atualizada caso pertença ao usuário logado ou caso o usuário logado seja admin.

- O upload da imagem deverá ser feito utilizando o `Multer`.

- O nome do arquivo deve ser o ID da receita, e sua extensão `.jpeg`.

- A URL completa para acessar a imagem através da API é gravada no banco de dados, junto com os dados da receita.

O resultado retornado ao adicionar uma foto na receita com sucesso será um status http `200`;

O resultado retornado ao adicionar uma foto na receita com sucesso será um status http `401`;

### 10 - Crie um endpoint para acessar a imagem de uma receita

- As imagens devem estar disponíveis através da rota `/images/<id-da-receita>.jpeg` na API.

O resultado retornado deverá ser do tipo imagem, com um status http `200`;

### 11 - Testes de integração no mínimo 90% dos arquivos em `src`, com um mínimo de 150 linhas cobertas

- Os testes de integração encontram-se criados na pasta `./src/integration-tests`

- Os testes foram criados usando o instrumental e boas práticas apresentado nos conteúdos de testes do course da Trybe;

- Para rodar os testes, utilize o comando `npm run dev:test`;

- Para visualizar a cobertura, utilize o comando `npm run dev:test:coverage`;

---

# Contribuição

<table>
  <tr>
      <td align="center"><a href="https://github.com/heyynat"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/54861311?v=4" width="100px;" alt=""/><br /><sub><b>Natali Lima</b></sub></a><br /><a href="https://github.com/heyynat">🚀</a></td>
  </tr>
</table>
