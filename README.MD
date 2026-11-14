Aplicação Mobile de Posts - Documentação Técnica
1. Visão Geral

Esta aplicação consiste em um aplicativo mobile desenvolvido em React Native utilizando TypeScript, como parte da entrega da Fase 4 da Pós-Graduação em Desenvolvimento de Software Full Stack da FIAP.

A aplicação realiza a integração com a API REST desenvolvida na entrega da Fase 2.

O aplicativo permite:

Visualizar posts publicamente;
Consultar detalhes de posts;
Visualizar comentários;
Pesquisar posts por texto;
Realizar autenticação de usuários;
Adicionar comentários;
Criar posts;
Editar posts;
Gerenciar comentários;
Cadastrar alunos e professores;
Gerenciar usuários.

O sistema possui controle de acesso baseado em três perfis:

Perfil	Código
Professor	P
Aluno	A
Administrador	D

Cada perfil possui permissões específicas dentro da aplicação.

2. Tecnologias Utilizadas
Frontend Mobile
React Native 0.88.1
React 19.3.0
TypeScript 6
React Navigation 7
React Native Screens
React Native Safe Area Context
Lucide React Native
React Native SVG
Integração e Armazenamento
Axios
AsyncStorage
JWT Decode
Testes e Qualidade
Jest
React Test Renderer
ESLint
Prettier
Plataforma
Android
Android Studio
Android Emulator
3. Arquitetura

A aplicação utiliza uma organização baseada na separação de responsabilidades.

O contexto de autenticação centraliza as informações do usuário e suas permissões.

Os serviços são responsáveis pela comunicação com a API.

Fluxo da aplicação:

Aplicativo React Native
        |
        v
    Navegação
        |
        v
      Screens
        |
        v
      Context
        |
        v
     Services
        |
        v
       Axios
        |
        v
    API REST
        |
        v
    PostgreSQL


A autenticação utiliza JWT para identificar o usuário e controlar o acesso às funcionalidades.

4. Estrutura do Projeto
fase4
|
├── src
│
├── context
│   └── auth.context.tsx
│
├── services
│   ├── api.ts
│   ├── auth.service.ts
│   ├── pessoa.service.ts
│   └── post.service.ts
│
├── storage
│   └── auth.storage.ts
│
├── screens
│   ├── Login
│   │
│   ├── Home
│   │
│   ├── CreatePost
│   │
│   ├── PostDetails
│   │
│   └── Management
│       ├── TeacherList
│       ├── TeacherForm
│       ├── StudentList
│       └── StudentForm
│
├── App.tsx
├── package.json
└── README.md


A estrutura apresentada representa a organização lógica dos módulos. Os diretórios de telas podem conter componentes e arquivos auxiliares próprios.

5. Configuração Inicial
Pré-requisitos

Necessário possuir instalado:

Node.js 22.13.0 ou superior;
npm;
Android Studio;
Android SDK;
Emulador Android;
API da Fase 2 em execução.
6. Configuração da API

A comunicação com o backend é realizada utilizando Axios.

Arquivo:

src/services/api.ts


Configuração:

typescript
export const api = axios.create({
  baseURL: 'http://10.0.2.2:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


O endereço 10.0.2.2 é utilizado pelo emulador Android para acessar o localhost da máquina hospedeira.

A API deve estar em execução na porta 3000.

Importante:

O backend precisa estar iniciado antes da utilização do aplicativo.
O emulador deve possuir conectividade com a máquina que executa a API.
Caso seja utilizado um dispositivo físico, o endereço deverá ser substituído pelo IP local da máquina hospedeira.
7. Instalação

Entrar na pasta do projeto:

bash
cd fase4


Instalar as dependências:

bash
npm install

8. Executar Aplicação

Com o emulador Android iniciado, executar o Metro Bundler:

bash
npm start


Em outro terminal, executar:

bash
npm run android


O React Native realizará a compilação e instalação da aplicação no emulador Android.

9. Autenticação

A autenticação é realizada por meio da API da Fase 2.

Endpoint:

POST /api/auth/login


Body:

json
{
  "userName": "usuario",
  "password": "senha"
}


Após a autenticação, a API retorna o token JWT.

O token é armazenado localmente utilizando AsyncStorage.

Arquivo:

src/storage/auth.storage.ts


Operações disponíveis:

saveToken: armazena o token;
getToken: recupera o token;
removeToken: remove o token.

A biblioteca JWT Decode é utilizada para decodificar as informações do usuário presentes no token.

10. Contexto de Autenticação

Arquivo:

src/context/auth.context.tsx


O AuthContext disponibiliza globalmente as informações do usuário autenticado.

Responsabilidades:

Recuperar autenticação armazenada;
Carregar dados do usuário;
Realizar login;
Realizar logout;
Identificar o perfil do usuário;
Controlar permissões de acesso.

Permissões disponibilizadas:

Propriedade	Finalidade
isAuthenticated	Identifica usuários autenticados
isProfessor	Identifica professores
isStudent	Identifica alunos
isAdmin	Identifica administradores
canComment	Permite comentar
canCreatePost	Permite criar posts
canAccessManagement	Permite acessar gerenciamento
canManageAnyPost	Permite gerenciar qualquer post

O contexto utiliza React Context API para compartilhar essas informações entre as telas.

11. Controle de Acesso

As funcionalidades são disponibilizadas de acordo com o perfil autenticado.

Público

Não exige autenticação.

Listagem de posts;
Visualização de detalhes;
Visualização de comentários;
Pesquisa de posts.
Aluno

Perfil:

tipoUsuario = A


Permissões:

Visualizar posts;
Consultar comentários;
Adicionar comentários.
Professor

Perfil:

tipoUsuario = P


Permissões:

Visualizar posts;
Criar posts;
Editar os próprios posts;
Editar os próprios comentários;
Acessar gerenciamento de usuários;
Cadastrar alunos;
Cadastrar professores.
Administrador

Perfil:

tipoUsuario = D


Permissões:

Acesso completo;
Criar posts;
Editar qualquer post;
Excluir qualquer post;
Gerenciar comentários;
Editar comentários;
Excluir comentários;
Gerenciar alunos;
Gerenciar professores;
Alterar situação dos usuários.

As permissões são disponibilizadas pelo contexto de autenticação e utilizadas na navegação e nas funcionalidades da aplicação.

12. Integração com a API

Os serviços estão organizados por responsabilidade.

Autenticação

Arquivo:

src/services/auth.service.ts


Endpoint:

POST /api/auth/login


Responsável por realizar a autenticação do usuário.

Pessoas

Arquivo:

src/services/pessoa.service.ts


Endpoints utilizados:

GET    /api/pessoas
GET    /api/pessoas/:id
POST   /api/pessoas
PUT    /api/pessoas/:id
DELETE /api/pessoas/:id
PATCH  /api/pessoas/:id/situacao


Também são utilizados filtros para listagem de professores e alunos.

Posts e Comentários

Arquivo:

src/services/post.service.ts


Endpoints utilizados:

GET    /api/posts
GET    /api/posts/:id
GET    /api
