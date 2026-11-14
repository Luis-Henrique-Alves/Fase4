Aplicativo Mobile de Posts - Documentação Técnica
1. Visão Geral

Este projeto consiste em uma aplicação mobile desenvolvida com React Native e TypeScript, como entrega do módulo 4 da Pós-Graduação em Desenvolvimento de Software Full Stack da FIAP.

A aplicação tem como objetivo consumir a API de Posts desenvolvida na Fase 2 do curso, permitindo a visualização, pesquisa e gerenciamento de posts e comentários, além do gerenciamento de alunos e professores.

O aplicativo possui diferentes níveis de acesso, de acordo com o perfil do usuário:

Usuário público (não autenticado):

Visualizar posts;
Consultar detalhes dos posts;
Visualizar comentários;
Pesquisar posts.

Aluno:

Todas as funcionalidades públicas;
Adicionar comentários aos posts.

Professor:

Todas as funcionalidades disponíveis aos alunos;
Criar posts;
Editar seus próprios posts;
Gerenciar alunos e professores.

Administrador:

Acesso completo às funcionalidades da aplicação;
Criar e gerenciar posts;
Editar ou excluir posts de qualquer usuário;
Editar ou excluir comentários;
Gerenciar alunos e professores.
2. Tecnologias Utilizadas
React Native 0.88.1
React 19.3.0
TypeScript 6
React Navigation 7
Axios
AsyncStorage
JWT Decode
Lucide React Native
React Native Safe Area Context
React Native Screens
React Native SVG
Jest
ESLint
Prettier
3. Arquitetura

A aplicação utiliza arquitetura baseada em componentes, com separação entre telas, componentes reutilizáveis, contexto de autenticação, serviços e armazenamento local.

Fluxo da aplicação
text
             Aplicativo Mobile
                    |
                    v
                  App.tsx
                    |
                    v
             AuthProvider
                    |
                    v
            NavigationContainer
                    |
                    v
              Stack Navigator
                    |
          +---------+---------+
          |         |         |
          v         v         v
         Home     Login   Management
          |
          v
      PostDetails
          |
          v
       Services
          |
          v
       Axios API
          |
          v
      Backend FIAP

Autenticação

O gerenciamento de autenticação é realizado por meio da Context API.

O AuthContext é responsável por:

Armazenar os dados do usuário autenticado;
Gerenciar o token JWT;
Recuperar a sessão ao iniciar o aplicativo;
Identificar o perfil do usuário;
Controlar permissões de acesso;
Realizar login e logout.

O token JWT é armazenado localmente utilizando AsyncStorage.

As requisições autenticadas utilizam um interceptor do Axios, responsável por adicionar automaticamente o token ao cabeçalho Authorization.

4. Estrutura do Projeto
text
App
|
├── src
│   |
│   ├── components
│   │   ├── Comment
│   │   ├── Comments
│   │   ├── Header
│   │   ├── PostList
│   │   └── Searchbar
│   |
│   ├── context
│   │   └── auth.context.tsx
│   |
│   ├── screens
│   │   ├── CreatePost
│   │   ├── Home
│   │   ├── Login
│   │   ├── Management
│   │   │   ├── StudentForm
│   │   │   ├── StudentList
│   │   │   ├── TeacherForm
│   │   │   └── TeacherList
│   │   └── PostDetails
│   |
│   ├── services
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── pessoa.service.ts
│   │   └── post.service.ts
│   |
│   ├── storage
│   │   └── auth.storage.ts
│   |
│   ├── theme
│   |
│   ├── types
│   |
│   └── utils
│
├── __tests__
│
├── android
├── ios
│
├── App.tsx
├── index.js
├── package.json
└── tsconfig.json


Observação: a estrutura apresenta os principais diretórios identificados no projeto. Os arquivos internos das pastas de componentes, telas, tema, tipos e utilitários podem ser detalhados conforme a implementação.

5. Configuração Inicial
Pré-requisitos
Node.js 22.13.0 ou superior;
npm;
Android Studio;
Android SDK;
Emulador Android configurado;
Backend da API da Fase 2 em execução.

É necessário configurar corretamente o ambiente de desenvolvimento React Native para Android, incluindo as variáveis de ambiente do Android SDK.

6. Variáveis e Configuração da API

A configuração da API está centralizada em:

src/services/api.ts

Atualmente, a URL base configurada é:

typescript
baseURL: 'http://10.0.2.2:3000/api'


O endereço 10.0.2.2 é utilizado pelo emulador Android para acessar o localhost da máquina hospedeira.

Portanto, o backend deve estar em execução na porta 3000.

Importante: caso a aplicação seja executada em um dispositivo físico, será necessário substituir esse endereço pelo IP local da máquina que está executando o backend.

7. Instalação

Clonar o repositório:

bash
git clone URL_DO_REPOSITORIO


Entrar na pasta do projeto:

bash
cd fase4


Instalar as dependências:

bash
npm install


Certificar-se de que o ambiente Android está configurado e que o emulador está iniciado.

8. Executar Aplicação

Primeiro, iniciar o backend da Fase 2 na porta 3000.

Em seguida, iniciar o Metro:

bash
npm start


Em outro terminal, executar o aplicativo no emulador Android:

bash
npm run android


O React Native irá compilar e instalar o aplicativo no emulador.

Outros comandos disponíveis

Executar testes:

bash
npm test


Executar análise estática:

bash
npm run lint


Executar no iOS:

bash
npm run ios

9. Componentes e Telas Principais

Home

Tela principal da aplicação;
Exibe os posts disponíveis;
Permite pesquisar e visualizar publicações.

Login

Realiza a autenticação do usuário;
Integra-se ao endpoint /auth/login;
Armazena o token JWT após autenticação.

CreatePost

Permite a criação de novas publicações;
Disponível para professores e administradores.

PostDetails

Exibe os detalhes de uma publicação;
Permite visualizar e gerenciar comentários conforme as permissões do usuário.

Management

Centraliza o gerenciamento de alunos e professores.

StudentList e StudentForm

Listagem e cadastro de alunos.

TeacherList e TeacherForm

Listagem e cadastro de professores.

Header

Componente reutilizável de cabeçalho.

PostList

Componente responsável pela apresentação dos posts.

Comments e Comment

Componentes utilizados na apresentação e gerenciamento dos comentários.

Searchbar

Componente de pesquisa de publicações.

AuthContext

Gerencia autenticação, sessão e permissões dos usuários.
10. Integração com API

Todas as chamadas HTTP são realizadas utilizando Axios, com configuração centralizada em src/services/api.ts.

A aplicação consome a API local desenvolvida na Fase 2 do projeto.

Serviços implementados

authService

Responsável pela autenticação:

Método	Endpoint	Descrição
POST	/auth/login	Autenticação do usuário

pessoaService

Responsável pelo gerenciamento de pessoas:

Método	Endpoint	Descrição
GET	/pessoas	Listar pessoas
GET	/pessoas/:id	Buscar pessoa por identificador
POST	/pessoas	Cadastrar pessoa
PUT	/pessoas/:id	Atualizar pessoa
DELETE	/pessoas/:id	Remover pessoa
PATCH	/pessoas/:id/situacao	Alterar situação do usuário

Também são utilizados filtros para listar especificamente alunos e professores.

postService

Responsável pelo gerenciamento de publicações e comentários:

Método	Endpoint	Descrição
GET	/posts	Listar posts com paginação
GET	/posts/:id	Buscar post por identificador
GET	/posts/search	Pesquisar posts
POST	/posts	Criar post
PUT	/posts/:id	Atualizar post
DELETE	/posts/:id	Remover post
POST	/posts/:id/comentarios	Adicionar comentário
PUT	/posts/comentarios/:idComentario	Atualizar comentário
DELETE	/posts/comentarios/:idComentario	Remover comentário
Autenticação das requisições

O Axios possui um interceptor que recupera o token armazenado no AsyncStorage e adiciona o cabeçalho:

http
Authorization: Bearer TOKEN_JWT


A rota de login é excluída desse processo, pois não exige autenticação prévia.

11. Boas Práticas Aplicadas
Separação de responsabilidades entre telas, componentes, serviços e contexto;
Utilização de TypeScript para tipagem estática;
Context API para gerenciamento global de autenticação;
AsyncStorage para persistência local do token;
Axios centralizado para comunicação com o backend;
Interceptor para envio automático do token JWT;
Controle de acesso baseado em perfis de usuário;
Componentização e reutilização de elementos;
React Navigation para organização da navegação;
ESLint e Prettier para padronização do código.
12. Possíveis Evoluções
Implementação de testes unitários com Jest e React Native Testing Library;
Testes de integração dos serviços;
Implementação de testes end-to-end;
Melhorias no tratamento global de erros da API;
Implementação de refresh token;
Melhorias na experiência de autenticação;
Utilização de variáveis de ambiente para configuração da API;
Implementação de paginação com carregamento incremental;
Melhorias de acessibilidade;
Implementação de notificações push;
Preparação para publicação nas lojas Google Play e App Store.
Considerações Finais

O projeto representa a evolução da aplicação de Posts desenvolvida na Fase 2 da Pós-Graduação em Desenvolvimento de Software Full Stack da FIAP, agora disponibilizada em uma aplicação mobile.

A solução utiliza React Native e TypeScript, integrando autenticação JWT, gerenciamento de usuários, controle de permissões e operações de posts e comentários por meio de uma API REST.