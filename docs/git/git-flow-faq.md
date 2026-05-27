# FAQ e Armadilhas Comuns

Erros frequentes, situações confusas e como sair delas.

---

## Armadilhas Comuns

### 🚨 Commit direto em main/staging

```bash
# Você fez isso sem querer:
git switch main
git commit -m "fix rápido"
```

??? danger "Como resolver"
    ```bash
    # Mova o commit para uma branch própria
    git switch -c hotfix/fix-rapido    # cria branch com seu commit
    git switch main
    git reset --hard HEAD~1            # remove o commit de main
    git push --force-with-lease        # (só se já tinha pushado)
    
    # Agora continue o fluxo normal na branch hotfix
    ```

---

### 🚨 Push de arquivo sensível (.env, secrets)

```bash
# Commitou .env com senhas e já fez push
```

??? danger "Como resolver"
    ```bash
    # 1. Remova do tracking (mantém arquivo local)
    git rm --cached .env
    echo ".env" >> .gitignore
    git add .gitignore
    git commit -m "remove env from tracking"
    git push --force-with-lease
    
    # 2. TROQUE TODAS AS CREDENCIAIS EXPOSTAS
    # O arquivo ainda existe no histórico do Git!
    
    # 3. Para remover do histórico completamente (avançado):
    git filter-branch --force --index-filter \
      'git rm --cached --ignore-unmatch .env' HEAD
    # ou use: git filter-repo --path .env --invert-paths
    ```
    
    !!! warning "Importante"
        Mesmo removendo do histórico, considere as credenciais **comprometidas**. Troque-as imediatamente.

---

### 🚨 Rebase em branch compartilhada

```bash
# Alguém fez isso:
git switch staging
git rebase main
git push --force
```

??? danger "Como resolver (para quem foi afetado)"
    ```bash
    # Todos do time precisam:
    git switch staging
    git fetch origin
    git reset --hard origin/staging
    
    # Suas branches de trabalho não são afetadas porque
    # elas são baseadas em main (não em staging)
    ```
    
    **Prevenção:** Configure branch protection para bloquear force push em `main` e `staging`.

---

### 🚨 Merge ao invés de rebase na feature

```bash
# Fez git merge main na sua feature (criou merge commit)
```

??? warning "Como limpar"
    ```bash
    # Se o merge foi o último commit:
    git reset --hard HEAD~1
    git rebase main
    
    # Se já tem commits depois do merge:
    git rebase -i --rebase-merges main
    # No editor, remova a linha do merge commit
    ```

---

### 🚨 Force push sem --lease

```bash
# Fez git push --force e sobrescreveu commits de outro dev
```

??? danger "Como resolver"
    ```bash
    # O outro dev precisa:
    git reflog  # encontrar o commit perdido
    git reset --hard <commit-hash-antes-do-force>
    git push --force-with-lease
    
    # Prevenção: SEMPRE use --force-with-lease
    # Configure alias:
    git config --global alias.fpush "push --force-with-lease"
    ```

---

### 🚨 Commit com mensagem errada

```bash
git commit -m "asdf"  # ops
```

??? example "Como resolver"
    ```bash
    # Último commit (não pushado):
    git commit --amend -m "cappy-123: add correct message"
    
    # Último commit (já pushado na sua branch):
    git commit --amend -m "cappy-123: add correct message"
    git push --force-with-lease
    
    # Commit antigo (não pushado):
    git rebase -i HEAD~3
    # Mude "pick" para "reword" no commit desejado
    ```

---

### 🚨 Branch criada da branch errada

```bash
# Criou feature a partir de staging ou outra feature (não de main)
```

??? warning "Como resolver"
    ```bash
    # Rebase para mudar a base da branch para main:
    git switch minha-feature
    git rebase --onto main feature-antiga minha-feature
    
    # Isso "transplanta" seus commits para cima de main
    ```

---

## FAQ

??? question "Qual a diferença entre `git switch` e `git checkout`?"
    São equivalentes para trocar de branch. `git switch` é mais novo (Git 2.23+) e mais seguro — ele **só** troca de branch. `git checkout` faz várias coisas (trocar branch, restaurar arquivos, etc.) e é fácil errar.
    
    ```bash
    # Equivalentes:
    git switch main           # novo (recomendado)
    git checkout main         # antigo (funciona)
    
    git switch -c nova-branch # novo
    git checkout -b nova-branch # antigo
    ```

??? question "Posso fazer rebase depois de já ter aberto o MR?"
    **Sim!** Inclusive é recomendado. Depois de fazer rebase + `push --force-with-lease`, o MR atualiza automaticamente. Comente no MR que houve rebase para facilitar nova revisão.

??? question "`--force-with-lease` pode causar problemas?"
    É seguro na sua branch pessoal. Ele só força o push se ninguém mais tiver pushado commits na mesma branch. Se outro dev pushou algo, o comando **falha** (e te protege).

??? question "E se eu esquecer de deletar branches antigas?"
    Não quebra nada, mas polui o repositório. Limpe periodicamente:
    
    ```bash
    # Ver branches já merjadas
    git branch --merged main
    
    # Deletar branches locais já merjadas (exceto main/staging)
    git branch --merged main | grep -v "main\|staging" | xargs git branch -d
    
    # Limpar referências remotas obsoletas
    git fetch --prune
    ```

??? question "Quando usar `git stash`?"
    Quando precisa trocar de branch rapidamente mas tem mudanças não commitadas:
    
    ```bash
    # Salvar trabalho temporário
    git stash
    
    # Fazer o que precisa em outra branch
    git switch main
    # ... resolve algo urgente ...
    
    # Voltar e recuperar
    git switch minha-feature
    git stash pop
    ```

??? question "Posso ter duas features em andamento ao mesmo tempo?"
    **Sim!** Cada feature é uma branch independente. Troque entre elas livremente:
    
    ```bash
    git switch cappy-100-feature-a   # trabalha aqui
    git switch cappy-200-feature-b   # agora trabalha aqui
    # Não se misturam
    ```

??? question "O que fazer se o rebase ficou muito complicado?"
    Aborte e tente de novo:
    
    ```bash
    git rebase --abort  # volta ao estado anterior, sem dano
    ```
    
    Se a branch divergiu muito, considere criar uma branch nova e cherry-pick dos commits relevantes:
    
    ```bash
    git switch main
    git switch -c cappy-123-fresh
    git cherry-pick <hash-commit-1> <hash-commit-2>
    ```

??? question "Preciso fazer rebase todo dia?"
    Não necessariamente todo dia, mas **antes de abrir/atualizar o MR** é obrigatório. Uma boa cadência é fazer rebase quando:
    
    - Vai abrir o MR
    - Sabe que main recebeu mudanças (nova release publicada)
    - A branch tem mais de 2-3 dias

---

## Aliases úteis

Configure atalhos para comandos frequentes:

```bash
git config --global alias.st "status"
git config --global alias.co "switch"
git config --global alias.br "branch"
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.fpush "push --force-with-lease"
git config --global alias.unstage "reset HEAD --"
git config --global alias.last "log -1 HEAD --stat"
```

Uso:

```bash
git st          # git status
git co main     # git switch main
git lg          # histórico visual
git fpush       # force push seguro
```
