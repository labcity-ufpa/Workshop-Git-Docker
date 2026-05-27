# Exercícios Práticos — Git Flow

Cenários reais para praticar. Tente resolver antes de olhar a solução!

---

## Exercício 1: Primeira feature

**Cenário:** Você acabou de entrar no time do projeto Cappy. Sua primeira tarefa é a `cappy-301: add forgot password page`. O repositório já tem `main` e `staging`.

**Objetivo:** Criar a branch, fazer commits e preparar para MR.

??? example "Solução"
    ```bash
    # 1. Partir de main
    git switch main
    git pull

    # 2. Criar branch com nomenclatura correta
    git switch -c cappy-301-add-forgot-password-page

    # 3. Desenvolver (simule com criação de arquivo)
    echo "<form>Reset password</form>" > src/pages/ForgotPassword.tsx
    git add src/pages/ForgotPassword.tsx
    git commit -m "cappy-301: add forgot password form"

    echo "test('renders form')" > src/pages/ForgotPassword.test.tsx
    git add src/pages/ForgotPassword.test.tsx
    git commit -m "cappy-301: add unit tests for forgot password"

    # 4. Push e preparar MR
    git push -u origin cappy-301-add-forgot-password-page
    # Abrir MR no GitLab/GitHub apontando para staging (para testes)
    ```

---

## Exercício 2: Rebase com conflito

**Cenário:** Enquanto você trabalhava na feature, outro dev merjou alterações no mesmo arquivo. Ao fazer rebase, conflito!

**Objetivo:** Simular e resolver um conflito via rebase.

??? example "Setup (copie e execute)"
    ```bash
    # Criar repo de teste
    mkdir exercicio-conflito && cd exercicio-conflito
    git init

    # Commit inicial
    cat > app.js << 'EOF'
    function login(user, pass) {
      // validação aqui
      return authenticate(user, pass);
    }
    EOF
    git add . && git commit -m "initial: add login function"

    # Criar staging com alteração
    git switch -c staging
    sed -i 's/\/\/ validação aqui/if (!user) throw new Error("user required");/' app.js
    git add . && git commit -m "cappy-100: add user validation"

    # Simular que essa mudança já entrou em main via release
    git switch main
    git merge --no-ff staging

    # Criar feature a partir de main (desatualizada)
    git reset --hard HEAD~1
    git switch -c cappy-200-add-pass-validation
    sed -i 's/\/\/ validação aqui/if (!pass) throw new Error("password required");/' app.js
    git add . && git commit -m "cappy-200: add password validation"
    ```

??? example "Solução"
    ```bash
    # Tentar rebase contra main
    git rebase main
    # CONFLICT!

    # Abrir app.js — você verá:
    # <<<<<<< HEAD
    # if (!user) throw new Error("user required");
    # =======
    # if (!pass) throw new Error("password required");
    # >>>>>>> cappy-200: add password validation

    # Resolver: manter AMBAS as validações
    cat > app.js << 'EOF'
    function login(user, pass) {
      if (!user) throw new Error("user required");
      if (!pass) throw new Error("password required");
      return authenticate(user, pass);
    }
    EOF

    # Finalizar
    git add app.js
    git rebase --continue
    git push --force-with-lease  # (se já tivesse remoto)
    ```

---

## Exercício 3: Hotfix urgente

**Cenário:** É sexta-feira 17h. Produção está com bug crítico: a página de checkout crasheia quando o carrinho está vazio. A versão atual em `main` é `v1.3.0`. Você tem uma feature em andamento.

**Objetivo:** Criar hotfix sem afetar sua feature.

??? example "Solução"
    ```bash
    # 1. NÃO toque na sua feature. Salve o estado atual se precisar:
    git stash  # (opcional, se tiver mudanças não commitadas)

    # 2. Ir para main e criar hotfix
    git switch main
    git pull
    git switch -c hotfix/fix-empty-cart-crash

    # 3. Corrigir o bug
    # (edite o arquivo com a correção)
    git add src/checkout.ts
    git commit -m "cappy-999: fix crash when cart is empty"

    # 4. Merge em main
    git switch main
    git merge --no-ff hotfix/fix-empty-cart-crash
    git tag -a v1.3.1 -m "Hotfix: fix empty cart crash"
    git push origin main --tags

    # 5. Sync com staging
    git switch staging
    git pull
    git merge --no-ff main
    git push

    # 6. Voltar para sua feature
    git switch cappy-500-minha-feature
    git stash pop  # (se usou stash)
    # Continuar trabalhando normalmente
    ```

---

## Exercício 4: Release completa

**Cenário:** O time completou 3 features validadas em staging. É hora de lançar a `v1.4.0`.

Features incluídas:

- `cappy-301`: Forgot password page
- `cappy-302`: User avatar upload
- `cappy-303`: Email notifications

**Objetivo:** Executar o processo completo de release.

??? example "Solução"
    ```bash
    # 1. Criar release branch A PARTIR DE MAIN
    git switch main
    git pull
    git switch -c release-1.4.0

    # 2. Merge das features validadas na release
    git merge --no-ff cappy-301-add-forgot-password-page
    git merge --no-ff cappy-302-user-avatar-upload
    git merge --no-ff cappy-303-email-notifications

    # 2. Atualizar CHANGELOG.md
    cat >> CHANGELOG.md << 'EOF'

    ## [1.4.0] - 2026-05-27

    ### Feature
    - **Auth:** Add forgot password page. ([#301](link))
    - **Profile:** Add user avatar upload. ([#302](link))
    - **Notifications:** Add email notification system. ([#303](link))
    EOF

    git add CHANGELOG.md
    git commit -m "cappy-release: update changelog for v1.4.0"

    # 3. Bump version
    # (edite package.json ou equivalente: version = "1.4.0")
    git add package.json
    git commit -m "cappy-release: bump version to 1.4.0"

    # 4. Push e pedir aprovação
    git push -u origin release-1.4.0
    # Abrir MR de release-1.4.0 → main (pedir aprovação do Tech Lead)

    # 5. Após aprovação: merge em main
    git switch main
    git pull
    git merge --no-ff release-1.4.0
    git push

    # 6. Tag
    git tag -a v1.4.0 -m "Release v1.4.0"
    git push origin v1.4.0

    # 7. Sync staging
    git switch staging
    git pull
    git merge --no-ff main
    git push

    # 8. Cleanup
    git branch -d release-1.4.0
    git push origin --delete release-1.4.0
    ```

---

## Exercício 5: Desfazendo erros

**Cenário:** Você commitou acidentalmente um arquivo `.env` com credenciais.

??? example "Solução"
    ```bash
    # Se ainda NÃO fez push:
    git reset HEAD~1                    # desfaz o commit, mantém alterações
    echo ".env" >> .gitignore           # adiciona ao gitignore
    git add .gitignore
    git rm --cached .env                # remove do tracking
    git commit -m "cappy-123: add env to gitignore"

    # Se já fez push (na sua branch):
    git reset HEAD~1
    echo ".env" >> .gitignore
    git add .gitignore
    git rm --cached .env
    git commit -m "cappy-123: remove env and add to gitignore"
    git push --force-with-lease

    # ⚠️ IMPORTANTE: troque as credenciais expostas!
    # Mesmo removendo do Git, elas ficam no histórico.
    ```

---

## Exercício 6: Trabalho em equipe (para praticar em dupla)

**Cenário:** Dois devs trabalham no mesmo módulo. Dev A faz `cappy-400-add-cart-page`, Dev B faz `cappy-401-add-cart-api`.

**Instruções:**

1. Ambos criam suas branches a partir de `main`
2. Dev A edita `src/cart/index.ts` (frontend)
3. Dev B edita `src/cart/index.ts` (adiciona import do API)
4. Dev B termina primeiro, sua feature entra em main via release
5. Dev A faz rebase de main e resolve o conflito
6. Dev A abre seu MR

??? example "O que Dev A faz quando a mudança de B já está em main"
    ```bash
    git switch main
    git pull                          # puxa a release que incluiu B
    git switch cappy-400-add-cart-page
    git rebase main                   # conflito no import!
    # Resolve: mantém o import de B + adiciona o seu
    git add src/cart/index.ts
    git rebase --continue
    git push --force-with-lease
    # Atualiza o MR (já atualiza automaticamente)
    ```

---

## Desafio extra: investigar o histórico

Use estes comandos para explorar o repositório:

```bash
# Ver histórico linear bonito
git log --oneline --graph --all

# Quem alterou cada linha de um arquivo?
git blame src/auth.ts

# Encontrar qual commit introduziu um bug
git bisect start
git bisect bad          # commit atual tem bug
git bisect good v1.2.0  # essa versão era boa
# Git vai navegando commits — você testa cada um e diz "good" ou "bad"
git bisect reset        # quando encontrar
```
