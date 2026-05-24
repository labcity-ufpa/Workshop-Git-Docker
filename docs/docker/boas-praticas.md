# Boas Práticas com Docker

=== "✅ O que FAZER"
    * Sempre use imagens base oficiais e confiáveis (ex: `node`, `python`, `postgres`).
    * Trave as versões específicas de imagens em vez de usar `:latest` (ex: `node:18.16.0`) para evitar quebras de versão surpresa.
    * Use variações `-alpine` ou `-slim` quando possível para reduzir o tamanho da imagem final e a superfície de ataque.
    * Utilize o arquivo `.dockerignore` (similar ao `.gitignore`) para não copiar a pasta `node_modules` ou outros arquivos locais pesados pro contêiner.

=== "❌ O que NÃO FAZER"
    * Não salve dados importantes ou tabelas de banco de dados diretamente dentro do contêiner sem mapear um volume. Você perderá tudo ao reiniciar ou atualizar a imagem.
    * Não coloque senhas em texto puro ou chaves de API "hardcoded" dentro do Dockerfile. Use variáveis de ambiente (environment variables) em tempo de execução.
    * Evite rodar processos múltiplos (ex: API + Banco de Dados + Redis) dentro do mesmo contêiner. A regra de ouro é: **"Um serviço principal por contêiner"**.
