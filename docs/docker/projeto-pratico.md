# Projeto Prático de Docker

Vamos colocar todo o "Universo Docker" em prática. Neste exercício, criaremos um ambiente clássico: uma **Aplicação Web (Node.js)** que se comunica com um **Banco de Dados (Redis)**, ambos isolados e conectados via rede Docker.

## 1. O Código da Aplicação (app.js)

Crie uma pasta chamada `meu-app-docker` e dentro dela crie um arquivo `app.js` (uma API super simples):

```javascript
const express = require('express');
const redis = require('redis');

const app = express();
// O pulo do gato: conectando no host 'banco-redis' (DNS do Docker)
const client = redis.createClient({ url: 'redis://banco-redis:6379' });

client.connect().catch(console.error);

app.get('/', async (req, res) => {
  await client.incr('visitas');
  const visitas = await client.get('visitas');
  res.send(`Olá Mundo! Esta página foi visitada ${visitas} vezes.`);
});

app.listen(3000, () => console.log('API rodando na porta 3000!'));
```

*Também crie um `package.json` rápido contendo `express` e `redis` nas dependências.*

## 2. A Receita do Contêiner (Dockerfile)

No mesmo diretório, crie um `Dockerfile` para ensinar o Docker a construir a imagem desta aplicação:

```dockerfile
# Usa uma imagem muito leve do Node.js
FROM node:18-alpine

WORKDIR /usr/src/app

# Otimização de cache: copia e instala dependências primeiro
COPY package*.json ./
RUN npm install

# Copia o resto do código
COPY . .

EXPOSE 3000

# Executa o app
CMD ["node", "app.js"]
```

## 3. Orquestrando tudo (docker-compose.yml)

Como temos 2 serviços (a API Node e o banco Redis), se fôssemos usar comandos puros, teríamos que criar uma rede manualmente (`docker network create`) e linkar os comandos `docker run`. Para evitar isso, criamos o arquivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # Serviço 1: Nossa aplicação Node
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - banco-redis

  # Serviço 2: Banco de dados Redis pronto
  banco-redis:
    image: "redis:alpine"
    volumes:
      - redis-data:/data

volumes:
  # Persistência: se o Redis morrer, não perdemos as visitas!
  redis-data:
```

## 4. O Momento Mágico

Agora, basta abrir o terminal na sua pasta e digitar um único comando:

```bash
docker-compose up -d
```

O Docker irá:
1. Baixar a imagem do Redis (se você não tiver).
2. Baixar a imagem do Node (alpine).
3. Seguir as regras do seu `Dockerfile` para instalar o Node e construir a *sua* imagem da API.
4. Criar uma rede isolada automaticamente para os dois conversarem.
5. Criar o volume para salvar os dados do Redis no seu HD.
6. Ligar o banco de dados e, logo após, ligar a sua API.

Abra o navegador em `http://localhost:3000` e atualize a página algumas vezes. Você verá o contador subindo. 

Se você derrubar a infraestrutura (`docker-compose down`) e subir de novo, a contagem **não será zerada**, pois configuramos um Volume para o Redis!

!!! success "Você dominou o Docker"
    Em apenas 3 arquivos, você definiu e documentou a infraestrutura completa de um sistema. Qualquer outro desenvolvedor no mundo que clonar esse projeto no Git só precisará rodar `docker-compose up -d` para ver tudo funcionando.
