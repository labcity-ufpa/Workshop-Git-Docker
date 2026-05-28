# Resolvendo Problemas (Troubleshooting)

Todo desenvolvedor já cometeu erros no Git. A boa notícia é que **quase tudo pode ser desfeito**. Esta seção é um guia de primeiros socorros para as situações mais comuns.

---

## 1. "Escrevi a mensagem do commit errada"

Se você acabou de fazer o commit e percebeu um erro de digitação, use `--amend`:

```bash
# Abre o editor para você alterar a mensagem do ÚLTIMO commit
git commit --amend
```

Ou altere direto pela linha de comando, sem abrir o editor:
```bash
git commit --amend -m "docs: corrige README inicial"
```

!!! tip "Dica de IDE: Undo Last Commit no VS Code"
    Acesse a paleta de comandos (`Ctrl + Shift + P`), digite **"Git: Undo Last Commit"** e confirme. O commit é desfeito mas as alterações ficam no staging, prontas para você refazer.

<div class="img-placeholder">
  <span>📸 Imagem: VS Code — paleta de comandos (Ctrl+Shift+P) com "Git: Undo Last Commit" selecionado</span>
</div>

!!! warning "Atenção"
    Só use `--amend` se o commit **ainda não foi enviado** (`push`) ao servidor remoto. Se já foi, isso causará conflitos para quem clonou o repositório.

---

## 2. "Esqueci de adicionar um arquivo no último commit"

Você fez o commit mas esqueceu de incluir um arquivo importante:

```bash
git add arquivo-esquecido.txt
# O --no-edit adiciona a alteração sem pedir para mudar a mensagem
git commit --amend --no-edit
```

O arquivo será incorporado ao commit anterior, como se sempre tivesse estado lá.

---

## 3. "Fiz commit na branch errada"

Você estava na `main` mas deveria ter feito o commit na `feature/nova-tela`:

```bash
# 1. Crie a branch correta e mude para ela (os arquivos vão junto)
git switch -c feature/nova-tela

# 2. Volte para a main
git switch main

# 3. Remova o último commit da main (os arquivos desaparecem da main)
git reset HEAD~1 --hard
```

!!! note "Por que funciona?"
    O `git switch -c` cria a nova branch a partir do estado atual, incluindo o commit problemático. Depois o `reset --hard` simplesmente remove esse commit da `main`.

---

## 4. "Apaguei uma branch ou fiz um reset destrutivo sem querer"

O **Reflog** é o salva-vidas do Git. Ele guarda o histórico de **todas** as ações locais — até mudanças de branch e commits deletados.

```bash
git reflog
```

Você verá uma lista como:
```text
3f8a9b1 HEAD@{0}: reset: moving to HEAD~1
a1b2c3d HEAD@{1}: commit: feat: adiciona funcionalidade X
8b7c6d5 HEAD@{2}: checkout: moving from feature/login to main
```

Para recuperar o commit ou branch perdida, basta resetar para o hash correspondente:

```bash
git reset --hard a1b2c3d
```

Ou se quiser recuperar como nova branch:
```bash
git switch -c branch-recuperada a1b2c3d
```

!!! success "O Reflog dura ~90 dias"
    O Git mantém o reflog por padrão por 90 dias. Enquanto estiver nesse prazo, **nada está permanentemente perdido**.

---

## 5. "Estou preso em um Detached HEAD"

Isso acontece quando você faz checkout diretamente de um **hash** de commit em vez de uma branch. O Git avisa com:

```
HEAD detached at 9f8e7d6
```

<div class="img-placeholder">
  <span>📸 Imagem: VS Code — canto inferior esquerdo mostrando "(HEAD detached at a1b2c3d)" em vez do nome de uma branch</span>
</div>

**Para sair e voltar ao normal (perdendo as alterações locais):**
```bash
git switch main
```

**Se você fez alterações valiosas durante o Detached HEAD e quer salvá-las:**
```bash
git switch -c branch-para-salvar-meu-trabalho
```

---

## 6. "O `git push` foi rejeitado"

O servidor remoto recusou seu push com algo como:
```
! [rejected] main -> main (fetch first)
```

Isso significa que alguém enviou commits ao remoto **depois** do seu último `pull`. O histórico remoto avançou e o Git não quer sobrescrever.

**Solução:**
```bash
# 1. Baixe as mudanças remotas
git pull

# 2. Resolva conflitos se houver (o editor do VS Code vai abrir)

# 3. Envie agora
git push
```

<div class="img-placeholder">
  <span>📸 Imagem: VS Code notificação de conflito após `git pull` — mostrando arquivos em conflito na aba Source Control</span>
</div>

---

## 7. "Preciso desfazer um push já publicado"

Se o commit **problemático** já foi enviado ao remoto e você **precisa desfazê-lo publicamente**:

```bash
# Cria um novo commit desfazendo as alterações (seguro para repositórios compartilhados)
git revert HASH_DO_COMMIT
git push
```

!!! danger "Nunca use `push --force` em branches compartilhadas"
    O `git push --force` sobrescreve o histórico remoto e pode destruir o trabalho de seus colegas. Use **apenas** em branches de feature que só você utiliza.
