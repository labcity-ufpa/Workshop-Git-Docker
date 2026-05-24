# O Encontro de Dois Mundos: Integração Contínua (CI)

Ao longo deste workshop, aprendemos que:
* O **Git** serve para versionar seu código, trabalhar em equipe e aprovar alterações (Pull Requests).
* O **Docker** serve para empacotar a aplicação de forma que ela rode perfeitamente em qualquer servidor do mundo.

Mas como esses dois universos se conectam no mercado de trabalho real? A resposta é: **Pipelines de CI/CD**.

## O Conceito de CI/CD

Quando você trabalha em uma grande empresa, você não digita `docker build` no seu computador e manda o código manualmente por FTP ou pendrive para o servidor. O processo é **totalmente automatizado**.

1. **(Git)** Você faz um `git push` para a branch `main`.
2. O servidor (GitHub, GitLab, etc) percebe a alteração e dispara um **Pipeline (Esteira)**.
3. **(Docker)** Essa esteira "puxa" seu código em uma nuvem isolada, roda um `docker build` automático criando a imagem, e a envia para o Docker Hub ou para a AWS (Registry).
4. O servidor de produção (AWS, Azure) baixa essa imagem e faz o deploy do seu site sem que nenhum ser humano precise tocar em botões.

Isso é o que chamamos de Integração Contínua (CI) e Entrega Contínua (CD).

---

## Prática: Criando sua Primeira Pipeline (GitHub Actions)

Vamos simular como o Git e o Docker se associam. Faremos com que, toda vez que enviarmos um código para o GitHub, ele gere a página web deste próprio workshop usando Docker!

### 1. Criando a configuração da Pipeline

No seu repositório, crie uma pasta chamada `.github/workflows` e crie um arquivo dentro chamado `ci.yml`.

```bash
mkdir -p .github/workflows
touch .github/workflows/ci.yml
```

### 2. A Receita da Automação (ci.yml)

Abra o arquivo e cole o script abaixo. Observe como os comandos de Git e Docker estão mesclados dentro do ambiente do GitHub:

```yaml
name: Deploy do Site do Workshop

# O "gatilho" do Git
on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs: 
  deploy:
    runs-on: ubuntu-latest
    steps:
      # 1. Comando Git: Baixa o seu código para o servidor do GitHub
      - name: Git Checkout
        uses: actions/checkout@v4

      # 2. Prepara o ambiente Python
      - name: Configurar Ambiente
        uses: actions/setup-python@v5
        with:
          python-version: 3.x

      # 3. Usa o Cache para ficar mais rápido na próxima vez
      - uses: actions/cache@v3
        with:
          key: ${{ github.ref }}
          path: .cache

      # 4. Instala as dependências (poderia ser um docker build aqui!)
      - name: Instalar Dependências
        run: pip install mkdocs-material mkdocstrings

      # 5. Comando Final: Publica a versão estática do site
      - name: Fazer o Deploy (Publish)
        run: mkdocs gh-deploy --force
```

### 3. A Mágica Acontece

Ao fazer `git add`, `git commit` e um `git push` desse arquivo para o GitHub, você pode clicar na aba **"Actions"** do seu repositório na web.

Você verá o servidor em nuvem obedecendo exatamente o que o `.yml` ditou: ele usou eventos do **Git** (gatilho push na main) para rodar instruções (instalar pacotes, buildar, publicar) automaticamente.

Em grandes empresas, a lógica é idêntica: o `ci.yml` apenas conteria as instruções `docker build -t minha-api .` e `docker push minha-api:latest`, automatizando a entrega de software do zero a milhões de usuários de forma robusta e livre de falha humana.
