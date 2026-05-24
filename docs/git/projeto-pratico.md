# Projeto Prático: Construindo um Site com Git Flow

Agora é a hora de colocar a mão na massa! Vamos simular o fluxo real de uma empresa criando um pequeno projeto passo a passo.

### 1. Iniciando o Projeto (Main)

Crie a pasta do projeto e inicie o repositório. O primeiro commit sempre vai para a branch principal.

```bash
mkdir meu-site-git
cd meu-site-git
git init
echo "<h1>Bem-vindo ao Meu Site</h1>" > index.html
git add index.html
git commit -m "feat: cria página inicial"
```

### 2. A Branch de Desenvolvimento (Develop)

Não trabalhamos direto na `main` para não quebrar a produção. Vamos criar a branch `develop`, que será nosso ambiente de testes e integração.

```bash
git switch -c develop
```

### 3. Trabalhando em uma Nova Funcionalidade (Feature)

Sua equipe pediu uma página de "Sobre nós". Vamos criar uma branch separada apenas para essa tarefa, saindo da `develop`.

```bash
git switch -c feature/pagina-sobre
echo "<p>Sobre nossa empresa...</p>" > sobre.html
git add sobre.html
git commit -m "feat: adiciona página sobre"
```

### 4. Integrando a Funcionalidade (Merge)

A página está pronta e foi testada! Vamos juntá-la na nossa branch de desenvolvimento.

```bash
git switch develop
git merge feature/pagina-sobre
```

### 5. Lançando a Versão Oficial (Release)

O site está maduro para ir ao ar. Vamos preparar uma Release, estabilizá-la e enviá-la para a Produção (`main`).

```bash
git switch -c release/1.0.0
# Comando para criar um commit vazio apenas para marcar o lançamento
git commit --allow-empty -m "chore: prepara lançamento da versão 1.0.0"

git switch main
git merge release/1.0.0
git tag v1.0.0
```

### 6. Emergência em Produção! (Hotfix)

Um erro crítico foi encontrado no site em produção. Precisamos corrigir imediatamente, criando uma branch a partir da `main`.

```bash
git switch main
git switch -c hotfix/corrige-titulo
echo "<h1>Bem-vindo ao Nosso Site Oficial!</h1>" > index.html
git add index.html
git commit -m "fix: corrige título da página inicial"

# Enviando a correção para a produção
git switch main
git merge hotfix/corrige-titulo
git tag v1.0.1

# É CRUCIAL não esquecer de atualizar a develop com o hotfix!
git switch develop
git merge hotfix/corrige-titulo
```

!!! success "Parabéns!"
    Você acabou de simular um ciclo de vida real de desenvolvimento de software usando **Git Flow**, exatamente como as grandes empresas e times de engenharia trabalham.
