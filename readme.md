# Backend e Qualidade – Plataforma de Blogging Educacional

## Introdução

Este projeto consiste no desenvolvimento de um back-end para uma plataforma de blogging educacional, cujo objetivo é permitir que professores publiquem aulas e conteúdos didáticos, enquanto alunos possam consultar essas aulas por meio de requisições HTTP.

A aplicação foi desenvolvida utilizando Node.js com TypeScript e implementa um CRUD completo de postagens, além de funcionalidades de autenticação, autorização por perfil e busca de conteúdo. O foco do projeto está na construção de uma API bem estruturada, seguindo boas práticas de arquitetura, organização de código, testes automatizados, containerização e automação de build.

## Visão Geral da Solução

A aplicação é uma API RESTful, responsável pelo gerenciamento de usuários e postagens (aulas), oferecendo as seguintes funcionalidades principais:

- Criação de conta de usuário
- Autenticação via JWT
- Diferenciação de perfis (Professor e Aluno)
- Criação, edição, exclusão e leitura de posts
- Controle de visibilidade dos posts (rascunho ou publicada)
- Busca textual por posts

O projeto é backend-only, mas possui Swagger.

## Arquitetura do Sistema

O projeto segue uma arquitetura modular inspirada em Clean Architecture, também conhecida como arquitetura em camadas orientadas a domínio. Essa abordagem visa separar responsabilidades, facilitar testes e tornar o código mais sustentável.

As principais camadas e componentes do projeto são:
- **Entities**: regras centrais do domínio
- **Interfaces**: contratos entre camadas
- **Use Cases**: regras de negócio da aplicação
- **Repositories**: abstração de acesso a dados
- **Controllers**: orquestração das requisições HTTP
- **Middlewares**: autenticação, autorização e tratamento de erros
- **Routes**: definição das rotas da API
- **Factories**: composição e injeção de dependências
- **Errors**: padronização de erros da aplicação

## Autenticação e Autorização

A autenticação é realizada via **JWT** (JSON Web Token). As senhas são armazenadas de forma segura utilizando hash. Cada usuário possui um papel (`role`): **teacher** ou **student**.

O sistema garante que apenas usuários com o perfil adequado possam executar determinadas operações.

## Requisitos Funcionais – Endpoints

### Endpoints de Usuário

- `POST /users`
  - Criação de conta de usuário

- `POST /auth/login`
  - Autenticação e geração do token JWT

### Endpoints de Postagens

- `GET /posts`
  - Aluno: retorna apenas aulas publicadas
  - Professor: retorna todas as aulas

- `GET /posts/:id`
  - Retorna o conteúdo completo de uma aula
  - Aluno: só acessa se a aula estiver publicada

- `POST /posts`
  - Criação de aulas (Professor)

- `PUT /posts/:id`
  - Edição de aulas (Professor)

- `DELETE /posts/:id`
  - Exclusão de aulas (Professor)

- `GET /posts/search?query=`
  - Busca de aulas por palavras-chave no título ou conteúdo
  - Aluno: só visualiza aulas que estão publicadas

## Persistência de Dados

- Banco de dados utilizado: **MongoDB**
- A aplicação utiliza um repositório para abstrair o acesso aos dados
- Os registros de postagens incluem:
  - Título
  - Conteúdo
  - Autor
  - Status de visibilidade
  - Datas de criação e atualização

## Testes

O projeto conta com testes automatizados cobrindo casos relevantes dos use cases e das rotas, incluindo operações de criação, edição, exclusão e controle de acesso. Os testes auxiliam na validação das regras de negócio.

## Containerização com Docker

A aplicação é containerizada utilizando **Docker**, garantindo padronização do ambiente de execução. Um arquivo `docker-compose` é utilizado para facilitar a execução conjunta da aplicação e do banco de dados.

## CI/CD com GitHub Actions

O projeto utiliza **GitHub Actions** para automação do processo de build, incluindo:
- Build da aplicação
- Criação da imagem Docker
- Publicação da imagem no **Docker Hub**

## Como Executar o Projeto

### Configuração de Ambiente

Antes de executar o projeto, é necessário criar um arquivo `.env` com base no arquivo de exemplo `.env.example`.

**Execução com Docker Compose**
```bash
docker-compose up -d
```

**Execução Local com Node.js**
```bash
npm install --legacy-peer-deps
npm run start:dev
```

**Execução Local dos Testes**
```bash
npm run test
# ou
npm run test:coverage
```

## Processo de Desenvolvimento

O desenvolvimento do projeto foi iniciando pela organização da estrutura base da aplicação, definição da arquitetura e modelagem do domínio. Em seguida, foram implementadas as regras de negócio, integração com o banco de dados, autenticação, autorização e testes automatizados.

Durante o processo, o principal desafio esteve na compreensão e integração de todas as camadas da aplicação, garantindo que cada componente tivesse responsabilidades bem definidas. A containerização com Docker também exigiu atenção, especialmente na configuração do ambiente e na integração com o pipeline de build.

O resultado final é uma API funcional, organizada e alinhada com boas práticas de desenvolvimento backend, atendendo aos requisitos propostos para a disciplina.