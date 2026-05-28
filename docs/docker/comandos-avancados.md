# Comandos Avançados e Inspeção

Além de iniciar e parar contêineres, o Docker possui ferramentas embutidas poderosas para **debugar**, **monitorar** e **limpar** seu ambiente.

---

## 🔍 Inspecionando Contêineres

### `docker inspect` — Radiografia completa

Retorna um JSON com **todos os detalhes** de um contêiner, imagem ou rede:

```bash
docker inspect nome-do-conteiner
```

O JSON tem dezenas de campos. Para extrair informações específicas, use `--format`:

```bash
# Qual IP interno o contêiner recebeu?
docker inspect --format '{{.NetworkSettings.IPAddress}}' meu-nginx

# Quais variáveis de ambiente estão configuradas?
docker inspect --format '{{.Config.Env}}' meu-postgres

# Quais volumes estão mapeados?
docker inspect --format '{{json .Mounts}}' meu-postgres | python -m json.tool
```

<div class="img-placeholder">
  <span>📸 Imagem: Terminal mostrando o output do `docker inspect` com o JSON completo e um filtro `--format` extraindo o IP do contêiner</span>
</div>

---

## 📊 Monitoramento em Tempo Real

### `docker stats` — Dashboard de recursos

Exibe consumo de CPU, RAM, rede e disco de **todos os contêineres** em tempo real (como um `htop` para Docker):

```bash
docker stats
```

**Saída:**
```
CONTAINER ID   NAME          CPU %   MEM USAGE / LIMIT     MEM %   NET I/O       BLOCK I/O
a1b2c3d4e5f6   minha-api     0.5%    45.3MiB / 7.76GiB     0.6%    1.2kB / 890B  0B / 0B
b2c3d4e5f6a1   meu-postgres  0.1%    22.7MiB / 7.76GiB     0.3%    660B / 0B     8.19kB / 0B
```

Para monitorar apenas um contêiner:
```bash
docker stats minha-api
```

<div class="img-placeholder">
  <span>📸 Imagem: Terminal com `docker stats` rodando em tempo real, mostrando múltiplos contêineres com suas métricas de CPU e memória</span>
</div>

### `docker top` — Processos dentro do contêiner

Lista os processos do sistema operacional rodando **dentro** de um contêiner específico:

```bash
docker top minha-api
```

```
UID    PID    PPID   CMD
root   12345  12300  node app.js
```

---

## 📜 Logs Avançados

Os logs são seus melhores aliados quando algo dá errado:

```bash
# Vê todos os logs do contêiner
docker logs minha-api

# Acompanha os logs em tempo real (como tail -f)
docker logs -f minha-api

# Mostra apenas as últimas 50 linhas
docker logs --tail 50 minha-api

# Mostra logs com timestamp (data e hora)
docker logs -t minha-api

# Combina: últimas 20 linhas com timestamp, em tempo real
docker logs -f -t --tail 20 minha-api

# Filtra logs por período
docker logs --since 30m minha-api   # logs dos últimos 30 minutos
docker logs --since 2024-01-01T10:00:00 minha-api
```

!!! tip "Dica de IDE: Docker Extension para VS Code"
    Instale a extensão **"Docker"** (da Microsoft) no VS Code. Ela adiciona uma aba lateral com todos os contêineres, imagens e volumes. Clique com o botão direito em um contêiner para ver logs, abrir terminal, inspecionar e muito mais — sem sair do editor.

<div class="img-placeholder">
  <span>📸 Imagem: VS Code com a extensão Docker — aba lateral mostrando contêineres em execução com menu de contexto aberto (Logs, Shell, Inspect, Stop)</span>
</div>

---

## 🧹 Limpeza do Ambiente (`prune`)

Com o tempo, o Docker acumula gigabytes de imagens antigas, contêineres parados e volumes não utilizados:

```bash
# Vê quanto espaço o Docker está usando no disco
docker system df
```

```
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          12        3         4.2GB     3.1GB (73%)
Containers      5         2         152MB     98MB (64%)
Local Volumes   8         3         2.1GB     1.4GB (66%)
```

```bash
# Remove contêineres parados, redes sem uso e imagens órfãs
docker system prune

# Remove TUDO que não está em uso no momento (use com cuidado!)
docker system prune -a

# Remove apenas contêineres parados
docker container prune

# Remove apenas imagens sem tag (dangling)
docker image prune

# Remove apenas volumes não utilizados
docker volume prune
```

!!! danger "Cuidado com `docker system prune -a`"
    Este comando **apaga todas as imagens** que não estão sendo usadas por um contêiner em execução. Você terá que baixá-las novamente da internet na próxima vez. Não use em conexões lentas!

---

## 🔬 Comparando imagens (`docker diff`)

Mostra o que mudou dentro do sistema de arquivos de um contêiner desde que foi criado:

```bash
docker diff meu-conteiner
```

```
A /app/log.txt     # A = Added (arquivo criado)
C /etc/config.ini  # C = Changed (arquivo modificado)
D /tmp/cache       # D = Deleted (arquivo removido)
```

---

## 💾 Exportando e Importando contêineres

Útil para mover contêineres entre máquinas ou criar backups:

```bash
# Exporta o sistema de arquivos do contêiner como um .tar
docker export meu-conteiner > backup.tar

# Importa de volta como uma nova imagem
docker import backup.tar minha-imagem-backup

# Alternativa: salva/carrega imagens completas (com camadas)
docker save minha-imagem -o imagem.tar
docker load -i imagem.tar
```
