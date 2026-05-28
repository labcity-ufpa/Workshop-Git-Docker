# Truques e Produtividade

Para trabalhar mais rápido e com mais qualidade, o Git oferece recursos avançados de produtividade, histórico limpo e análise de código.

---

## 1. Aliases — Atalhos Customizados

Digitar `git status` ou `git checkout` dezenas de vezes por dia é cansativo. Crie **aliases** (apelidos) para seus comandos favoritos:

```bash
# Define 'git st' como atalho para 'git status'
git config --global alias.st status

# Define 'git co' como atalho para 'git checkout'
git config --global alias.co checkout

# Define 'git br' como atalho para 'git branch'
git config --global alias.br branch

# Define 'git cm' como atalho para 'git commit -m'
git config --global alias.cm "commit -m"

# Histórico em formato de árvore colorida — muito útil!
git config --global alias.tree "log --graph --oneline --decorate --all"
```

**Usando os aliases:**
```bash
git st         # igual a: git status
git co main    # igual a: git checkout main
git tree       # visualiza o histórico em árvore
```

**Exemplo de saída do `git tree`:**
```text
* f4e5d6c (HEAD -> main) feat: adiciona dashboard
| * a1b2c3d (feature/login) feat: tela de login
|/
* 9f8e7d6 docs: cria README
```

!!! tip "Dica: veja todos os aliases configurados"
    ```bash
    git config --global --list | grep alias
    ```

---

## 2. Rebase Interativo — Limpando o Histórico

Durante o desenvolvimento de uma feature, é comum acumular commits "sujos" como "ajuste 1", "tentativa 2", "agora vai". Antes de enviar para revisão, use o **Rebase Interativo** para organizar esses commits em um único commit bem descrito.

**Tutorial guiado:**

**Passo 1 —** Veja seus últimos commits:
```bash
git log --oneline
```
```text
9g0h1i2 corrige tamanho do botão
5d6e7f8 ajusta cor do botão
1a2b3c4 adiciona botão de login
8k9l0m1 feat: cria página inicial
```

**Passo 2 —** Inicie o rebase interativo nos últimos 3 commits:
```bash
git rebase -i HEAD~3
```

**Passo 3 —** Seu editor abrirá com os 3 últimos commits listados:
```text
pick 1a2b3c4 adiciona botão de login
pick 5d6e7f8 ajusta cor do botão
pick 9g0h1i2 corrige tamanho do botão
```

**Passo 4 —** Troque `pick` por `squash` (ou `s`) nos commits que deseja juntar ao primeiro:
```text
pick 1a2b3c4 adiciona botão de login
squash 5d6e7f8 ajusta cor do botão
squash 9g0h1i2 corrige tamanho do botão
```

**Passo 5 —** Salve e feche. O Git abrirá outra tela para você escrever a mensagem final do commit unificado.

<div class="img-placeholder">
  <span>📸 Imagem: VS Code abrindo o arquivo de rebase interativo com os commits listados e instruções de comandos (pick, squash, drop, etc.)</span>
</div>

**Resultado final:**
```text
8k9l0m1 feat: cria página inicial
n1o2p3q feat: adiciona botão de login  ← os 3 viram 1 commit limpo
```

!!! warning "Só faça isso em branches locais"
    Rebase interativo reescreve o histórico. Nunca use em commits já publicados no remoto e compartilhados com outros.

---

## 3. Git Blame — Descobrindo Autores

Quer saber quem escreveu uma linha específica de código e em qual commit?

```bash
git blame arquivo.py
```

**Saída:**
```text
a1b2c3d (Maria Silva    2024-03-15 10:23:01 -0300  1) def calcular_imposto(valor):
9f8e7d6 (João Souza     2024-03-10 14:11:42 -0300  2)     taxa = 0.15
f4e5d6c (Maria Silva    2024-03-15 10:23:01 -0300  3)     return valor * taxa
```

!!! tip "Dica de IDE: Git Blame no VS Code"
    Instale a extensão **"GitLens"** no VS Code. Ela exibe, ao lado de cada linha, quem foi o último a modificá-la e quando — sem precisar rodar `git blame` no terminal.

<div class="img-placeholder">
  <span>📸 Imagem: VS Code com GitLens mostrando anotações de blame embutidas no código — autor e data ao lado de cada linha</span>
</div>

---

## 4. Git Log Avançado — Explorando o Histórico

O `git log` tem muitas opções poderosas para filtrar e formatar o histórico:

```bash
# Histórico de um arquivo específico
git log --follow -p arquivo.py

# Commits de um autor específico
git log --author="Maria"

# Commits em um intervalo de datas
git log --after="2024-01-01" --before="2024-06-01"

# Commits que mencionam uma palavra na mensagem
git log --grep="login"

# Commits que adicionaram ou removeram uma string específica no código
git log -S "calcular_imposto"

# Formato personalizado e compacto
git log --pretty=format:"%h | %an | %ar | %s" --all
```

<div class="img-placeholder">
  <span>📸 Imagem: Terminal mostrando o output do `git log --graph --oneline --decorate --all` com árvore de branches colorida</span>
</div>

---

## 5. Extensões Recomendadas para Git no VS Code

| Extensão | O que faz |
| :--- | :--- |
| **GitLens** | Blame inline, histórico por linha, comparações de branches |
| **Git Graph** | Visualização gráfica do histórico de branches (estilo GitKraken) |
| **Conventional Commits** | Assistente para escrever mensagens de commit no padrão |
| **GitHub Pull Requests** | Abre, revisa e comenta Pull Requests direto no VS Code |

<div class="img-placeholder">
  <span>📸 Imagem: VS Code aba Extensions com as extensões GitLens e Git Graph instaladas e habilitadas</span>
</div>
