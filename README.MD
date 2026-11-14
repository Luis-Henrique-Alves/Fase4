🎓 Fase 4 - Plataforma de Posts e Comentários

!React Native !TypeScript !Axios !Android !Status

Projeto desenvolvido como parte da entrega do Módulo 4 da Pós-Graduação em Desenvolvimento de Software Full Stack da FIAP.

A aplicação consiste em uma plataforma mobile para publicação, visualização e interação com posts e comentários, com controle de acesso baseado nos diferentes perfis de usuários.

📋 Sobre o projeto

A plataforma permite que usuários visualizem publicações e comentários, realizem buscas e interajam de acordo com suas permissões.

A aplicação possui três perfis de acesso:

Aluno: pode visualizar publicações e comentários, realizar buscas e adicionar comentários.
Professor: pode criar publicações, editar suas próprias publicações e comentários, além de acessar o gerenciamento de usuários.
Administrador: possui acesso completo, podendo criar, editar e excluir publicações e comentários, inclusive de outros usuários, além de gerenciar alunos e professores.

As informações são consumidas por meio de uma API local desenvolvida na entrega da Fase 2 do curso.

🚀 Funcionalidades
🌐 Funcionalidades públicas
Visualização de publicações.
Visualização de detalhes das publicações.
Visualização de comentários.
Busca de publicações.
👨‍🎓 Alunos
Login na plataforma.
Visualização de publicações.
Visualização de comentários.
Adição de comentários.
👨‍🏫 Professores
Login na plataforma.
Criação de publicações.
Edição das próprias publicações.
Edição dos próprios comentários.
Acesso ao gerenciamento de usuários.
Cadastro e gerenciamento de alunos e professores.
🛡️ Administradores
Acesso completo à plataforma.
Criação de publicações.
Edição e exclusão de qualquer publicação.
Criação, edição e exclusão de comentários.
Gerenciamento de alunos.
Gerenciamento de professores.
Alteração da situação dos usuários.
🛠️ Tecnologias utilizadas
Tecnologia	Finalidade
React Native	Desenvolvimento mobile
TypeScript	Tipagem estática
React 19	Biblioteca principal
React Navigation 7	Navegação entre telas
Axios	Comunicação com a API
AsyncStorage	Armazenamento local do token
JWT Decode	Decodificação de tokens JWT
Lucide React Native	Ícones
React Native SVG	Renderização de elementos vetoriais
Jest	Testes automatizados
ESLint	Padronização e análise de código
📁 Estrutura do projeto
text
fase4/
│
├── src/
│   ├── context/
│   │   └── auth.context.tsx
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── pessoa.service.ts
│   │   └── post.service.ts
│   │
│   ├── storage/
│   │   └── auth.storage.ts
│   │
│   └── screens/
│       ├── Login/
│       ├── Home/
│       ├── CreatePost/
│       ├── PostDetails/
│       └── Management/
│           ├── TeacherList/
│           ├── TeacherForm/
│           ├── StudentList/
│           └── StudentForm/
│
├── App.tsx
├── package.json
├── tsconfig.json
└── README.md


Estrutura organizada por responsabilidades, separando autenticação, serviços de comunicação com a API, armazenamento e telas da aplicação.

⚙️ Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

Node.js versão 22.13.0 ou superior.
npm.
React Native CLI.
Android Studio.
Android SDK.
Emulador Android configurado.
API da Fase 2 em execução.
📥 Instalação

Clone o repositório:

bash
git clone URL_DO_SEU_REPOSITORIO


Acesse a pasta do projeto:

bash
cd fase4


Instale as dependências:

bash
npm install

🔌 Configuração da API

A aplicação utiliza Axios para realizar as requisições HTTP à API desenvolvida na Fase 2.

A configuração atual está no arquivo src/services/api.ts:

typescript
export const api = axios.create({
  baseURL: 'http://10.0.2.2:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


Importante: o endereço 10.0.2.2 é utilizado pelo emulador Android para acessar o localhost da máquina hospedeira.

Antes de executar a aplicação, certifique-se de que:

A API da Fase 2 esteja em execução.
O servidor esteja disponível na porta 3000.
O emulador Android consiga acessar a API.

Caso utilize um dispositivo físico, será necessário substituir o endereço pelo IP local da máquina que hospeda a API.

▶️ Executando a aplicação

Com o emulador Android aberto, execute:

Terminal 1 — Metro Bundler

bash
npm start


Terminal 2 — Aplicação Android

bash
npm run android


A aplicação será compilada e executada no emulador Android.

🔐 Autenticação e controle de acesso

A autenticação é realizada por meio de JWT (JSON Web Token).

Após o login, o token é armazenado localmente utilizando AsyncStorage.

O contexto global de autenticação (AuthContext) disponibiliza as informações do usuário e suas permissões para toda a aplicação.

Os perfis são identificados pelos seguintes códigos:

Código	Perfil
P	Professor
A	Aluno
D	Administrador

O controle de permissões é realizado por meio de propriedades como:

isAuthenticated
isProfessor
isStudent
isAdmin
canComment
canCreatePost
canAccessManagement
canManageAnyPost

Essa estrutura permite controlar o acesso às funcionalidades de acordo com o perfil autenticado.

🔗 Integração com a API

Os serviços responsáveis pela comunicação com o backend estão organizados em arquivos específicos.

Autenticação
text
POST /api/auth/login

Pessoas
text
GET    /api/pessoas
GET    /api/pessoas/:id
POST   /api/pessoas
PUT    /api/pessoas/:id
DELETE /api/pessoas/:id
PATCH  /api/pessoas/:id/situacao

Publicações
text
GET    /api/posts
GET    /api/posts/:id
GET    /api/posts/search
POST   /api/posts
PUT    /api/posts/:id
DELETE /api/posts/:id

Comentários
text
POST   /api/posts/:id/comentarios
PUT    /api/posts/comentarios/:idComentario
DELETE /api/posts/comentarios/:idComentario

🧪 Testes e qualidade de código

O projeto possui configuração para execução de testes automatizados com Jest e análise estática com ESLint.

Executar os testes:

bash
npm test


Executar o ESLint:

bash
npm run lint

🎯 Objetivo acadêmico

Este projeto tem como objetivo aplicar os conhecimentos adquiridos durante a Pós-Graduação em Desenvolvimento de Software Full Stack da FIAP, contemplando:

Desenvolvimento de aplicações mobile com React Native.
Integração entre frontend e backend.
Consumo de APIs REST.
Autenticação utilizando JWT.
Gerenciamento de estado global com Context API.
Controle de acesso baseado em perfis.
Armazenamento local de dados.
Organização e arquitetura de projetos.
Desenvolvimento de interfaces mobile.
👩‍💻 Desenvolvimento

Projeto acadêmico desenvolvido para a entrega da Fase 4 — Pós-Graduação em Desenvolvimento de Software Full Stack | FIAP.

Tecnologia principal: React Native + TypeScript.

Plataforma de execução: Android Emulator.

<p align="center">
Desenvolvido com 💙 para a FIAP
</p>
