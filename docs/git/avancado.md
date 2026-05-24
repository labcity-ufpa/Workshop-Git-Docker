# Comandos Intermediários e Avançados

## Comandos intermediários

### Stash
Guarda alterações temporariamente sem precisar fazer um commit. Útil para quando você precisa trocar de branch rapidamente.
```bash
git stash
git stash list
git stash pop
```

### Tags
Marca versões importantes do projeto (ex: releases).
```bash
git tag v1.0.0
git push origin v1.0.0
git push origin --tags
```

### Restore
Desfaz alterações locais ou remove do staging.
```bash
git restore arquivo.txt
git restore --staged arquivo.txt
```

### Revert
Cria um novo commit desfazendo o que um commit anterior fez.
```bash
git revert HASH_DO_COMMIT
```

---

## Comandos avançados

### Reset
Retrocede a branch para um estado anterior.
```bash
git reset --soft HEAD~1
git reset --mixed HEAD~1
git reset --hard HEAD~1
```
!!! warning "Cuidado"
    `git reset --hard` apaga completamente suas alterações locais não salvas!

### Rebase
Reescreve o histórico colocando os seus commits no topo da branch principal.
```bash
git switch feature/login
git rebase main
```

**Antes:**
```text
A---B---C main
     \
      D---E feature/login
```

**Depois:**
```text
A---B---C main
         \
          D'---E' feature/login
```

### Cherry-pick
Copia um commit específico de outra branch para a sua branch atual.
```bash
git cherry-pick HASH_DO_COMMIT
```

### Bisect
Ajuda a encontrar qual commit introduziu um bug usando busca binária.
```bash
git bisect start
git bisect bad
git bisect good HASH_ANTIGO
git bisect reset
```
