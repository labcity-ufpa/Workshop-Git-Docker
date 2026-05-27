# Code Review e Checklist

---

## Regras do time

| Regra | Descrição |
|-------|-----------|
| Mínimo 1 aprovação | Pelo menos um revisor deve aprovar |
| Sem auto-aprovação | Autor **não pode** aprovar próprio MR |
| Alvo da feature branch | Sempre `staging` (nunca direto em `main`) |
| Merge em main | Apenas via release branch, com aprovação de Tech Lead |

---

## Como criar um bom MR

**Título:** curto, com ID da tarefa

```
birads-42: add CNN segmentation model architecture
```

**Descrição (template):**

```markdown
## O que foi feito
- (lista de mudanças)

## Como testar
- (passos para validar)

## Link da tarefa
[birads-42](https://taiga.example.com/project/birads/task/42)
```

**Tamanho:** < 200 linhas é ideal. > 400 linhas = quebre em MRs menores.

---

## Como revisar

- [ ] O código faz o que a descrição diz?
- [ ] Lógica correta (edge cases, null checks)?
- [ ] Testes adicionados/atualizados?
- [ ] Sem `console.log`, código comentado ou TODOs?
- [ ] Nomes claros?
- [ ] Sem vulnerabilidades (SQL injection, XSS, secrets hardcoded)?
- [ ] Commits seguem a convenção?

---

## Feedback

```markdown
💡 Sugestão: poderia usar early return para reduzir indentação.
❓ Por que usou `any` aqui? Temos tipo definido.
🚫 SQL injection. Use query parametrizada.
```

!!! warning "Regra"
    Critique o **código**, nunca a **pessoa**. Sugira soluções.

---

## Checklist — Feature → Staging

??? check "Antes de abrir MR"
    - [ ] Código compila e roda sem erros
    - [ ] Testes criados/atualizados e passando
    - [ ] Lint passa
    - [ ] `git rebase main` feito, sem conflitos
    - [ ] Commits seguem `[projeto]-[id]: descrição`
    - [ ] Sem código de debug
    - [ ] MR com título claro, descrição e link do Taiga
    - [ ] Alvo do MR é `staging`

---

## Checklist — Release → Main

??? check "Antes de mergear"
    - [ ] Release branch criada a partir de `main`
    - [ ] Apenas features validadas incluídas
    - [ ] CHANGELOG.md atualizado
    - [ ] Versão incrementada (SemVer)
    - [ ] Testes passando, build ok
    - [ ] Aprovação do Tech Lead

??? check "Após merge"
    - [ ] Tag `v[version]` criada
    - [ ] Staging sincronizada com main
    - [ ] Release branch deletada
    - [ ] Time notificado

---

## Template para copiar no MR

```markdown
## Checklist
- [ ] Código compila e testes passam
- [ ] Rebase de main feito
- [ ] Commits seguem convenção
- [ ] Sem código de debug

## O que foi feito
(descreva)

## Como testar
(passos)

## Tarefa
[projeto-ID](link-taiga)
```

---

## Configurações do repositório

| Configuração | Por quê |
|-------------|---------|
| Branch protection em `main` | Impede push direto |
| Requerer 1+ aprovação | Garante code review |
| Pipeline deve passar | Impede merge com build quebrado |
