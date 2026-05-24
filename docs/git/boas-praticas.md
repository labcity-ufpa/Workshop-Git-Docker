# Boas práticas e Segurança

## Boas práticas de Commits

Um bom commit deve ser pequeno, claro, coeso e fácil de reverter.

=== "Commits bons"
    ```text
    feat: adiciona autenticação JWT
    fix: corrige validação do cadastro
    docs: atualiza instruções de instalação
    refactor: reorganiza serviço de usuários
    ```

=== "Commits ruins"
    ```text
    update
    ajustes
    coisas
    final
    ```

### Prefixos recomendados (Conventional Commits)
* `feat`: Novas funcionalidades
* `fix`: Correção de bugs
* `docs`: Documentação
* `style`: Formatação, pontos e vírgulas, etc (não afeta o código)
* `refactor`: Refatoração de código sem adicionar funcionalidade ou corrigir bug
* `test`: Adicionar testes ausentes
* `chore`: Tarefas de build, configuração de CI/CD, dependências

---

## Segurança

Nunca envie para o repositório arquivos que contenham dados sensíveis.

O que manter longe do Git:
* Senhas
* Tokens de API
* Arquivos `.env`
* Chaves Privadas (ex: `.pem`)
* Credenciais de Banco de Dados

!!! danger "Importante"
    Se uma senha ou token foi enviado acidentalmente para um repositório remoto público (como o GitHub), **considere essa credencial comprometida**. Revogue imediatamente e gere uma nova. Não basta apenas apagá-la em um commit seguinte, pois ela continuará acessível no histórico do Git.
