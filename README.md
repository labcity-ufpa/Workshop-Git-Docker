# 📘 Workshop Git & Docker

Site de apoio para a oficina de Git e Docker — do zero ao Git Flow e Docker Compose.

**🔗 Acesse online:** [GitHub Pages](https://labcity-ufpa.github.io/Workshop-Git-Docker/)

---

## 🚀 Rodando Localmente

### Pré-requisitos

- [Python 3.x](https://www.python.org/downloads/) instalado
- `pip` disponível no terminal

### Instalação

```bash
# Clone o repositório
git clone https://github.com/<seu-usuario>/Workshop-Git-Docker.git
cd Workshop-Git-Docker

# Crie um ambiente virtual (recomendado)
python -m venv venv

# Ative o ambiente virtual
# Windows (PowerShell)
.\venv\Scripts\Activate.ps1
# Windows (CMD)
.\venv\Scripts\activate.bat
# Linux/macOS
source venv/bin/activate

# Instale as dependências
pip install mkdocs-material mkdocstrings mkdocstrings-python
```

### Servidor de desenvolvimento

```bash
mkdocs serve
```

O site estará disponível em **http://127.0.0.1:8000** com hot-reload automático — qualquer alteração nos arquivos `.md` atualiza o navegador em tempo real.

### Build estático

```bash
mkdocs build
```

Gera o site em `./site/` pronto para hospedagem.

---

## 📁 Estrutura do Projeto

```
Workshop-Git-Docker/
├── mkdocs.yml              # Configuração do site (tema, navegação, extensões)
├── docs/
│   ├── index.md            # Página inicial
│   ├── git/                # Módulo de Git
│   │   ├── conceitos.md
│   │   ├── instalacao.md
│   │   ├── comandos.md
│   │   ├── gitignore.md
│   │   ├── branches.md
│   │   ├── avancado.md
│   │   ├── boas-praticas.md
│   │   ├── troubleshooting.md
│   │   ├── truques.md
│   │   ├── git-flow.md
│   │   └── projeto-pratico.md
│   ├── docker/             # Módulo de Docker
│   │   ├── introducao.md
│   │   ├── instalacao.md
│   │   ├── modelo-mental.md
│   │   ├── comandos.md
│   │   ├── comandos-avancados.md
│   │   ├── dockerfile.md
│   │   ├── compose.md
│   │   ├── volumes-redes.md
│   │   ├── boas-praticas.md
│   │   └── projeto-pratico.md
│   └── ci-cd.md            # Integração Contínua
└── .github/
    └── workflows/
        └── ci.yml          # Deploy automático via GitHub Pages
```

---

## ✏️ Como Contribuir

1. Edite ou crie arquivos `.md` dentro de `docs/`
2. Atualize a navegação em `mkdocs.yml` (seção `nav`) se adicionar páginas novas
3. Teste localmente com `mkdocs serve`
4. Faça commit e push — o deploy para GitHub Pages é automático via CI

### Extensões Markdown disponíveis

| Recurso                | Sintaxe                                 |
| ---------------------- | --------------------------------------- |
| Admonitions (callouts) | `!!! note "Título"`                     |
| Blocos colapsáveis     | `??? tip "Clique para expandir"`        |
| Código com destaque    | ` ```python hl_lines="2 3" `            |
| Copiar código (botão)  | Automático em todos os blocos de código |

---

## 🌐 Deploy

O deploy é feito automaticamente pelo GitHub Actions. A cada push na branch `main`, o workflow:

1. Instala Python e dependências
2. Executa `mkdocs gh-deploy --force`
3. Publica o site na branch `gh-pages`

---

## 🛠️ Tecnologias

- [MkDocs](https://www.mkdocs.org/) — gerador de sites estáticos
- [Material for MkDocs](https://squidfundingmaterial.mkdocs.org/) — tema com design responsivo
- [GitHub Actions](https://docs.github.com/en/actions) — CI/CD
- [GitHub Pages](https://pages.github.com/) — hospedagem

---

## 📝 Licença

Conteúdo educacional para uso interno nas oficinas do laboratório.
