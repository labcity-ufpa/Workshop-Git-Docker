# Boas Práticas com Docker

---

## ✅ O que FAZER

=== "✅ O que FAZER"

    **Use imagens base oficiais e confiáveis**

    Sempre prefira as imagens mantidas pelas equipes oficiais no Docker Hub — elas têm suporte, patches de segurança e são auditadas pela comunidade.
    ```dockerfile
    FROM node:18-alpine      # ✅ Imagem oficial do Node.js
    FROM python:3.11-slim    # ✅ Imagem oficial do Python
    ```

    ---

    **Trave versões específicas das imagens**

    Nunca use `:latest` em ambientes de produção. Uma atualização silenciosa pode quebrar seu sistema.
    ```dockerfile
    FROM postgres:16.2-alpine  # ✅ Versão exata e previsível
    # FROM postgres:latest     # ❌ Pode mudar sem aviso e quebrar tudo
    ```

    ---

    **Prefira imagens `-alpine` ou `-slim`**

    São versões reduzidas que têm apenas o essencial, resultando em imagens menores, builds mais rápidos e menor superfície de ataque.
    ```dockerfile
    FROM node:18-alpine    # ~50MB  ✅
    # FROM node:18         # ~1GB   ❌ (muito maior)
    ```

    ---

    **Use `.dockerignore`**

    Similar ao `.gitignore`, evita que arquivos desnecessários entrem na imagem, acelerando o build.
    ```text
    node_modules/
    .env
    .git/
    *.log
    ```

    ---

    **Otimize a ordem das camadas no Dockerfile**

    O Docker usa cache por camadas. Coloque o que muda com menos frequência primeiro (dependências) e o que muda com mais frequência por último (código):
    ```dockerfile
    # ✅ Ordem otimizada — cache de npm aproveitado se apenas o código mudar
    COPY package*.json ./
    RUN npm install
    COPY . .

    # ❌ Ordem ruim — toda vez que qualquer arquivo mudar, reinstala dependências
    # COPY . .
    # RUN npm install
    ```
---

    **Use variáveis de ambiente para configuração**

    Nunca coloque configurações diferentes de ambiente dentro da imagem. Injete via variáveis em runtime:
    ```bash
    docker run -e DATABASE_URL=postgres://... minha-api
    ```
    ```yaml
    # docker-compose.yml
    environment:
      DATABASE_URL: ${DATABASE_URL}
    ```

=== "❌ O que NÃO FAZER"

    **Não salve dados importantes dentro do contêiner**

    Contêineres são efêmeros — ao remover ou atualizar, você perde tudo que não estiver em um volume.
    ```bash
    # ❌ Dados perdidos ao remover o contêiner
    docker rm meu-banco

    # ✅ Use volumes para persistência
    docker run -v pgdata:/var/lib/postgresql/data postgres
    ```

    ---

    **Não coloque senhas hardcoded no Dockerfile ou docker-compose.yml**

    ```dockerfile
    # ❌ NUNCA faça isso
    ENV DB_PASSWORD=minha_senha_super_secreta
    ```

    ```yaml
    # ✅ Use variáveis de ambiente com arquivo .env
    environment:
      DB_PASSWORD: ${DB_PASSWORD}
    ```

    ---

    **Não coloque múltiplos serviços no mesmo contêiner**

    A regra de ouro do Docker é: **"Um serviço principal por contêiner"**.
    ```
    # ❌ Errado: API + Banco + Redis no mesmo contêiner
    # ✅ Correto: um contêiner para cada serviço, gerenciados pelo Compose
    ```

    ---

    **Não use `root` como usuário padrão em produção**

    Por segurança, crie um usuário sem privilégios para rodar a aplicação:
    ```dockerfile
    # ✅ Boa prática de segurança
    RUN addgroup -S appgroup && adduser -S appuser -G appgroup
    USER appuser
    CMD ["node", "app.js"]
    ```

---

## 🏷️ Versionamento de Imagens

Adote uma estratégia de tags consistente para suas imagens:

```bash
# Build com múltiplas tags
docker build \
  -t meu-app:1.2.3 \      # versão exata (semver)
  -t meu-app:1.2 \        # versão minor
  -t meu-app:latest \     # mais recente
  .

# Envie para o registry
docker push meu-app:1.2.3
docker push meu-app:latest
```
---

## 📦 Checklist antes de ir para produção

- [ ] A imagem usa uma versão específica (não `:latest`)?
- [ ] O Dockerfile tem um `.dockerignore` adequado?
- [ ] As dependências são instaladas antes de copiar o código (cache)?
- [ ] Senhas e tokens são injetados via variáveis de ambiente (não hardcoded)?
- [ ] Dados importantes são persistidos em volumes?
- [ ] O contêiner usa um usuário sem privilégios de root?
- [ ] A imagem foi testada localmente antes de subir?
