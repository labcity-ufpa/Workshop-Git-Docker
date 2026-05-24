# Comandos Essenciais

## Primeiro repositório

1. **Crie a pasta:**
```bash
mkdir aula-git
cd aula-git
```

2. **Inicialize o Git:**
```bash
git init
```

3. **Crie um arquivo:**
```bash
echo "# Aula de Git" > README.md
```

4. **Faça o primeiro commit:**
```bash
git status
git add README.md
git commit -m "docs: adiciona README inicial"
```

## Tabela de Comandos Básicos

| Comando | Função |
| :--- | :--- |
| `git status` | Mostra o estado atual do repositório. |
| `git add arquivo` | Adiciona uma alteração ao staging. |
| `git add .` | Adiciona todas as alterações da pasta atual. |
| `git commit -m "mensagem"` | Cria um ponto salvo no histórico. |
| `git log` | Mostra o histórico completo. |
| `git log --oneline` | Mostra histórico resumido. |
| `git diff` | Mostra diferenças ainda não preparadas. |
| `git diff --staged` | Mostra diferenças já preparadas. |

Exemplo de uso prático:
```bash
git status
git add .
git commit -m "feat: adiciona estrutura inicial"
git log --oneline
```
