# Rebase, Merge e Conflitos

---

## Rebase vs. Merge

Você precisa atualizar sua feature branch com mudanças da `main`. Duas opções:

### Merge (cria commit extra)

```
          C---D---M  (minha-feature)
         /       /
A---B---E------    (main)
```

Após várias atualizações o histórico fica emaranhado.

### Rebase (histórico linear)

```
                    C'---D'  (minha-feature)
                   /
A---B---E--------    (main)
```

Move seus commits para o topo da main. Histórico limpo.

---

## Quando usar cada um

| Situação | Use |
|----------|-----|
| Atualizar **sua feature branch** | `git rebase main` |
| Mergear feature **em staging** (teste) | `git merge --no-ff` |
| Mergear feature **na release** | `git merge --no-ff` |
| Mergear release **em main** | `git merge --no-ff` |
| Sync main → staging | `git merge --no-ff` |

!!! tip "Regra de ouro"
    **Rebase** para atualizar SUA branch (contra `main`). **Merge `--no-ff`** para integrar em branches compartilhadas.

---

## O flag `--no-ff`

```
# Com --no-ff — preserva contexto:
          C---D           (feature)
         /     \
A---B-----------M---     (staging)  ← M mostra "aqui entrou a feature"

# Sem --no-ff — perde contexto:
A---B---C---D---         (staging)  ← não dá pra saber que C e D eram uma feature
```

---

## Rebase na prática

```bash
git switch main && git pull
git switch minha-feature
git rebase main
```

### Push após rebase

```bash
git push --force-with-lease
```

!!! warning "Sempre `--force-with-lease`"
    Nunca use `--force` — ele sobrescreve sem verificar. `--force-with-lease` falha se alguém mais pushou.

---

## Resolução de conflitos

### Como um conflito nasce

1. Dois devs editam a **mesma região do mesmo arquivo**
2. Um deles entra em main primeiro (via release)
3. O outro faz `git rebase main` → **CONFLITO**

### Anatomia

```
<<<<<<< HEAD
      <h1>Dashboard do Sistema</h1>
=======
      <h1>Painel de Controle</h1>
>>>>>>> minha-feature
```

| Marcador | Significado |
|----------|-------------|
| `<<<<<<< HEAD` | Versão da branch base (`main`) |
| `=======` | Separador |
| `>>>>>>> ...` | Versão da SUA branch |

### Passo a passo

```bash
# 1. Inicia rebase
git rebase main
# CONFLICT!

# 2. Abra o arquivo e resolva (escolha uma versão ou combine)

# 3. Marque como resolvido
git add <arquivo-resolvido>

# 4. Continue
git rebase --continue

# 5. Repita até acabar. Depois:
git push --force-with-lease
```

### Abortar se necessário

```bash
git rebase --abort   # volta ao estado anterior, sem dano
```

### VS Code

O VS Code detecta conflitos e mostra botões:
- **Accept Current** — versão da main
- **Accept Incoming** — sua versão
- **Accept Both** — manter as duas

---

## Erros comuns

| Erro | Por que é perigoso |
|------|-------------------|
| `git rebase` em `main` ou `staging` | Reescreve histórico de todos |
| `git rebase staging` na sua feature | Staging pode ter código instável |
| `git merge main` na feature | Cria merge commits desnecessários |
| `git push --force` (sem lease) | Pode sobrescrever trabalho de outros |

---

## Configuração recomendada

```bash
git config --global pull.rebase true
```

Faz `git pull` usar rebase automaticamente (evita merge commits acidentais).

---

## Resumo

| Conceito | Merge | Rebase |
|----------|-------|--------|
| Histórico | Não-linear | Linear |
| Cria commit extra | Sim | Não |
| Reescreve histórico | Não | Sim |
| Seguro em branch compartilhada | Sim | Nunca |
| Usar para | Integrar em staging/release/main | Atualizar sua feature |
