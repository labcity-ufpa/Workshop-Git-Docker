# Comandos Básicos do Docker

Agora que você entende o modelo mental, vamos aprender os comandos essenciais com tutoriais práticos.

---

## 🧪 Tutorial 1: Rodando seu Primeiro Contêiner

```bash
docker run hello-world
```

O Docker vai:
1. Procurar a imagem `hello-world` localmente (não vai encontrar na primeira vez).
2. Baixar automaticamente do Docker Hub.
3. Criar e executar um contêiner a partir dela.
4. Imprimir a mensagem de boas-vindas e encerrar.

<div class="img-placeholder">
  <span>📸 Imagem: Terminal mostrando o output do `docker run hello-world` com mensagem "Hello from Docker!" e explicação do que ocorreu</span>
</div>

---

## 🧪 Tutorial 2: Rodando um Servidor Web (Nginx)

```bash
docker run -d -p 8080:80 --name meu-site nginx
```

Explicando cada flag:

| Flag | Significado |
| :--- | :--- |
| `-d` | Roda em **background** (detached mode) — libera o terminal |
| `-p 8080:80` | Mapeia a **porta 8080** da sua máquina para a **porta 80** do contêiner |
| `--name meu-site` | Dá um nome amigável ao contêiner (em vez de um hash aleatório) |
| `nginx` | Nome da imagem a usar |

Após rodar, abra `http://localhost:8080` no navegador:

<div class="img-placeholder">
  <span>📸 Imagem: Navegador mostrando a página "Welcome to nginx!" em http://localhost:8080</span>
</div>

---

## 📋 Tabela de Comandos: Gerenciando Contêineres

| Comando | O que faz |
| :--- | :--- |
| `docker ps` | Lista contêineres **em execução** agora. |
| `docker ps -a` | Lista **todos** os contêineres (inclusive os parados). |
| `docker stop <id/nome>` | Para um contêiner graciosamente (envia SIGTERM). |
| `docker start <id/nome>` | Inicia um contêiner que foi parado. |
| `docker restart <id/nome>` | Para e reinicia um contêiner. |
| `docker rm <id/nome>` | Remove um contêiner (deve estar parado). |
| `docker rm -f <id/nome>` | Para e remove um contêiner em um só comando. |
| `docker logs <id/nome>` | Mostra os logs do terminal do contêiner. |
| `docker logs -f <id/nome>` | Acompanha os logs em tempo real. |
| `docker exec -it <nome> bash` | Abre um terminal interativo dentro do contêiner. |

---

## 🧪 Tutorial 3: Interagindo com um Contêiner

Vamos abrir um terminal **dentro** do contêiner do Nginx que criamos:

```bash
docker exec -it meu-site bash
```

Agora você está **dentro do contêiner**! O prompt muda para algo como `root@a1b2c3d4:/#`.

```bash
# Dentro do contêiner:
ls /usr/share/nginx/html   # veja os arquivos servidos pelo Nginx
cat /usr/share/nginx/html/index.html

# Para sair do contêiner e voltar ao seu terminal:
exit
```

<div class="img-placeholder">
  <span>📸 Imagem: Terminal mostrando prompt mudando para "root@container_id:/#" após `docker exec -it meu-site bash`, e listagem de arquivos internos</span>
</div>

!!! tip "Dica: alguns contêineres usam `sh` em vez de `bash`"
    Se `bash` não funcionar (contêineres baseados em Alpine Linux), use `sh`:
    ```bash
    docker exec -it meu-site sh
    ```

---

## 📋 Tabela de Comandos: Gerenciando Imagens

| Comando | O que faz |
| :--- | :--- |
| `docker images` | Lista imagens baixadas localmente. |
| `docker pull <imagem>` | Baixa uma imagem do Docker Hub sem executar. |
| `docker rmi <id/nome>` | Remove uma imagem local. |
| `docker image prune` | Remove imagens sem tag ("dangling images"). |

---

## 🧪 Tutorial 4: Ciclo Completo — Criar, Parar e Remover

```bash
# 1. Sobe o Nginx
docker run -d -p 8080:80 --name meu-site nginx

# 2. Confira que está rodando
docker ps

# 3. Para o contêiner
docker stop meu-site

# 4. O contêiner existe mas está parado
docker ps -a

# 5. Reinicia se quiser
docker start meu-site

# 6. Remove definitivamente (precisa estar parado)
docker stop meu-site
docker rm meu-site

# Ou em um comando só:
docker rm -f meu-site
```

---

## 🧪 Tutorial 5: Rodando um Banco de Dados PostgreSQL

Este é um dos casos de uso mais comuns do Docker: subir um banco de dados de desenvolvimento sem instalar nada na máquina:

```bash
docker run -d \
  --name meu-postgres \
  -e POSTGRES_USER=aluno \
  -e POSTGRES_PASSWORD=senha123 \
  -e POSTGRES_DB=workshop \
  -p 5432:5432 \
  postgres:16-alpine
```

!!! note "Variáveis de ambiente com `-e`"
    A flag `-e` define variáveis de ambiente dentro do contêiner — usadas para configurar usuário, senha e nome do banco.

Conecte ao banco com o cliente `psql` (de dentro do próprio contêiner):
```bash
docker exec -it meu-postgres psql -U aluno -d workshop
```

Ou use qualquer cliente gráfico (DBeaver, TablePlus, pgAdmin) apontando para `localhost:5432`.

<div class="img-placeholder">
  <span>📸 Imagem: DBeaver ou pgAdmin conectando ao PostgreSQL rodando no Docker em localhost:5432 com usuário "aluno"</span>
</div>
