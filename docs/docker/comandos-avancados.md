# Comandos Avançados e Inspeção

Além de iniciar e parar contêineres, o Docker possui ferramentas embutidas para debugar aplicações e limpar o ambiente.

## Inspeção (Inspect)

O comando `inspect` retorna um JSON gigante com absolutamente todos os detalhes de um contêiner, imagem ou rede.
```bash
docker inspect nome-do-conteiner
```
*Dica:* Útil para descobrir qual IP interno o contêiner recebeu na rede do Docker ou conferir variáveis de ambiente.

## Limpeza (Prune)

Com o tempo, o Docker acumula gigabytes de imagens velhas e contêineres parados.
```bash
# Apaga contêineres parados, redes sem uso e imagens órfãs
docker system prune

# Apaga TUDO que não está sendo usado no momento (use com cuidado!)
docker system prune -a
```

## Monitoramento (Stats e Top)

Para ver o consumo de CPU e RAM dos contêineres em tempo real:
```bash
docker stats
```

Para listar os processos do sistema operacional rodando dentro de um contêiner específico:
```bash
docker top nome-do-conteiner
```

## Logs Avançados

Se a sua aplicação está quebrando, os logs são seus melhores amigos:
```bash
# Acompanha os logs em tempo real (como o tail -f no Linux)
docker logs -f nome-do-conteiner

# Mostra apenas as últimas 50 linhas
docker logs --tail 50 nome-do-conteiner

# Mostra os logs com timestamp (data e hora)
docker logs -t nome-do-conteiner
```
