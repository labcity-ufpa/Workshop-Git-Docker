# Instalação do Docker

Após instalar, abra o terminal e confirme com:
```bash
docker --version
docker info
```

### Windows e macOS
Baixe e instale o **Docker Desktop** pelo [site oficial](https://www.docker.com/products/docker-desktop/). Ele traz interface gráfica e cuida da virtualização leve necessária por baixo dos panos (no Windows, através do WSL2).

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl start docker
sudo systemctl enable docker
```

!!! tip "Dica para usuários Linux"
    No Linux, para não precisar usar `sudo` em todo comando docker, adicione seu usuário ao grupo docker:
    ```bash
    sudo usermod -aG docker $USER
    ```
    *(É preciso reiniciar a sessão ou o PC para que as alterações façam efeito).*
