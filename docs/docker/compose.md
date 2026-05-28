# Docker Compose

O **Docker Compose** é uma ferramenta para definir e rodar aplicações com **múltiplos contêineres** usando um único arquivo `docker-compose.yml`. Em vez de rodar vários comandos `docker run` complexos e gerenciar redes manualmente, você descreve toda a infraestrutura em um arquivo YAML.

---

## Por que usar o Compose?

Imagine que seu projeto precisa de:
- Uma API em Node.js
- Um banco de dados PostgreSQL
- Um cache Redis

**Sem Compose** (trabalhoso e frágil):
```bash
docker network create minha-rede
docker run -d --name db --network minha-rede -e POSTGRES_PASSWORD=senha postgres
docker run -d --name cache --network minha-rede redis
docker run -d --name api --network minha-rede -p 3000:3000 minha-api
```

**Com Compose** (tudo em um arquivo, um comando):
```bash
docker-compose up -d
```

<div class="img-placeholder">
  <span>📸 Imagem: Diagrama mostrando os 3 serviços (API, PostgreSQL, Redis) conectados na mesma rede Docker criada pelo Compose</span>
</div>

---

## Estrutura do docker-compose.yml

```yaml
version: '3.8'        # versão do schema do Compose

services:             # cada serviço é um contêiner
  nome-do-servico:
    image: imagem     # usa uma imagem pronta do Hub
    # OU
    build: .          # constrói a partir do Dockerfile local
    ports:
      - "porta-host:porta-conteiner"
    environment:
      - VARIAVEL=valor
    volumes:
      - nome-volume:/caminho/no/conteiner
    depends_on:
      - outro-servico  # garante ordem de inicialização

volumes:              # volumes nomeados (declarados aqui)
  nome-volume:
```

---

## 🧪 Tutorial: Aplicação com API + PostgreSQL

**Passo 1 —** Crie o arquivo `docker-compose.yml`:

```yaml
version: '3.8'

services:

  # Banco de dados PostgreSQL
  db:
    image: postgres:16-alpine
    container_name: workshop-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: aluno
      POSTGRES_PASSWORD: senha123
      POSTGRES_DB: workshop
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data  # Persiste os dados no HD

  # Painel de administração do banco
  pgadmin:
    image: dpage/pgadmin4
    container_name: workshop-pgadmin
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@workshop.com
      PGADMIN_DEFAULT_PASSWORD: admin123
    ports:
      - "5050:80"
    depends_on:
      - db

volumes:
  pgdata:   # Docker gerencia este volume automaticamente
```

**Passo 2 —** Suba toda a infraestrutura:

```bash
docker-compose up -d
```

**Saída esperada:**
```
[+] Running 3/3
 ✔ Network workshop_default  Created
 ✔ Container workshop-db     Started
 ✔ Container workshop-pgadmin Started
```

**Passo 3 —** Acesse o pgAdmin em `http://localhost:5050`:

- Login: `admin@workshop.com` / `admin123`
- Crie uma conexão apontando para o host `db` (nome do serviço!) na porta `5432`

<div class="img-placeholder">
  <span>📸 Imagem: pgAdmin rodando em http://localhost:5050 com formulário de conexão preenchido apontando para o host "db"</span>
</div>

---

## 📋 Comandos Essenciais do Compose

```bash
# Sobe todos os serviços em background
docker-compose up -d

# Exibe os logs de todos os serviços em tempo real
docker-compose logs -f

# Exibe os logs apenas de um serviço específico
docker-compose logs -f db

# Lista os contêineres do Compose e seus status
docker-compose ps

# Para todos os contêineres (sem remover)
docker-compose stop

# Para E remove todos os contêineres e a rede criada
docker-compose down

# Para E remove contêineres, redes E VOLUMES (cuidado! apaga dados)
docker-compose down -v

# Rebuild forçado da imagem antes de subir
docker-compose up -d --build
```

---

## Variáveis de Ambiente com `.env`

Para não hardcodar senhas no `docker-compose.yml`, use um arquivo `.env`:

```bash
# .env (adicione ao .gitignore!)
POSTGRES_PASSWORD=minha_senha_segura
PGADMIN_PASSWORD=outra_senha
```

```yaml
# docker-compose.yml — referenciando o .env
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
```

O Compose lê automaticamente o arquivo `.env` na mesma pasta.

<div class="img-placeholder">
  <span>📸 Imagem: Docker Desktop — aba Containers mostrando os serviços do Compose agrupados como "workshop" com status rodando</span>
</div>
