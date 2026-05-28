# Ignorando Arquivos com .gitignore

O arquivo `.gitignore` instrui o Git a **ignorar completamente** determinados arquivos ou pastas — eles não aparecem no `git status` e nunca são incluídos em commits.

---

## Por que isso é importante?

Existem arquivos que **nunca** devem ir para o repositório:

- Variáveis de ambiente com senhas (`.env`)
- Dependências instaladas localmente (`node_modules/`, `.venv/`)
- Arquivos compilados/gerados automaticamente (`dist/`, `build/`, `__pycache__/`)
- Arquivos de configuração da sua IDE (`.vscode/`, `.idea/`)

---

## Como criar o .gitignore

Na raiz do seu projeto, crie um arquivo chamado `.gitignore` (sem extensão):

```bash
# Cria o arquivo pelo terminal
touch .gitignore
```

Ou no VS Code: **File → New File** e nomeie como `.gitignore`.

<div class="img-placeholder">
  <span>📸 Imagem: VS Code mostrando o arquivo `.gitignore` criado na raiz do projeto, com ícone de engrenagem característico</span>
</div>

---

## Exemplos por linguagem

=== "Python"
    ```text
    # Cache do interpretador Python
    __pycache__/
    *.pyc
    *.pyo

    # Ambiente virtual
    .venv/
    venv/
    env/

    # Variáveis de ambiente
    .env

    # Arquivos de distribuição
    dist/
    build/
    *.egg-info/
    ```

=== "Node.js"
    ```text
    # Dependências instaladas
    node_modules/

    # Variáveis de ambiente
    .env
    .env.local

    # Build gerado
    dist/
    build/

    # Logs
    *.log
    npm-debug.log*
    ```

=== "Java"
    ```text
    # Compilados
    *.class
    *.jar
    target/

    # IDEs
    .idea/
    *.iml
    .eclipse/
    ```

=== "Geral"
    ```text
    # Sistemas operacionais
    .DS_Store       # macOS
    Thumbs.db       # Windows
    desktop.ini     # Windows

    # IDEs e editores
    .vscode/
    .idea/
    *.swp           # Vim

    # Segredos (NUNCA versionar!)
    .env
    *.pem
    *.key
    ```

---

## Tutorial: adicionando regras ao .gitignore

**Passo 1 —** Suponha que você criou um arquivo `.env` com senhas e não quer que ele vá para o GitHub:

```bash
echo "DB_PASSWORD=minha_senha_secreta" > .env
git status
```

O `.env` aparece como "Untracked files" — o Git está rastreando ele!

**Passo 2 —** Adicione a regra ao `.gitignore`:

```bash
echo ".env" >> .gitignore
git status
```

Agora o `.env` **desapareceu** da lista — o Git o está ignorando.

**Passo 3 —** Versione o próprio `.gitignore`:

```bash
git add .gitignore
git commit -m "chore: adiciona .gitignore"
```

<div class="img-placeholder">
  <span>📸 Imagem: VS Code Source Control mostrando `.env` sumindo da lista de mudanças após adicionar regra ao `.gitignore`</span>
</div>

---

## ⚠️ Cuidado: arquivo já rastreado

!!! warning "Armadilha comum"
    Se um arquivo já foi versionado antes e você adicioná-lo ao `.gitignore` depois, o Git **continuará rastreando** ele. Para corrigir isso, você precisa removê-lo do cache do Git:
    ```bash
    git rm --cached nome-do-arquivo
    git commit -m "chore: remove arquivo sensível do rastreamento"
    ```
    Se era um arquivo com senhas, **revogue as credenciais imediatamente** — elas ficaram no histórico.

---

## Dica: gitignore.io

O site [gitignore.io](https://www.toptal.com/developers/gitignore) gera automaticamente um `.gitignore` completo para qualquer linguagem ou IDE. Basta digitar "Python", "Node", "VS Code" e baixar o arquivo pronto.

<div class="img-placeholder">
  <span>📸 Imagem: Site gitignore.io com campo de busca mostrando opções "Python, Node, VSCode" selecionadas</span>
</div>
