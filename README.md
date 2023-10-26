# Listagem de produtos

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.7.

## Tecnologias utilizadas

1. Front-end
  1. [Angular 11](https://angular.io/)
  1. [Angular Material](https://material.angular.io/)
  1. [Bootstrap](https://getbootstrap.com/)
1. API
  1. [JSON server](https://www.npmjs.com/package/json-server)

## JSON Server

Serviço que simula localmente uma API para consumo. Usa como base o arquivo `db.json` da aplicação.

* Execute o comando `npm install -g json-server` para instalar o pacote npm da API.
* Execute o comando `json-server --watch db.json` na pasta do arquivo db.json (assets/json) para iniciar a API com os dados do arquivo.

## Acessando a aplicação

* Instale as dependências do projeto com o comando `npm install`.
* Após as configurações do ambiente local `ng serve`, a aplicação fica disponível pelo navegador através da URL `http://localhost:4200`
* Os recursos de API consumidos do JSON server rodam no `http://localhost:3000/`

## Teste unitário Angular

Caso deseje executar os testes unitários da aplicação.

* Execute o comando `ng test` para executar os testes via [Karma](https://karma-runner.github.io).