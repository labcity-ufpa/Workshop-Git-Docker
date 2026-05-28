# Comandos Intermediários e Avançados

Após dominar os comandos básicos, estes comandos vão dar superpoderes para lidar com situações reais do dia a dia.

---

## Comandos Intermediários

### 💼 Stash — Guardar trabalho temporariamente

O `stash` é como uma **gaveta temporária**: guarda suas alterações sem criar um commit. Útil quando você precisa trocar de branch rapidamente mas ainda não terminou o que estava fazendo.

**Cenário prático:**

```bash
# Você está editando uma feature, mas precisa urgentemente corrigir um bug na main
git stash           # guarda as alterações atuais na gaveta

git switch main     # vai para a main e corrige o bug
# ... faz a correção e commit ...

git switch feature/minha-feature
git stash pop       # recupera o que estava na gaveta e continua de onde parou
```

| Comando | Função |
| :--- | :--- |
| `git stash` | Guarda as alterações atuais (working dir + staging). |
| `git stash list` | Lista todos os stashes salvos. |
| `git stash pop` | Restaura o stash mais recente e o remove da lista. |
| `git stash apply` | Restaura o stash mais recente mas **mantém** ele na lista. |
| `git stash drop` | Remove o stash mais recente sem aplicar. |

!!! note "Nomeando stashes"
    Use `git stash push -m "minha descrição"` para dar nomes aos stashes e identificá-los facilmente em `git stash list`.

---

### 🏷️ Tags — Marcando versões importantes

Tags marcam **versões estáveis** do projeto (releases). Diferente de commits, as tags são nomes fixos que não mudam.

```bash
# Cria uma tag anotada (com mensagem) no commit atual
git tag -a v1.0.0 -m "Versão 1.0.0 - lançamento inicial"

# Lista todas as tags
git tag

# Envia as tags para o remoto
git push origin v1.0.0
git push origin --tags     # envia TODAS as tags de uma vez
```

<div class="img-placeholder">
  <span>📸 Imagem: GitHub — aba "Releases" mostrando versões v1.0.0 e v1.1.0 com changelogs e assets para download</span>
</div>

---

### ↩️ Restore — Descartando alterações

Desfaz alterações em arquivos individuais sem afetar o histórico.

```bash
# Descarta alterações não staged (volta o arquivo ao estado do último commit)
git restore arquivo.txt

# Remove um arquivo do staging (sem perder as alterações)
git restore --staged arquivo.txt
```

!!! tip "Dica de IDE: Discard Changes no VS Code"
    No painel **Source Control**, clique com o botão direito sobre um arquivo modificado e selecione **"Discard Changes"** — equivale ao `git restore arquivo`.

<div class="img-placeholder">
  <span>📸 Imagem: VS Code Source Control — menu de contexto do arquivo com opção "Discard Changes" destacada</span>
</div>

---

### 🔙 Revert — Desfazendo um commit com segurança

Cria um **novo commit** que desfaz as alterações de um commit anterior. É a forma segura de desfazer porque **preserva o histórico**.

```bash
# Primeiro, descubra o hash do commit a desfazer
git log --oneline

# Cria um commit que reverte o commit indicado
git revert a1b2c3d
```

**Antes:**
```
a1b2c3d - feat: adiciona botão vermelho  ← vamos reverter este
9f8e7d6 - feat: cria página inicial
```

**Depois do revert:**
```
b2c3d4e - Revert "feat: adiciona botão vermelho"
a1b2c3d - feat: adiciona botão vermelho
9f8e7d6 - feat: cria página inicial
```

!!! success "Quando usar Revert vs. Reset?"
    Use **`revert`** quando o commit já foi enviado para o remoto ou compartilhado com a equipe. Use **`reset`** apenas para commits locais ainda não publicados.

---

## Comandos Avançados

### ⏪ Reset — Voltando no tempo

Retrocede a branch para um estado anterior. **Use com cuidado em repositórios compartilhados.**

```bash
git reset --soft HEAD~1    # Desfaz o commit mas mantém as alterações no staging
git reset --mixed HEAD~1   # Desfaz o commit e remove do staging (mantém os arquivos)
git reset --hard HEAD~1    # Desfaz o commit e APAGA as alterações completamente
```

| Flag | Desfaz commit? | Desfaz staging? | Apaga arquivos? |
| :--- | :---: | :---: | :---: |
| `--soft` | ✅ | ❌ | ❌ |
| `--mixed` | ✅ | ✅ | ❌ |
| `--hard` | ✅ | ✅ | ✅ |

!!! danger "Atenção: `--hard` apaga tudo!"
    `git reset --hard` apaga **permanentemente** suas alterações locais não salvas em commit. Verifique duas vezes antes de usar.

---

### 🌿 Rebase — Reescrevendo o histórico

Reposiciona seus commits no topo de outra branch, criando um histórico **linear e limpo**.

**Tutorial guiado:**

```bash
# Você está na branch feature/login e a main avançou
git switch feature/login
git rebase main
```

**Antes do rebase:**
```text
main:         A---B---C
                       \
feature/login:          D---E
```

**Depois do rebase:**
```text
main:         A---B---C
                           \
feature/login:              D'---E'
```

Os commits `D` e `E` são "recolocados" no topo de `C`, gerando novos hashes (`D'` e `E'`).

!!! warning "Nunca faça rebase em branches públicas compartilhadas"
    Rebase reescreve o histórico — se outras pessoas já têm os commits originais, isso causará conflitos sérios. Rebase é seguro apenas em **branches locais** que ainda não foram enviadas.

---

### 🍒 Cherry-pick — Copiando commits específicos

Copia um commit específico de qualquer branch para a sua branch atual, sem trazer o resto da branch.

```bash
# Descubra o hash do commit que quer copiar
git log --oneline feature/pagamentos

# Copia apenas aquele commit para a sua branch atual
git cherry-pick a1b2c3d
```

**Caso de uso típico:** Um colega fez uma correção de bug importante na branch `feature/pagamentos`. Você quer essa correção na `main` sem fazer merge de toda a feature.

---

### 🔍 Bisect — Encontrando o commit que introduziu um bug

O `bisect` usa **busca binária** no histórico para encontrar exatamente qual commit introduziu um problema.

```bash
git bisect start

# Marque o commit atual como "ruim" (tem o bug)
git bisect bad

# Marque um commit antigo que estava funcionando como "bom"
git bisect good v1.0.0

# O Git vai automaticamente fazer checkout em commits intermediários.
# Para cada um, teste e diga ao Git se está bom ou ruim:
git bisect good   # este commit está OK
git bisect bad    # este commit tem o bug

# Quando o Git encontrar o commit culpado, ele vai avisar.
# Ao terminar, volte ao estado normal:
git bisect reset
```

!!! note "Por que é poderoso?"
    Em um histórico de 1000 commits, o `bisect` encontra o commit culpado em apenas ~10 passos (log₂ de 1000).
