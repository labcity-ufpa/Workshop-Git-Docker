# Instalação do Docker

---

## Tutorial de Instalação

=== "Windows"

    **Passo 1 —** Acesse [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/) e clique em **"Download for Windows"**.

    <div class="img-placeholder">
      <span>📸 Imagem: Página de download do Docker Desktop no site oficial com botão "Download for Windows" em destaque</span>
    </div>

    **Passo 2 —** Execute o instalador baixado (`Docker Desktop Installer.exe`). O instalador pedirá para habilitar o **WSL 2** (Windows Subsystem for Linux) — aceite. Isso é necessário para o Docker funcionar no Windows.

    <div class="img-placeholder">
      <span>📸 Imagem: Instalador do Docker Desktop no Windows com opção "Use WSL 2 instead of Hyper-V" marcada</span>
    </div>

    **Passo 3 —** Após reiniciar o computador, abra o **Docker Desktop** pela área de trabalho. Aguarde o ícone da baleia 🐋 ficar verde na barra de tarefas.

    <div class="img-placeholder">
      <span>📸 Imagem: Docker Desktop aberto no Windows mostrando dashboard com status "Engine running" e ícone verde na barra de tarefas</span>
    </div>

    **Passo 4 —** Confirme no terminal (PowerShell ou Git Bash):
    ```bash
    docker --version
    docker info
    ```

    !!! warning "Docker Desktop precisa estar em execução"
        O Docker Desktop deve estar aberto e com o ícone verde para que os comandos `docker` funcionem no terminal.

=== "macOS"

    **Passo 1 —** Baixe o **Docker Desktop para Mac** em [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/). Escolha a versão correta para o seu chip (Apple Silicon ou Intel).

    **Passo 2 —** Abra o `.dmg` baixado e arraste o ícone do Docker para a pasta Applications.

    <div class="img-placeholder">
      <span>📸 Imagem: macOS — janela de instalação do Docker Desktop com drag-to-Applications</span>
    </div>

    **Passo 3 —** Abra o Docker Desktop pela pasta Applications e aguarde inicializar.

    **Passo 4 —** Confirme no terminal:
    ```bash
    docker --version
    docker info
    ```

=== "Linux (Ubuntu/Debian)"

    ```bash
    # Atualiza o sistema e instala o Docker
    sudo apt update
    sudo apt install docker.io docker-compose -y

    # Inicia o serviço e habilita na inicialização
    sudo systemctl start docker
    sudo systemctl enable docker

    # Confirma a instalação
    docker --version
    ```

    !!! tip "Evitando `sudo` em todo comando"
        Adicione seu usuário ao grupo `docker` para não precisar usar `sudo` a cada comando:
        ```bash
        sudo usermod -aG docker $USER
        ```
        Reinicie a sessão (ou o computador) para aplicar.

---

## Verificando a Instalação

Após instalar, rode o contêiner de teste oficial do Docker:

```bash
docker run hello-world
```

**Saída esperada:**
```
Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

<div class="img-placeholder">
  <span>📸 Imagem: Terminal mostrando a saída completa do `docker run hello-world` com a mensagem "Hello from Docker!"</span>
</div>

Se aparecer essa mensagem, o Docker está instalado e funcionando!

---

## Explorando o Docker Desktop

O **Docker Desktop** oferece uma interface gráfica para gerenciar contêineres, imagens e volumes sem usar o terminal:

<div class="img-placeholder">
  <span>📸 Imagem: Docker Desktop — tela principal mostrando as abas Containers, Images, Volumes e a barra de busca do Docker Hub</span>
</div>

| Aba | O que faz |
| :--- | :--- |
| **Containers** | Lista todos os contêineres, mostra logs e permite iniciar/parar com 1 clique |
| **Images** | Lista imagens baixadas localmente e permite removê-las |
| **Volumes** | Gerencia os volumes de persistência de dados |
| **Dev Environments** | Ambientes de desenvolvimento integrados ao Git |
