# Volumes e Redes

---

## 💾 Volumes — Persistindo dados além do contêiner

Por padrão, quando um contêiner é deletado, **todos os arquivos criados dentro dele são perdidos para sempre**. Isso é proposital — contêineres são efêmeros. Mas e o banco de dados? E os arquivos de upload?

**Volumes** resolvem isso: mapeiam um diretório do contêiner para o disco físico do computador hospedeiro (ou um local gerenciado pelo Docker).

```mermaid
graph LR
    A["🖥️ Host (seu SSD)<br>/var/lib/docker/volumes/pgdata"] <-->|Volume Mapeado| B["📦 Contêiner<br>/var/lib/postgresql/data"]
    style A fill:#1e293b,stroke:#38bdf8
    style B fill:#1e293b,stroke:#22c55e
```
---

## Tipos de Volume

=== "Volume Nomeado (recomendado para produção)"
    Gerenciado pelo próprio Docker. O Docker decide onde armazenar no disco. Ideal para bancos de dados.

    ```bash
    # Cria o volume
    docker volume create meu-postgres-data

    # Usa o volume nomeado ao subir o contêiner
    docker run -d \
      --name meu-postgres \
      -v meu-postgres-data:/var/lib/postgresql/data \
      -e POSTGRES_PASSWORD=senha \
      postgres:16-alpine
    ```

    ```bash
    # Lista todos os volumes
    docker volume ls

    # Inspeciona detalhes (onde está no disco, tamanho, etc.)
    docker volume inspect meu-postgres-data
    ```

=== "Bind Mount (recomendado para desenvolvimento)"
    Mapeia uma **pasta específica da sua máquina** diretamente para dentro do contêiner. Qualquer mudança em um lado reflete no outro instantaneamente — perfeito para desenvolvimento.

    ```bash
    # Minha pasta local ./codigo é visível como /app/codigo dentro do contêiner
    docker run -d \
      --name meu-app-dev \
      -v $(pwd)/codigo:/app/codigo \
      -p 3000:3000 \
      node:18-alpine
    ```

    !!! tip "Hot reload com Bind Mount"
        Com um Bind Mount, você edita o arquivo no VS Code e a mudança aparece instantaneamente dentro do contêiner — sem precisar rebuildar a imagem!
---

## Tutorial: Testando a persistência

```bash
# 1. Cria um volume e um banco de dados
docker volume create demo-data
docker run -d --name demo-db \
  -v demo-data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=123 \
  postgres:16-alpine

# 2. Cria uma tabela dentro do banco
docker exec -it demo-db psql -U postgres -c \
  "CREATE TABLE usuarios (id SERIAL, nome TEXT); INSERT INTO usuarios (nome) VALUES ('Alice'), ('Bob');"

# 3. Destroi o contêiner completamente
docker rm -f demo-db

# 4. Recria o contêiner usando o MESMO volume
docker run -d --name demo-db \
  -v demo-data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=123 \
  postgres:16-alpine

# 5. Verifica que os dados ainda existem
docker exec -it demo-db psql -U postgres -c "SELECT * FROM usuarios;"
```

!!! success "Os dados sobreviveram!"
    Mesmo após destruir e recriar o contêiner, a tabela `usuarios` e seus registros ainda estão lá — porque os dados ficam no **volume**, não no contêiner.

---

## 🌐 Redes (Networks) — Contêineres se comunicando

Por padrão, contêineres são **completamente isolados** — não se enxergam. Para que se comuniquem, precisam estar na mesma rede Docker.

```mermaid
graph LR
    subgraph "Rede: minha-rede"
        A["📦 minhaapi<br>Node.js"] -->|"meubanco:5432"| B["📦 meubanco<br>PostgreSQL"]
    end
    C["🖥️ Seu computador"] -->|"localhost:3000"| A
```

O grande segredo: dentro de uma rede Docker, os contêineres se encontram pelo **nome do contêiner como hostname** (não por IP).

---

## Tutorial: Conectando dois contêineres

```bash
# 1. Cria uma rede isolada
docker network create minha-rede

# 2. Sobe o banco na rede
docker run -d \
  --name meubanco \
  --network minha-rede \
  -e POSTGRES_PASSWORD=senha \
  postgres:16-alpine

# 3. Sobe a API na mesma rede
docker run -d \
  --name minhaapi \
  --network minha-rede \
  -p 3000:3000 \
  meu-app-node
```

No código da `minhaapi`, a string de conexão do banco usa **o nome do contêiner** como host:
```javascript
// ✅ Correto — usa o nome do contêiner como DNS
const db = new Pool({ connectionString: "postgres://postgres:senha@meubanco:5432/postgres" });

// ❌ Errado — IPs internos do Docker mudam
const db = new Pool({ connectionString: "postgres://postgres:senha@172.17.0.2:5432/postgres" });
```

!!! note "O Docker Compose faz isso automaticamente"
    Quando você usa `docker-compose up`, o Compose cria uma rede automática para todos os serviços e permite que eles se comuniquem pelos nomes definidos em `services:`. Você não precisa criar redes manualmente.

---

## Comandos de Redes

```bash
# Lista redes existentes
docker network ls

# Cria uma rede
docker network create minha-rede

# Inspeciona a rede (mostra quais contêineres estão conectados)
docker network inspect minha-rede

# Remove redes não utilizadas
docker network prune
```
