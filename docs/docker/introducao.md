# O que é Docker?

Docker é uma plataforma que simplifica a criação, o teste e a implantação de aplicações através de **contêineres**. Um contêiner empacota o código da aplicação e todas as suas dependências (bibliotecas, ferramentas do sistema) em um formato padronizado.

## Máquinas Virtuais vs Contêineres

=== "Máquinas Virtuais (VMs)"
    Emulam o hardware e exigem um Sistema Operacional (Guest OS) completo para cada VM. São pesadas, lentas para iniciar e consomem muita memória.

=== "Contêineres"
    Compartilham o kernel do Sistema Operacional hospedeiro (Host OS). São leves, iniciam em segundos e você pode rodar dezenas deles no mesmo computador sem perdas drásticas de performance.

!!! note "O fim do 'na minha máquina funciona'"
    Como o contêiner leva consigo o ambiente exato que a aplicação precisa, se funciona no seu computador, vai funcionar idêntico no servidor.

---

## Por que usar Docker?

* **Padronização:** Garante ambientes idênticos entre desenvolvimento, homologação e produção.
* **Isolamento:** O que roda no contêiner A não interfere no contêiner B nem no sistema hospedeiro.
* **Agilidade:** Subir um banco de dados localmente (ex: PostgreSQL ou Redis) leva cerca de 5 segundos.
* **Eficiência:** Otimiza o uso de recursos de infraestrutura, reduzindo custos de servidores e cloud.
* **Onboarding:** Novos desenvolvedores da equipe não perdem dias configurando a máquina para rodar o projeto.
* **Microsserviços:** Ideal para arquiteturas modernas onde diferentes partes do sistema rodam separadas.
