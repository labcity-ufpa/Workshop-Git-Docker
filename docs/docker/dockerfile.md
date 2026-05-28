# Criando suas próprias imagens: Dockerfile

O `Dockerfile` é um arquivo de texto com instruções que o Docker segue para **construir sua imagem customizada**. É a "receita" que transforma seu código em um pacote portátil.

---

## Estrutura do Dockerfile

Cada linha do Dockerfile é uma **instrução** que cria uma camada na imagem:

| Instrução | Função |
| :--- | :--- |
| `FROM` | Define a imagem base (ponto de partida). |
| `WORKDIR` | Define o diretório de trabalho dentro do contêiner. |
| `COPY` | Copia arquivos da sua máquina para dentro da imagem. |
| `RUN` | Executa comandos durante a **construção** da imagem (ex: instalar dependências). |
| `ENV` | Define variáveis de ambiente permanentes. |
| `EXPOSE` | Documenta qual porta o contêiner vai usar (não publica automaticamente). |
| `CMD` | Define o comando padrão que roda quando o contêiner é iniciado. |
| `ENTRYPOINT` | Similar ao CMD, mas mais rígido — define o executável principal. |

---

## 🧪 Tutorial 1: Dockerizando uma Aplicação Node.js

**Passo 1 —** Crie a estrutura de arquivos:

```bash
mkdir meu-app && cd meu-app
```

Crie `app.js`:
```javascript
const http = require('http');
const port = 3000;

http.createServer((req, res) => {
  res.end('Olá do meu contêiner Docker!\n');
}).listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
```

Crie `package.json`:
```json
{
  "name": "meu-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node app.js"
  }
}
```

**Passo 2 —** Crie o `Dockerfile` na mesma pasta:

```dockerfile
# 1. Imagem base — Node.js 18 em versão Alpine (bem leve, ~50MB)
FROM node:18-alpine

# 2. Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# 3. OTIMIZAÇÃO: copia apenas os arquivos de dependências primeiro
#    (o Docker cacheia esta camada — instala npm só quando package.json mudar)
COPY package*.json ./

# 4. Instala as dependências
RUN npm install

# 5. Copia o restante do código-fonte
COPY . .

# 6. Documenta que o app vai usar a porta 3000
EXPOSE 3000

# 7. Comando que será executado quando o contêiner iniciar
CMD ["node", "app.js"]
```
**Passo 3 —** Construa a imagem:

```bash
# -t = tag (nome:versão)
# . = contexto de build (pasta atual)
docker build -t meu-app-node:1.0 .
```

**Saída esperada (camadas sendo processadas):**
```
[+] Building 12.3s
 => FROM node:18-alpine                                  2.1s
 => WORKDIR /app                                         0.0s
 => COPY package*.json ./                                0.0s
 => RUN npm install                                      8.4s
 => COPY . .                                             0.1s
 => EXPOSE 3000                                          0.0s
 => CMD ["node", "app.js"]                               0.0s
 => exporting to image                                   1.7s
 => naming to meu-app-node:1.0                           0.0s
```

**Passo 4 —** Execute o contêiner:

```bash
docker run -d -p 3000:3000 --name minha-api meu-app-node:1.0
```

Acesse `http://localhost:3000` no navegador — você verá "Olá do meu contêiner Docker!" 🎉
---

## 🧪 Tutorial 2: O arquivo .dockerignore

Similar ao `.gitignore`, o `.dockerignore` evita que arquivos desnecessários sejam copiados para dentro da imagem:

Crie `.dockerignore` na raiz do projeto:
```text
# Dependências — o Docker vai instalar via npm install
node_modules/

# Arquivos de ambiente — não devem ir para a imagem
.env
.env.local

# Logs
*.log

# Arquivos do Git e da IDE
.git/
.gitignore
.vscode/
README.md
```

!!! tip "Por que ignorar `node_modules`?"
    A pasta `node_modules` pode ter centenas de MB. Sem o `.dockerignore`, o `COPY . .` copiaria tudo para a imagem, tornando-a enorme e o build lento. O correto é sempre instalar as dependências **dentro da imagem** via `RUN npm install`.

---

## Exemplo: Dockerfile para Python (FastAPI)

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copia e instala dependências primeiro (aproveitando o cache)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o código da aplicação
COPY . .

EXPOSE 8000

# Inicia o servidor FastAPI com Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## Verificando e inspecionando imagens

```bash
# Lista imagens criadas
docker images

# Inspeciona as camadas da imagem (histórico de build)
docker history meu-app-node:1.0

# Inspeciona detalhes completos da imagem em JSON
docker inspect meu-app-node:1.0
```
