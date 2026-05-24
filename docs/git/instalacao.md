# Instalação e Configuração

## Instalação

Depois de instalar, confirme com:
```bash
git --version
```

### Windows
Instale o Git for Windows a partir do [site oficial do Git](https://git-scm.com/). Após instalar, use preferencialmente o **Git Bash**.

### Linux Debian/Ubuntu/Mint
```bash
sudo apt update
sudo apt install git -y
git --version
```

### Fedora
```bash
sudo dnf install git -y
git --version
```

### Arch Linux
```bash
sudo pacman -S git
git --version
```

### macOS
Pelo terminal padrão:
```bash
xcode-select --install
```
Ou, usando Homebrew:
```bash
brew install git
git --version
```

---

## Configuração inicial

Configure seu nome e e-mail. Eles aparecem no histórico dos commits.

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@example.com"
```

Verifique se a configuração deu certo:
```bash
git config --global --list
```

Opcionalmente, configure o **VS Code** como editor padrão do Git:
```bash
git config --global core.editor "code --wait"
```
