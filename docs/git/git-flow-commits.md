# Convenção de Commits

Como escrever mensagens de commit claras, rastreáveis e padronizadas.

---

## Por que padronizar commits?

```bash
# ❌ Histórico sem padrão
git log --oneline
a3f2c1d fix
b7e4a9c update
c1d8f3e wip
d4a2b6f changes
e9c7d1a asdasd

# ✅ Histórico com padrão
git log --oneline
a3f2c1d cappy-123: add JWT token validation
b7e4a9c cappy-123: create login form component
c1d8f3e cappy-456: fix button alignment on mobile
d4a2b6f cappy-789: refactor payment to strategy pattern
e9c7d1a cappy-101: add unit tests for auth service
```

!!! success "Com padrão você consegue"
    - Saber **qual tarefa** gerou cada mudança
    - Filtrar commits por feature (`git log --grep="cappy-123"`)
    - Gerar changelogs automaticamente
    - Reverter uma feature inteira facilmente

---

## Formato da mensagem

### Padrão com ID de tarefa

```
[prefixo]-[task-id]: descrição no imperativo
```

**Exemplos reais:**

```
cappy-123: add user authentication endpoint
cappy-456: fix login button alignment on mobile
birads-42: add u-net segmentation architecture
birads-87: fix class imbalance in training set
```

### Padrão Conventional Commits (alternativo)

```
tipo(escopo): descrição no imperativo
```

**Exemplos:**

```
feat(auth): add JWT token refresh logic
fix(ui): correct button spacing on mobile
refactor(payment): extract gateway interface
docs(api): add endpoint documentation
test(auth): add integration tests for login
```

---

## Regras fundamentais

### 1. Use o imperativo

Escreva como se estivesse dando uma **ordem** ao código.

| ✅ Imperativo | ❌ Outros tempos |
|--------------|-----------------|
| add login validation | added login validation |
| fix null pointer | fixed null pointer |
| remove unused imports | removing unused imports |
| update dependencies | updated dependencies |

!!! tip "Teste mental"
    Complete a frase: *"Se aplicado, este commit vai..."*
    
    - ✅ "...add login validation" → faz sentido
    - ❌ "...added login validation" → não faz sentido

### 2. Máximo 50 caracteres na primeira linha

```bash
# ✅ Curto e direto
cappy-123: add login form validation

# ❌ Muito longo
cappy-123: add login form validation with email regex and password strength checker and error messages
```

Se precisar de mais contexto, use o **corpo** do commit:

```bash
git commit -m "cappy-123: add login form validation" -m "
- Email validated with regex
- Password requires 8+ chars, 1 uppercase, 1 number
- Error messages displayed inline below each field
"
```

### 3. Um commit = uma mudança lógica

| ✅ Atômico | ❌ Misturado |
|-----------|-------------|
| `add login form component` | `add login and fix header and update deps` |
| `fix null pointer on logout` | `various fixes and improvements` |
| `add unit tests for auth` | `wip` |

### 4. Sempre inclua o ID da tarefa

```bash
# ✅ Rastreável
cappy-123: add login endpoint

# ❌ Sem contexto
add login endpoint
```

---

## Tipos comuns (Conventional Commits)

| Tipo | Quando usar | Exemplo |
|------|-------------|---------|
| `feat` | Nova funcionalidade | `feat: add dark mode toggle` |
| `fix` | Correção de bug | `fix: resolve crash on empty input` |
| `refactor` | Mudança de código sem alterar comportamento | `refactor: extract validation to helper` |
| `docs` | Documentação | `docs: add API usage examples` |
| `test` | Adicionar/corrigir testes | `test: add auth service unit tests` |
| `chore` | Tarefas de manutenção | `chore: update eslint config` |
| `style` | Formatação (não muda lógica) | `style: fix indentation in auth module` |
| `perf` | Melhoria de performance | `perf: cache database queries` |
| `ci` | Mudanças no CI/CD | `ci: add staging deploy step` |

---

## Exemplos bons vs. ruins

| ❌ Ruim | ✅ Bom | Por quê |
|--------|--------|---------|
| `fix bug` | `cappy-456: fix login crash on empty password` | Específico e rastreável |
| `update` | `cappy-789: update axios to v1.6.0` | Diz o que foi atualizado |
| `wip` | `cappy-123: add form skeleton (incomplete)` | Descreve o estado real |
| `changes` | `cappy-101: refactor auth to use middleware` | Diz a mudança concreta |
| `asdf` | *(não commite — use stash)* | Nunca polua o histórico |
| `fix fix fix` | `cappy-456: fix login — handle null token` | Um commit com a correção final |

---

## Corrigindo commits

### Último commit (não pushado)

```bash
# Corrigir mensagem
git commit --amend -m "cappy-123: add correct message"

# Adicionar arquivo esquecido ao último commit
git add forgotten-file.ts
git commit --amend --no-edit
```

### Commits mais antigos (não pushados)

```bash
# Squash de múltiplos commits em um
git rebase -i HEAD~3
# No editor: marque commits como "squash" ou "fixup"
```

!!! warning "Atenção"
    Só altere commits que **ainda não foram pushados**. Commits já no remoto compartilhado não devem ser reescritos (exceto na sua branch pessoal com `--force-with-lease`).

---

## Resumo

| Regra | Descrição |
|-------|-----------|
| Formato | `[prefixo]-[id]: descrição` |
| Idioma | Inglês, imperativo |
| Tamanho | ≤ 50 caracteres na primeira linha |
| Escopo | Um commit = uma mudança lógica |
| Rastreabilidade | Sempre incluir ID da task |
| Proibido | `wip`, `fix`, `update`, `asdf`, `test` sozinhos |
