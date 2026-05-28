# O que é Docker?

Docker é uma plataforma que simplifica a criação, o teste e a implantação de aplicações através de **contêineres**. Um contêiner empacota o código da aplicação e todas as suas dependências (bibliotecas, ferramentas do sistema) em um formato padronizado e portátil.

---

## O Fim do "Na Minha Máquina Funciona"

Este é o cenário que todo desenvolvedor já viveu:

> *"Funcionou no meu computador! Não sei por que não roda no servidor..."*

Com Docker, o contêiner leva consigo **exatamente** o ambiente que a aplicação precisa — sistema de arquivos, variáveis de ambiente, bibliotecas e tudo mais. O resultado é sempre o mesmo, em qualquer máquina.

<div class="img-placeholder">
  <span>📸 Imagem: Diagrama "Works on my machine" — desenvolvedor empurrando um contêiner igual para laptop, servidor de teste e produção</span>
</div>

---

## Máquinas Virtuais vs Contêineres

=== "🖥️ Máquinas Virtuais (VMs)"
    Emulam o hardware completo e exigem um **Sistema Operacional Guest** inteiro para cada VM. São pesadas, lentas para iniciar (minutos) e consomem muita memória RAM — mesmo sem rodar nenhuma aplicação.

    ```
    ┌──────────────────────────────────┐
    │  App A   │  App B   │  App C     │
    ├──────────┼──────────┼────────────┤
    │  OS Full │  OS Full │  OS Full   │  ← Sistema operacional completo cada
    ├──────────┴──────────┴────────────┤
    │         Hypervisor               │
    ├──────────────────────────────────┤
    │    Sistema Operacional Host       │
    └──────────────────────────────────┘
    ```

=== "📦 Contêineres Docker"
    Compartilham o **kernel** do Sistema Operacional hospedeiro. São leves, iniciam em segundos e você pode rodar dezenas deles no mesmo computador sem perda drástica de performance.

    ```
    ┌──────────────────────────────────┐
    │  App A   │  App B   │  App C     │
    ├──────────┼──────────┼────────────┤
    │ Libs/Env │ Libs/Env │ Libs/Env   │  ← Apenas dependências da app
    ├──────────┴──────────┴────────────┤
    │         Docker Engine            │
    ├──────────────────────────────────┤
    │    Sistema Operacional Host       │
    └──────────────────────────────────┘
    ```

<div class="img-placeholder">
  <span>📸 Imagem: Diagrama comparativo lado a lado — arquitetura de VMs (com múltiplos Guest OS) vs. Contêineres Docker (compartilhando kernel)</span>
</div>

| Característica | VM | Contêiner |
| :--- | :---: | :---: |
| Tempo de inicialização | Minutos | Segundos |
| Tamanho típico | Gigabytes | Megabytes |
| Isolamento | Total (SO separado) | Processo isolado |
| Consumo de RAM | Alto | Baixo |
| Portabilidade | Moderada | Alta |

---

## Por que usar Docker?

| Benefício | Descrição |
| :--- | :--- |
| 🎯 **Padronização** | Ambientes idênticos entre desenvolvimento, homologação e produção. |
| 🔒 **Isolamento** | O que roda no contêiner A não interfere no B nem no sistema hospedeiro. |
| ⚡ **Agilidade** | Subir um PostgreSQL ou Redis localmente leva cerca de 5 segundos. |
| 💰 **Eficiência** | Otimiza o uso de infraestrutura, reduzindo custos de servidores e cloud. |
| 🚀 **Onboarding** | Novos desenvolvedores não perdem dias configurando a máquina. |
| 🏗️ **Microsserviços** | Ideal para arquiteturas onde diferentes partes do sistema rodam separadas. |

---

## Onde o Docker é usado na prática?

- **Backend de aplicações web** (APIs em Node.js, Python, Java, Go...)
- **Bancos de dados locais de desenvolvimento** (PostgreSQL, MySQL, MongoDB, Redis)
- **Pipelines de CI/CD** (GitHub Actions, GitLab CI rodam seus jobs em contêineres)
- **Microsserviços em produção** (Kubernetes orquestra contêineres em escala)
- **Ambientes de teste isolados** (cada branch pode ter seu próprio ambiente)

<div class="img-placeholder">
  <span>📸 Imagem: Dashboard do Docker Desktop mostrando múltiplos contêineres rodando (PostgreSQL, Redis, API Node) com status e uso de recursos</span>
</div>
