<div align="center">
  <img src="/public/logo.png" width="200px"/>
  <h1>My Marvel Catalog (Frontend)</h1>
</div>

Aplicação frontend para exibir detalhes sobre o universo Marvel, que conta com as seguintes páginas:
- Login / Registro
- Personagens
- Revistas em quadrinhos
- Detalhes dos personagens e revistas

## Pré-requisitos
- Node.JS 14.x
- Rodar a API do Backend: [Backend](https://github.com/alissonsv/marvel-catalog-backend)

## Instalação

Clone o repositório e instale as dependências:
``` bash
git clone https://github.com/alissonsv/marvel-catalog-frontend
cd marvel-catalog-frontend/
npm install
```

Preencha o parâmetro dentro de `.env`:

Variável           | Descrição    
-------------------|-----------
REACT_APP_API_HOST | URL de onde está rodando a API


Rode o sistema:
`npm start`

## Screenshots

### Login Page
<img src="/screenshots/login.png" width="800px">

### Favorites Page
<img src="/screenshots/favorites.png" width="800px">

### Characters Page
<img src="/screenshots/characters.png" width="800px">

### Comics Page
<img src="/screenshots/comics.png" width="800px">


## Tecnologias Utilizadas
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Material-UI](https://material-ui.com/)
