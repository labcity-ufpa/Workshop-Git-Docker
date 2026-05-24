# Criando suas próprias imagens: Dockerfile

O `Dockerfile` permite que você "dockerize" sua própria aplicação. Ele é um roteiro com as instruções para montar a sua Imagem.

### Exemplo de Dockerfile (Node.js)

```dockerfile
# 1. Escolhe a Imagem base
FROM node:18-alpine

# 2. Define a Pasta de trabalho dentro do contêiner
WORKDIR /app

# 3. Copia apenas os arquivos de dependências primeiro
COPY package*.json ./

# 4. Instala dependências
RUN npm install

# 5. Copia o resto do código fonte para dentro
COPY . .

# 6. Informa que o contêiner vai ouvir na porta 3000
EXPOSE 3000

# 7. Comando principal para iniciar a aplicação
CMD ["npm", "start"]
```

### Comandos de Build e Run

Para construir a imagem a partir do arquivo (o ponto final indica a pasta atual):
```bash
docker build -t meu-app-node .
```

Para rodar a imagem que você acabou de construir:
```bash
docker run -d -p 3000:3000 --name api-v1 meu-app-node
```
