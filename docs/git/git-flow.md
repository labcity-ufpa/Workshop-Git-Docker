# Git Flow

## Por que usar um fluxo de branches?

Imagine um time de 5 desenvolvedores, todos commitando direto na `main`:

```
09:01  Ana  → commit "ajusta botão de login"
09:03  Pedro → commit "refatora banco de dados" (quebra o build)
09:05  Carla → commit "adiciona página de pagamento"
09:07  Deploy automático publica o código quebrado em produção 💥
```

!!! danger "Cenário sem padrão"
    - Ninguém sabe **o que está pronto** para produção e o que ainda está em progresso.
    - Um commit quebrado bloqueia **todos** os outros desenvolvedores.
    - Não existe um ponto de **validação** antes de chegar ao cliente.
    - Reverter mudanças vira um caos de conflitos.

Agora, com um fluxo organizado:

```
09:01  Ana  → commit na branch feature/login (isolada, criada de main)
09:03  Pedro → commit na branch feature/banco (isolada, criada de main)
09:05  Carla → commit na branch feature/pagamento (isolada, criada de main)
10:00  Code review + merge em staging → testes integrados
15:00  Release testada e aprovada → merge em main → deploy seguro ✅
```

!!! success "Cenário com Git Flow"
    - Cada desenvolvedor trabalha **isolado** sem afetar os outros.
    - Código só chega em produção após **revisão e testes**.
    - Existe um histórico claro de **quem fez o quê e quando**.
    - Releases são **previsíveis** e **reversíveis**.

---

## O que Git Flow resolve

| Problema | Solução do Git Flow |
|----------|-------------------|
| "Quem quebrou a main?" | Ninguém commita direto na main — ela só recebe releases testadas. |
| "Minha feature precisa de mais 3 dias, mas a release é amanhã" | Cada feature é uma branch independente; features incompletas não bloqueiam a release. |
| "Bug crítico em produção!" | Hotfixes partem diretamente da main e seguem o mesmo fluxo. |
| "Não sei o que está na versão 1.2.0" | Cada release tem uma branch com changelog, e a tag marca exatamente o estado publicado. |
| "Funciona na minha máquina" | A branch staging serve como ambiente integrado de validação antes de ir para produção. |

---

## Os pilares do modelo

O Git Flow se baseia em **3 princípios**:

1. **Isolamento** — Trabalho em progresso nunca contamina código estável.
2. **Validação em camadas** — Código passa por feature (de main) → staging (teste) → release → main.
3. **Rastreabilidade** — Cada versão publicada tem tag, changelog e histórico limpo.

---

## Branches do fluxo

| Branch | Função | Regras |
|--------|--------|--------|
| `main` | Código estável em produção. Base de **todas** as branches. | Apenas releases aprovadas entram aqui. Nenhum commit direto. |
| `staging` | Ambiente de **teste integrado**. Recebe features para validação. | Nunca é base para criar branches. Nunca faça rebase a partir dela. |
| `feature/*`, `fix/*`, `patch/*` | Trabalho isolado (vida curta). | Sempre criadas a partir de `main`. Rebase contra `main`. |
| `release/*` | Preparação de uma nova versão. | Criada a partir de `main`. Mergeia em `main` após aprovação. |

!!! warning "Regra fundamental"
    **Todas as branches nascem de `main`.** A `staging` é **apenas para testar** — nunca crie branches a partir dela e nunca faça rebase contra ela.

---

## Fluxo completo

```
main        ──●────────────────────────────●──── (produção, sempre estável)
              |\                           /|
              | \                         / |
feature       |  ●───●───●              /  |    (criada de main)
              |         \              /    |
staging       |          ●───●        /    |    (recebe feature para teste)
              |               \      /     |
release       |                ●────●      |    (criada de main, recebe features validadas)
              |                            |
              ●────────────────────────────● → tag v1.1.0
```

---

## Fluxo na prática

### 1. Nova feature/fix/patch

```bash
# SEMPRE parta de main
git switch main
git pull
git switch -c feature/login
# trabalhe nos arquivos
git add .
git commit -m "feat: adiciona tela de login"
git push -u origin feature/login
```

### 2. Merge em staging (para testes)

Após code review aprovado, mergeia em `staging` para validação integrada:

```bash
git switch staging
git pull
git merge --no-ff feature/login
git push
```

### 3. Release

Quando as features estão validadas em staging:

```bash
# Crie a release A PARTIR DE MAIN
git switch main
git pull
git switch -c release/1.1.0

# Merge das features validadas na release
git merge --no-ff feature/login
git merge --no-ff feature/pagamento

# Atualizar CHANGELOG + versão
git add .
git commit -m "chore: prepara release 1.1.0"
git push -u origin release/1.1.0
```

### 4. Publicação

Após aprovação final:

```bash
# Merge em main
git switch main
git merge --no-ff release/1.1.0
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin main --tags

# Sync staging com main
git switch staging
git merge --no-ff main
git push
```

---

## Quando usar Git Flow?

!!! tip "Git Flow é ideal para"
    - Projetos com **releases planejadas** (versões 1.0, 1.1, 2.0...)
    - Times com **múltiplos desenvolvedores** trabalhando em paralelo
    - Ambientes com **staging/homologação** separados de produção
    - Projetos que precisam de **rastreabilidade** (changelog, tags, auditoria)

!!! warning "Git Flow pode ser pesado demais para"
    - Projetos pessoais ou com 1-2 devs
    - Deploy contínuo sem releases discretas (nesse caso, considere **trunk-based development**)
    - Protótipos e MVPs rápidos
