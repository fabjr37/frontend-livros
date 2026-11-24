# Frontend de Livros - React + Vite

Frontend simples em React para consumir a API de Livros (Flask) e exibir o catálogo.

## Objetivo

Consumir a API Flask (`api-livros-flask`) e exibir os 3 livros em uma lista, apenas quando o usuário clicar no botão "Buscar Livros".

## Tecnologias

- React 18
- Vite 5
- Fetch API (nativo do navegador)

## Como rodar os dois projetos juntos

### 1. Iniciar a API Flask (Terminal 1)

```bash
cd api-livros-flask
venv\Scripts\activate
python app.py
```

A API estará rodando em: **http://127.0.0.1:5000**
- Endpoint: `GET /livros`

### 2. Iniciar o Frontend Vite (Terminal 2)

```bash
cd frontend-livros
npm run dev
```

O Vite estará rodando em: **http://127.0.0.1:5173** (ou porta indicada no terminal)

### 3. Testar

1. Abra o navegador em http://127.0.0.1:5173
2. Clique no botão **"Buscar Livros"**
3. Os 3 livros devem aparecer na lista

## Como funciona o proxy

O arquivo `vite.config.js` está configurado com proxy:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:5000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

- Quando o frontend faz `fetch('/api/livros')`, o Vite intercepta
- Remove o prefixo `/api` e encaminha para `http://127.0.0.1:5000/livros`
- Isso evita problemas de CORS durante o desenvolvimento

## Funcionalidades

- ✅ Título "Catálogo de Livros"
- ✅ Botão "Buscar Livros" (texto exato)
- ✅ Busca **apenas ao clicar** (sem useEffect)
- ✅ Mostra "Carregando livros..." durante a consulta
- ✅ Mostra erro claro se API estiver fora do ar
- ✅ Exibe ID, Título, Autor e Ano de cada livro
- ✅ Usa `key={livro.id}` na lista
- ✅ Não tem livros fixos no código React

## Build de produção

Para gerar a versão de produção:

```bash
cd frontend-livros
npm run build
```

Os arquivos otimizados ficarão na pasta `dist/`.