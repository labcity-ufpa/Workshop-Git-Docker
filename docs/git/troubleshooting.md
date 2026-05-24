# Resolvendo Problemas (Troubleshooting)

Todo desenvolvedor já cometeu erros no Git. A boa notícia é que **quase tudo pode ser desfeito**. Abaixo listamos os problemas mais comuns e como resolvê-los.

---

## 1. "Escrevi a mensagem do commit errada"

Se você acabou de fazer o commit e percebeu um erro de digitação, não precisa revertê-lo. Basta usar a flag `--amend`.

```bash
# Isso abrirá o editor para você alterar a mensagem do ÚLTIMO commit
git commit --amend
```
*Atenção:* Só faça isso se o commit ainda não foi enviado (`push`) para o servidor remoto.

## 2. "Esqueci de adicionar um arquivo no último commit"

Você fez o commit, mas esqueceu de incluir um arquivo importante que pertencia àquela alteração.

```bash
git add arquivo-esquecido.txt
# O --no-edit adiciona a alteração sem pedir para mudar a mensagem
git commit --amend --no-edit
```

## 3. "Fiz commit na branch errada"

Você estava na `main`, mas deveria ter feito o commit na `feature/nova-tela`.

```bash
# 1. Crie a branch correta e mude para ela (o commit vai junto)
git switch -c feature/nova-tela

# 2. Volte para a main
git switch main

# 3. Remova o último commit da main (mantendo os arquivos intactos, caso precise)
git reset HEAD~1 --hard
```

## 4. "Apaguei uma branch ou fiz um reset destrutivo sem querer"

O **Reflog** é o salva-vidas do Git. Ele guarda o histórico de *todas* as ações locais que você fez (até mudanças de branch e commits deletados).

```bash
# Veja o histórico do reflog
git reflog
```
Você verá uma lista parecida com esta:
```text
3f8a9b1 HEAD@{0}: reset: moving to HEAD~1
a1b2c3d HEAD@{1}: commit: adiciona funcionalidade X
```
Para recuperar o commit ou a branch perdida, basta voltar para o hash correspondente:
```bash
git reset --hard a1b2c3d
```

## 5. "Estou preso em um Detached HEAD"

Isso acontece quando você faz o checkout (switch) diretamente para um commit específico (hash) em vez de uma branch. O Git avisa que você está "desanexado".

Para sair desse estado e voltar ao normal:
```bash
git switch main
```
Se você fez alterações valiosas enquanto estava em detached HEAD e quer salvá-las:
```bash
git switch -c branch-para-salvar-meu-trabalho
```
