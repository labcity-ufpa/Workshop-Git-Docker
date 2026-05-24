# Truques e Produtividade

Para se tornar um mestre no Git e aumentar sua velocidade de trabalho no terminal, o Git oferece recursos avançados de produtividade e limpeza de histórico.

---

## 1. Aliases (Atalhos Customizados)

Digitar `git checkout` ou `git status` dezenas de vezes por dia pode ser cansativo. Você pode criar atalhos (aliases) nas configurações globais do Git.

```bash
# Define 'git st' como atalho para 'git status'
git config --global alias.st status

# Define 'git co' como atalho para 'git checkout'
git config --global alias.co checkout

# Define 'git br' como atalho para 'git branch'
git config --global alias.br branch

# Um atalho poderoso para ver o histórico em formato de árvore colorida
git config --global alias.tree "log --graph --oneline --decorate --all"
```
A partir de agora, ao invés de digitar comandos longos, você pode usar `git st` ou `git tree` para visualizar o repositório perfeitamente.

---

## 2. Rebase Interativo (Limpando o histórico)

Às vezes, durante o desenvolvimento de uma feature, fazemos vários "commits sujos" (ex: "ajuste 1", "tentativa 2", "agora vai"). Antes de enviar isso para a equipe, o ideal é **achatar (squash)** esses commits em um só bem escrito. O Rebase Interativo serve para isso.

```bash
# Inicia o rebase interativo nos últimos 3 commits
git rebase -i HEAD~3
```

Isso abrirá seu editor de texto padrão com os 3 últimos commits:
```text
pick 1a2b3c4 adiciona botão de login
pick 5d6e7f8 ajusta cor do botão
pick 9g0h1i2 corrige tamanho do botão
```

Para juntar os dois últimos commits ao primeiro, troque a palavra `pick` por `squash` (ou apenas `s`):
```text
pick 1a2b3c4 adiciona botão de login
squash 5d6e7f8 ajusta cor do botão
squash 9g0h1i2 corrige tamanho do botão
```
Ao salvar e fechar, o Git abrirá uma nova tela para você escrever a mensagem do novo commit unificado. O resultado será um histórico perfeitamente limpo!

---

## 3. Git Blame (Descobrindo autores)

Para saber quem escreveu uma determinada linha de código em um arquivo e em qual commit isso aconteceu:
```bash
git blame arquivo.py
```
Isso mostrará o hash do commit, o autor, a data e o conteúdo, linha a linha. Útil para descobrir a quem perguntar sobre um código legado.
