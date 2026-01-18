### Iniciar sequelize config
npx sequelize-cli init

### Criar arquivo de migration sequelize
npx sequelize-cli migration:generate --name nome-da-migration

--- 
POC Sequelize - DDD + Clean Architecture

## Descrição

Esta é uma Prova de Conceito (POC) que demonstra a implementação de uma aplicação web utilizando **Domain-Driven Design (DDD)** combinado com **Clean Architecture**, integrada com **Express.js** e **Sequelize** como ORM para PostgreSQL. O foco principal é explorar uma arquitetura escalável e organizada, separando responsabilidades em camadas bem definidas.

O projeto inclui funcionalidades básicas de criação de usuários e posts em um fórum, com testes unitários e de integração usando Vitest.

## Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Express.js** para o servidor HTTP
- **Sequelize** como ORM para PostgreSQL
- **PostgreSQL** como banco de dados
- **Docker** para containerização do banco
- **Vitest** para testes
- **Zod** para validação de dados
- Outros: UUID, Reflect Metadata, etc.

## Arquitetura

A arquitetura segue os princípios de **DDD** e **Clean Architecture**:

- **Domain Layer**: Contém as entidades de negócio (`src/domain/`) e regras de negócio.
- **Application Layer**: Use cases e interfaces de repositórios (`src/domain/*/application/`).
- **Infrastructure Layer**: Implementações concretas, como repositórios Sequelize, controladores HTTP e configurações (`src/infra/`).
- **Core**: Utilitários compartilhados, como Either para tratamento de erros (`src/core/`).

Isso promove separação de responsabilidades, testabilidade e facilidade de manutenção.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- npm ou yarn

## Configuração Inicial

### 1. Banco de Dados com Docker

O projeto utiliza PostgreSQL em um container Docker. Para iniciar o banco:

```bash
docker-compose up -d
```

Isso criará um container PostgreSQL com as seguintes configurações:
- Usuário: `postgres`
- Senha: `docker`
- Banco: `minha_poc`
- Porta: `5432`

Os dados são persistidos em `./data/pg`.

### 2. Configuração do Sequelize

O Sequelize CLI é usado para gerenciar migrations e seeds. A configuração está em `src/infra/database/sequelize/config-cli.js` para desenvolvimento (PostgreSQL local) e em `src/infra/database/sequelize/config.ts` para uso no código (com variáveis de ambiente).

Para inicializar o Sequelize (se necessário, mas o projeto já tem migrations):

```bash
npx sequelize-cli init
```

Isso cria pastas como `config`, `migrations`, `models`, `seeders` na raiz, mas no projeto elas estão em `src/infra/database/sequelize/`.

Para gerar uma nova migration:

```bash
npx sequelize-cli migration:generate --name nome-da-migration
```

Para executar as migrations existentes:

```bash
npx sequelize-cli db:migrate
```

Para reverter uma migration:

```bash
npx sequelize-cli db:migrate:undo
```

Para criar seeds (dados iniciais):

```bash
npx sequelize-cli seed:generate --name nome-do-seed
```

E executar:

```bash
npx sequelize-cli db:seed:all
```

Nota: As migrations existentes criam tabelas `users` e `posts`. Certifique-se de que o banco está rodando antes de executar.

## Como Rodar o Projeto

### 1. Instalar Dependências

```bash
npm install
```

### 2. Executar Migrations

Após iniciar o banco com Docker, execute as migrations:

```bash
npx sequelize-cli db:migrate
```

### 3. Iniciar o Servidor

Para desenvolvimento (com hot reload):

```bash
npm run start:dev
```

O servidor rodará em `http://localhost:3333`.

Para produção (após build):

```bash
npm run start
```

### 4. Testes

Executar todos os testes:

```bash
npm test
```

Testes em modo watch:

```bash
npm run test:watch
```

Cobertura de testes:

```bash
npm run test:cov
```

Testes E2E:

```bash
npm run test:e2e
```

Testes E2E em watch:

```bash
npm run test:e2e:watch
```

## Estrutura do Projeto

- `src/core/`: Utilitários core, como Either e entidades base.
- `src/domain/`: Camadas de domínio (accounts e forum), com entidades, use cases e repositórios.
- `src/infra/`: Implementações de infraestrutura (banco, HTTP).
- `test/`: Testes e repositórios em memória para testes.
- `docker-compose.yml`: Configuração do banco PostgreSQL.
- `package.json`: Scripts e dependências.
- `tsconfig.json`: Configuração TypeScript.
- `vitest.config.ts`: Configuração de testes.

## Prós e Contras da Abordagem

### Prós

- **Separação de Responsabilidades**: DDD + Clean Architecture facilita a manutenção e evolução, isolando regras de negócio.
- **Testabilidade**: Camadas bem definidas permitem testes unitários isolados e mocks fáceis.
- **Escalabilidade**: Estrutura organizada suporta crescimento sem acoplamento excessivo.
- **ORM Flexível**: Sequelize abstrai o banco, facilitando mudanças de dialeto (PostgreSQL aqui, mas configurável para MySQL em produção).
- **Type Safety**: TypeScript reduz erros em tempo de execução.
- **Containerização**: Docker simplifica setup do ambiente de desenvolvimento.

### Contras

- **Complexidade Inicial**: A arquitetura adiciona overhead para projetos pequenos, com muitas pastas e interfaces.
- **Curva de Aprendizado**: Requer conhecimento de DDD e Clean Architecture, o que pode ser desafiador para equipes novas.
- **Overhead de ORM**: Sequelize pode gerar queries complexas e exigir mapeamento manual entre modelos e entidades de domínio.
- **Configuração de Ambiente**: Dependência de Docker e variáveis de ambiente pode complicar deploy em ambientes sem containerização.
- **Performance**: Camadas extras podem introduzir latência leve em operações simples.
- **Manutenção de Migrations**: Gerenciar migrations manualmente pode ser propenso a erros em equipes grandes.

Essa abordagem é ideal para aplicações de médio a grande porte onde a clareza arquitetural supera a simplicidade. Para POCs rápidas, uma estrutura mais simples poderia ser suficiente.