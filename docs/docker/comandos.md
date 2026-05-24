# Comandos Básicos do Docker

### Rodando o primeiro contêiner
```bash
docker run hello-world
```

### Gerenciando Contêineres

| Comando | Função |
| :--- | :--- |
| `docker ps` | Lista contêineres em execução. |
| `docker ps -a` | Lista todos os contêineres (mesmo os parados). |
| `docker stop <id/nome>` | Para um contêiner graciosamente. |
| `docker start <id/nome>` | Inicia um contêiner parado. |
| `docker rm <id/nome>` | Remove um contêiner (ele deve estar parado primeiro). |
| `docker logs <id/nome>` | Mostra os logs emitidos no terminal do contêiner. |
| `docker exec -it <nome> bash` | Abre um terminal interativo (bash/sh) dentro do contêiner. |

### Gerenciando Imagens

| Comando | Função |
| :--- | :--- |
| `docker images` | Lista imagens baixadas localmente. |
| `docker pull <imagem>` | Baixa uma imagem do Docker Hub para a máquina. |
| `docker rmi <id/nome>` | Remove uma imagem do sistema. |

### Exemplo Prático: Rodando um Nginx (Servidor Web)

```bash
# -d: roda em background (detached mode)
# -p 8080:80: mapeia a porta 8080 da sua máquina para a 80 do contêiner
# --name: dá um nome fácil de lembrar ao contêiner
docker run -d -p 8080:80 --name meu-site nginx
```

Após rodar, acesse `http://localhost:8080` no seu navegador.
