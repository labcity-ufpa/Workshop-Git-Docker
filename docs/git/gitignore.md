# Ignorando arquivos com .gitignore

O arquivo `.gitignore` informa ao Git quais arquivos ou pastas devem ser ignorados pelo versionamento.

=== "Python"
    ```text
    __pycache__/
    *.pyc
    .venv/
    .env
    ```

=== "Node.js"
    ```text
    node_modules/
    .env
    dist/
    build/
    ```

!!! warning "Atenção"
    Se um arquivo já foi versionado antes, colocar no `.gitignore` não remove automaticamente do histórico. Você precisa removê-lo do cache:
    ```bash
    git rm --cached nome-do-arquivo
    ```
