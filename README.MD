# Aplicação Mobile de Posts

## 1. Visão Geral

Esta aplicação consiste em um aplicativo mobile desenvolvido em **React Native** utilizando **TypeScript**, como parte da entrega da **Fase 4 da Pós-Graduação em Desenvolvimento de Software Full Stack da FIAP**.

A aplicação realiza integração com a API REST desenvolvida na entrega da Fase 2.

### Funcionalidades

- Visualizar posts publicamente;
- Consultar detalhes de posts;
- Visualizar comentários;
- Pesquisar posts por texto;
- Realizar autenticação de usuários;
- Adicionar comentários;
- Criar posts;
- Editar posts;
- Gerenciar comentários;
- Cadastrar alunos e professores;
- Gerenciar usuários.

### Perfis de Acesso

| Perfil | Código |
|---------|---------|
| Professor | P |
| Aluno | A |
| Administrador | D |

Cada perfil possui permissões específicas dentro da aplicação.

---

# 2. Tecnologias Utilizadas

## Frontend Mobile

- React Native 0.88.1
- React 19.3.0
- TypeScript 6
- React Navigation 7
- React Native Screens
- React Native Safe Area Context
- Lucide React Native
- React Native SVG

## Integração e Armazenamento

- Axios
- AsyncStorage
- JWT Decode

## Testes e Qualidade

- Jest
- React Test Renderer
- ESLint
- Prettier

## Plataforma

- Android
- Android Studio
- Android Emulator

---

# 3. Arquitetura

A aplicação utiliza uma organização baseada em separação de responsabilidades.

- O contexto de autenticação centraliza informações do usuário e permissões.
- Os serviços são responsáveis pela comunicação com a API.
- O armazenamento local mantém os dados de autenticação.

## Fluxo da Aplicação

```text
Aplicativo React Native
        │
        ▼
    Navegação
        │
        ▼
      Screens
        │
        ▼
      Context
        │
        ▼
     Services
        │
        ▼
       Axios
        │
        ▼
      API REST
        │
        ▼
    PostgreSQL
```

A autenticação utiliza **JWT** para identificação do usuário e controle de acesso às funcionalidades.

---

# 4. Estrutura do Projeto

```text
fase4
│
├── src
│   │
│   ├── context
│   │   └── auth.context.tsx
│   │
│   ├── services
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── pessoa.service.ts
│   │   └── post.service.ts
│   │
│   ├── storage
│   │   └── auth.storage.ts
│   │
│   ├── screens
│   │   ├── Login
│   │   ├── Home
│   │   ├── CreatePost
│   │   ├── PostDetails
│   │   └── Management
│   │       ├── TeacherList
│   │       ├── TeacherForm
│   │       ├── StudentList
│   │       └── StudentForm
│
├── App.tsx
├── package.json
└── README.md
```

A estrutura apresentada representa a organização lógica dos módulos. Os diretórios de telas podem conter componentes e arquivos auxiliares próprios.

---

# 5. Configuração Inicial

## Pré-Requisitos

Certifique-se de possuir instalado:

- Node.js 22.13.0 ou superior;
- npm;
- Android Studio;
- Android SDK;
- Emulador Android;
- API da Fase 2 em execução.

---

# 6. Configuração da API

A comunicação com o backend é realizada utilizando **Axios**.

Arquivo:

```text
src/services/api.ts
```

Configuração:

```typescript
export const api = axios.create({
  baseURL: 'http://10.0.2.2:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Observações

O endereço `10.0.2.2` é utilizado pelo emulador Android para acessar o localhost da máquina hospedeira.

A API deve estar executando na porta `3000`.

### Importante

- O backend precisa estar iniciado antes da utilização do aplicativo;
- O emulador deve possuir conectividade com a máquina hospedeira;
- Em dispositivos físicos, substitua `10.0.2.2` pelo IP local da máquina.

---

# 7. Instalação

Entrar na pasta do projeto:

```bash
cd fase4
```

Instalar dependências:

```bash
npm install
```

---

# 8. Executar Aplicação

Iniciar o Metro Bundler:

```bash
npm start
```

Em outro terminal:

```bash
npm run android
```

O React Native realizará a compilação e instalação da aplicação no emulador.

---

# 9. Autenticação

A autenticação é realizada por meio da API da Fase 2.

## Endpoint

```http
POST /api/auth/login
```

## Body

```json
{
  "userName": "usuario",
  "password": "senha"
}
```

Após a autenticação, a API retorna um token JWT.

O token é armazenado utilizando **AsyncStorage**.

Arquivo:

```text
src/storage/auth.storage.ts
```

## Operações Disponíveis

- saveToken
- getToken
- removeToken

A biblioteca **JWT Decode** é utilizada para decodificar as informações do usuário presentes no token.

---

# 10. Contexto de Autenticação

Arquivo:

```text
src/context/auth.context.tsx
```

O `AuthContext` disponibiliza globalmente as informações do usuário autenticado.

## Responsabilidades

- Recuperar autenticação armazenada;
- Carregar dados do usuário;
- Realizar login;
- Realizar logout;
- Identificar perfil do usuário;
- Controlar permissões.

## Permissões Disponibilizadas

| Propriedade | Finalidade |
|------------|------------|
| isAuthenticated | Usuário autenticado |
| isProfessor | Identifica professor |
| isStudent | Identifica aluno |
| isAdmin | Identifica administrador |
| canComment | Permissão para comentar |
| canCreatePost | Permissão para criar posts |
| canAccessManagement | Permissão para acessar gerenciamento |
| canManageAnyPost | Gerenciar qualquer post |

---

# 11. Controle de Acesso

## Público

Não exige autenticação.

Permissões:

- Listagem de posts;
- Visualização de detalhes;
- Visualização de comentários;
- Pesquisa de posts.

---

## Aluno

```text
tipoUsuario = A
```

Permissões:

- Visualizar posts;
- Consultar comentários;
- Adicionar comentários.

---

## Professor

```text
tipoUsuario = P
```

Permissões:

- Visualizar posts;
- Criar posts;
- Editar os próprios posts;
- Editar os próprios comentários;
- Acessar gerenciamento de usuários;
- Cadastrar alunos;
- Cadastrar professores.

---

## Administrador

```text
tipoUsuario = D
```

Permissões:

- Acesso completo;
- Criar posts;
- Editar qualquer post;
- Excluir qualquer post;
- Gerenciar comentários;
- Editar comentários;
- Excluir comentários;
- Gerenciar alunos;
- Gerenciar professores;
- Alterar situação dos usuários.

---

# 12. Integração com a API

## Autenticação

Arquivo:

```text
src/services/auth.service.ts
```

Endpoint:

```http
POST /api/auth/login
