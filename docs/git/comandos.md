# Comandos Essenciais do Git

Nesta seção você vai criar seu **primeiro repositório real** e aprender os comandos fundamentais que usará todos os dias.

---

## 🧪 Tutorial Guiado: Seu Primeiro Repositório

Siga cada passo com atenção. Execute os comandos no terminal (**Git Bash** no Windows, ou o terminal do VS Code).

### Passo 1 — Crie a pasta do projeto

```bash
mkdir aula-git
cd aula-git
```

### Passo 2 — Inicialize o repositório Git

```bash
git init
```

!!! note "O que acontece aqui?"
    O Git cria uma pasta oculta chamada `.git` dentro de `aula-git`. É nela que fica todo o histórico do projeto. **Nunca apague essa pasta manualmente.**
### Passo 3 — Crie um arquivo

```bash
echo "# Aula de Git" > README.md
```

Agora veja o estado do repositório:

```bash
git status
```

**Saída esperada:**
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md
```

!!! tip "Dica de IDE: Source Control no VS Code"
    No VS Code, clique no ícone de **controle de versão** (ícone de bifurcação na barra lateral esquerda, ou `Ctrl + Shift + G`). O arquivo `README.md` aparecerá como **"U" (Untracked)**.
### Passo 4 — Adicione ao Staging (preparação)

```bash
git add README.md
git status
```

**Saída esperada:**
```
Changes to be committed:
        new file:   README.md
```

!!! tip "Dica de IDE: botão `+` no VS Code"
    No painel **Source Control**, passe o mouse sobre o arquivo e clique no ícone **`+`** para adicioná-lo ao stage — equivalente ao `git add`.
### Passo 5 — Faça o primeiro commit

```bash
git commit -m "docs: adiciona README inicial"
```

**Saída esperada:**
```
[main (root-commit) a1b2c3d] docs: adiciona README inicial
 1 file changed, 1 insertion(+)
 create mode 100644 README.md
```

!!! tip "Dica de IDE: commit pelo VS Code"
    No painel **Source Control**, digite a mensagem do commit no campo de texto e pressione `Ctrl + Enter` (ou clique no botão **✓ Commit**).
### Passo 6 — Veja o histórico

```bash
git log --oneline
```

**Saída esperada:**
```
a1b2c3d (HEAD -> main) docs: adiciona README inicial
```

!!! success "Parabéns!"
    Você criou seu primeiro commit! Agora sempre que salvar progresso importante, repita os passos: `git add` → `git commit`.

---

## 📋 Tabela de Comandos Básicos

| Comando | O que faz |
| :--- | :--- |
| `git status` | Mostra o estado atual do repositório (quais arquivos foram modificados). |
| `git add arquivo` | Adiciona um arquivo específico ao staging. |
| `git add .` | Adiciona **todas** as alterações da pasta atual ao staging. |
| `git commit -m "msg"` | Cria um ponto salvo no histórico com uma mensagem descritiva. |
| `git log` | Mostra o histórico completo de commits. |
| `git log --oneline` | Mostra o histórico resumido (uma linha por commit). |
| `git diff` | Mostra alterações ainda **não** adicionadas ao staging. |
| `git diff --staged` | Mostra alterações já **adicionadas** ao staging (mas não commitadas). |

---

## 🔄 Fluxo Completo de Trabalho

Este é o ciclo que você vai repetir em **todo projeto**:

```bash
# 1. Veja o que mudou
git status

# 2. Adicione as alterações ao staging
git add .

# 3. Crie um commit descritivo
git commit -m "feat: adiciona estrutura inicial"

# 4. Confira o histórico
git log --oneline
```

---

## ✏️ Exercício Prático

1. Dentro de `aula-git`, crie dois arquivos: `index.html` e `style.css`.
2. Adicione apenas `index.html` ao staging (`git add index.html`).
3. Faça um commit: `git commit -m "feat: cria página principal"`.
4. Agora adicione `style.css` e faça outro commit: `git commit -m "style: adiciona estilos iniciais"`.
5. Execute `git log --oneline` e veja seus dois commits no histórico.

!!! question "Desafio"
    Use `git diff` antes de executar o `git add` para ver exatamente o que mudou no arquivo. O que aparece na tela?
