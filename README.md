# Api para teste de desenvolvedor - Pantore

Esse projeto é a API do de um teste de desenvolvedor para a Pantore. Esse app tem como objetivo a demonstação de uma aplicação back-end utilizando o framework Express para a construção da API, typeORM para a conexão com o banco e swagger para documentação. É uma aplicação simples e com diversas funcionalidades e validações.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão LTS do [`Node`](https://nodejs.org/pt).
- Você instalou e configurou o banco de dados [`MY SQL`](https://www.mysql.com/downloads/). Como forma alternativa, você pode instalar via [`Docker`](https://hub.docker.com/_/mysql).
- Você possui o gerenciador de pacotes (Opicional) [`Yarn`](https://classic.yarnpkg.com/lang/en/docs/install)
- Você tem uma máquina `Windows`, `Mac` ou `Linux`.

## 🚀 Instalando dependências da API Pantore

Para instalar as dependências do projeto, execute os seguintes comandos:

```
npm install
# or
yarn install
```

### Configuração do banco de dados e variáveis de ambiente

Para configurar o banco de dados e popula-lo com os dados necessários para o funcionamento do projeto, execute as seguintes ações:

1. Crie um cópia do arquivo `.env.example` chamado `.env`. Nele serão inseridas as variáveis de ambiente utilizadas no projeto.
2. Após criado esse arquivo, preencha-o com as suas credências de acesso ao banco de dados e todas as demais variáveis.
3. Insira o seguinte comando para executar as migrations: `npm run typeorm migration:run` ou `yarn typeorm migration:run`.
4. Se necessário reverter uma migration, utilize o seguinte comando: `npm run typeorm migration:revert` ou `yarn typeorm migration:revert`.

## ☕ Usando a API Pantore

### Em modo desenvolvimento

```bash
npm run dev
# or
yarn dev
```

### Em modo produção

```bash
npm run build
# or
yarn build
```

Logo em seguida:

```bash
npm start
# or
yarn start
```

Após iniciar o projeto, verifique se ele está disponível na URL `http://localhost:3000`. Para fazer o uso das rotas de forma simples, basta acessar `http://localhost:3000/api-docs/` para ter acesso a documentação de todas as rotas.

## 📫 Contribuindo para a API Pantore

Para contribuir com o back-end, siga estas etapas:

1. Clone este repositório.
2. Crie uma branch: `git checkout -b <numero_da_tarefa>`.
3. Faça suas alterações e confirme-as: `git commit -m '<tipo_do_commit>: [<numero_da_tarefa>] <mensagem_commit>'`
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
5. Crie a solicitação de pull.
