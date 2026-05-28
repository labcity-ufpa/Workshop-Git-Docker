# Instalação e Configuração do Git

## 1. Instalação

Escolha seu sistema operacional e siga o passo a passo:

=== "Windows"

    **Passo 1 —** Acesse o [site oficial do Git](https://git-scm.com/) e clique em **"Download for Windows"**.
**Passo 2 —** Execute o instalador baixado (`.exe`) e avance pelas telas clicando em **Next**. Nas opções de editor padrão, selecione **Visual Studio Code** (se disponível) ou mantenha o padrão.
**Passo 3 —** Ao final da instalação, abra o **Git Bash** (clique com botão direito na área de trabalho → "Git Bash Here") e confirme:

    ```bash
    git --version
    ```

    !!! tip "Dica: prefira o Git Bash no Windows"
        O Git Bash emula um terminal Unix, o que torna os comandos idênticos ao Linux/macOS. Evite usar o CMD ou PowerShell para os exercícios desta aula.

=== "Linux (Ubuntu/Debian/Mint)"

    Abra o terminal e execute:

    ```bash
    sudo apt update
    sudo apt install git -y
    git --version
    ```

    !!! note "Saída esperada"
        ```
        git version 2.43.0
        ```
        O número pode variar conforme a versão disponível no repositório do seu sistema.

=== "Fedora"

    ```bash
    sudo dnf install git -y
    git --version
    ```

=== "Arch Linux"

    ```bash
    sudo pacman -S git
    git --version
    ```

=== "macOS"

    **Opção A — Ferramentas de Linha de Comando do Xcode:**
    ```bash
    xcode-select --install
    ```

    **Opção B — Via Homebrew (recomendado para ter a versão mais recente):**
    ```bash
    brew install git
    git --version
    ```

---

## 2. Configuração Inicial

Logo após instalar, você precisa identificar-se. Essas informações aparecem em **todo commit** que você fizer.

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@example.com"
```

Verifique se deu certo:
```bash
git config --global --list
```

!!! note "Saída esperada"
    ```
    user.name=Seu Nome
    user.email=seuemail@example.com
    ```

---

## 3. Configurando o VS Code como editor padrão

Quando o Git precisar abrir um editor (ex: ao escrever a mensagem de um commit longo), ele usará o VS Code:

```bash
git config --global core.editor "code --wait"
```

**Como testar:** Abra o terminal integrado do VS Code (`Ctrl + J`) e tente editar o último commit:

```bash
git commit --amend
```

O VS Code abrirá automaticamente um arquivo para você editar a mensagem.
!!! success "Configuração completa!"
    Você está pronto para começar a usar o Git. Siga para a próxima seção: **Comandos Essenciais**.
