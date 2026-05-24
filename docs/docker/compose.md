# Docker Compose

O Docker Compose é uma ferramenta essencial para definir e rodar aplicações compostas de múltiplos contêineres usando um único arquivo YAML (`docker-compose.yml`).

Imagine que você tem uma API em Node.js e um banco de dados PostgreSQL. Em vez de rodar múltiplos comandos `docker run` complexos e gerenciar redes à mão, você escreve um arquivo estruturado:

```yaml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: usuario
      POSTGRES_PASSWORD: senha123
      POSTGRES_DB: meubanco
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  api:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://usuario:senha123@db:5432/meubanco

volumes:
  pgdata:
```

### Comandos essenciais do Compose

```bash
# Sobe toda a infraestrutura definida no arquivo em background
docker-compose up -d

# Visualiza os logs de todos os serviços unificados
docker-compose logs -f

# Derruba toda a infraestrutura e as redes criadas
docker-compose down
```
