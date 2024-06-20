# Agenda digital

### Para incialização da aplicação faça a instalação do NodeJs na versão v20.13.1, e o Docker na versão 26.1.1.

## Entre na pasta api usando o comando cd api, e rode os seguintes comandos:

1- `cp .env.example .env` - Para clonar o arquivo de .env.example para .env. <br/>
2- `npm install` - Para instalação das dependencias. <br/>
3- `docker compose up` - Para incializar o banco de dados, pode-se usar a flag `-d` após o up para não mostrar os logs no terminal. <br/>
4- `npx prisma migrate dev` - Para gerar a migrate do banco de dados. <br/>
5- `npm run start:dev` - Para rodar a aplicação em modo de desenvolvimento. <br/>

## Já na pasta de front, execute os comandos:

1- `npm install` - Para instalação de dependencias. <br/>
2- `npm run dev` - Para executar a aplicação. <br/>
3- No navegador de preferencia acesse a URL: "http://localhost:3000/" para ter acesso a aplicação. <br/>

### Como melhoria:

- Poderíamos usar autenticação para separar os eventos de acordo com o usuário. <br/>
- Criação de descrição no evento. <br/>
