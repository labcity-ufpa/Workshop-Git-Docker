# Boas Práticas e Segurança

---

## ✅ Boas Práticas de Commits

Um bom commit deve ser **pequeno, claro, coeso e fácil de reverter**. A regra de ouro: se você não consegue descrever o commit em uma frase curta, ele provavelmente está fazendo coisas demais.

=== "✅ Commits bons"
    ```text
    feat: adiciona autenticação JWT
    fix: corrige validação do e-mail no cadastro
    docs: atualiza instruções de instalação no README
    refactor: extrai lógica de usuário para classe separada
    test: adiciona testes unitários para o serviço de login
    ```

=== "❌ Commits ruins"
    ```text
    update
    ajustes
    coisas
    final
    agora vai
    commit 2
    ```

---

## 📝 Conventional Commits

O padrão **Conventional Commits** é amplamente adotado pela indústria e facilita a geração automática de changelogs e controle semântico de versões.

**Formato:**
```
tipo(escopo opcional): descrição curta no imperativo

Corpo opcional (mais detalhes sobre o que e por que)

Rodapé opcional (referências a issues, breaking changes, etc.)
```

**Prefixos mais usados:**

| Tipo | Quando usar |
| :--- | :--- |
| `feat` | Nova funcionalidade para o usuário |
| `fix` | Correção de bug |
| `docs` | Mudanças somente em documentação |
| `style` | Formatação, espaços, ponto-e-vírgula (sem mudança de lógica) |
| `refactor` | Refatoração de código (sem adicionar feature nem corrigir bug) |
| `test` | Adicionando testes ausentes ou corrigindo testes existentes |
| `chore` | Tarefas de build, configs de CI/CD, dependências |
| `perf` | Mudança que melhora a performance |
| `ci` | Mudanças em arquivos de configuração de CI |

**Exemplos completos:**

```bash
git commit -m "feat(auth): adiciona login com Google OAuth"
git commit -m "fix(cart): corrige cálculo de frete quando CEP é inválido"
git commit -m "docs: adiciona guia de contribuição ao README"
git commit -m "chore: atualiza dependências do projeto"
```

!!! tip "Dica de IDE: extensão Conventional Commits no VS Code"
    Instale a extensão **"Conventional Commits"** no VS Code para ter um assistente guiado ao fazer commits. Ao commitar pelo painel Source Control, ela apresenta um formulário com tipo, escopo e descrição.
---

## 🔒 Segurança: O que NUNCA versionar

**Nunca envie para um repositório (público ou privado):**

| O que evitar | Exemplos |
| :--- | :--- |
| Senhas e tokens de API | `STRIPE_SECRET_KEY=sk_live_...` |
| Arquivos de ambiente | `.env`, `.env.production` |
| Chaves privadas | `*.pem`, `*.key`, `id_rsa` |
| Credenciais de banco | `DATABASE_URL=postgres://user:senha@...` |
| Tokens de serviços | AWS Access Keys, Firebase credentials |

**A solução padrão é usar variáveis de ambiente:**

1. Crie um arquivo `.env` com os valores reais (que fica no `.gitignore`):
   ```bash
   # .env (NUNCA versionar)
   DB_PASSWORD=minha_senha_super_secreta
   API_KEY=sk-abc123xyz
   ```

2. Crie um `.env.example` com os nomes das variáveis, mas **sem os valores** (versionar este):
   ```bash
   # .env.example (versionar — serve como documentação)
   DB_PASSWORD=
   API_KEY=
   ```

3. Garanta que `.env` está no `.gitignore`:
   ```bash
   echo ".env" >> .gitignore
   ```
---

!!! danger "Se uma senha já foi enviada por acidente"
    Se uma credencial foi enviada para um repositório remoto público (GitHub), **considere-a comprometida imediatamente**:

    1. **Revogue a credencial** no painel do serviço (AWS, Google, etc.) — não basta só apagar do código.
    2. Gere uma nova credencial.
    3. Remova o dado sensível do histórico com ferramentas como `git filter-branch` ou **[BFG Repo Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)**.

    > **Apagar em um commit seguinte NÃO resolve.** A credencial ainda estará acessível em qualquer commit anterior do histórico.

---

## 🔐 Autenticação no GitHub: SSH vs HTTPS

Ao conectar ao GitHub, você tem duas opções:

=== "HTTPS (mais simples)"
    Use seu usuário e um **Personal Access Token (PAT)** como senha (o GitHub não aceita mais senha comum):

    ```bash
    git remote add origin https://github.com/usuario/repo.git
    git push  # pedirá usuário e PAT
    ```

    Para não digitar toda vez, configure o credential helper:
    ```bash
    git config --global credential.helper store
    ```

=== "SSH (mais seguro e prático)"
    **Gere um par de chaves SSH** (faça apenas uma vez):
    ```bash
    ssh-keygen -t ed25519 -C "seuemail@example.com"
    ```

    **Copie a chave pública:**
    ```bash
    cat ~/.ssh/id_ed25519.pub
    ```

    **Adicione ao GitHub:** Acesse **Settings → SSH and GPG keys → New SSH key** e cole a chave.
Agora use URLs SSH:
    ```bash
    git remote add origin git@github.com:usuario/repo.git
    git push  # sem precisar digitar senha
    ```
