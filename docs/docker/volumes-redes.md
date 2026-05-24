# Volumes e Redes

## Volumes

Por padrão, quando um contêiner é deletado, todos os arquivos criados dentro dele são apagados para sempre. **Volumes** resolvem isso persistindo os dados no disco físico do computador hospedeiro.

```mermaid
graph LR
    A[Host<br>Seu SSD] <-->|Volume Mapeado| B[Contêiner<br>Ex: PostgreSQL]
    style A fill:#1e293b,stroke:#38bdf8
    style B fill:#1e293b,stroke:#22c55e
```

**Criando e usando um volume nomeado gerenciado pelo Docker:**
```bash
docker volume create meu-volume
docker run -d -v meu-volume:/app/data ubuntu
```

**Mapeando uma pasta local diretamente (Bind Mount - útil para desenvolvimento):**
```bash
docker run -d -v $(pwd)/codigo:/app/codigo node
```

---

## Redes (Networks)

Contêineres isolados não se enxergam. Colocando-os na mesma rede Docker, eles podem se comunicar usando o **nome do contêiner** como endereço (DNS interno).

```bash
docker network create minha-rede
docker run -d --name meubanco --network minha-rede postgres
docker run -d --name minhaapi --network minha-rede meu-app
```

Neste cenário, a `minhaapi` pode conectar no banco de dados livremente acessando o endereço `meubanco:5432`.
