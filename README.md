# Site de Avaliações IFUSP

Este projeto é uma aplicação web que permite que estudantes do Instituto de Física da Universidade de São Paulo avaliem anonimamente professores e as disciplinas que eles ministram. Também possibilita visualizar avaliações enviadas por outros estudantes.

## Estrutura do Projeto

```
ifusp-evaluation-website
├── public
│   ├── index.html         # Documento HTML principal do site
│   ├── avaliacoes.html    # Documento HTML com avaliações anteriores
│   │
│   ├── styles
│   │   └── ifusp-palette.css   # Estilos CSS do site
│   │
│   └── scripts
│       └── main.js        # JavaScript para interações do usuário
│       └── avaliacoes.js  # JavaScript para interações do usuário
│
├── src
│   ├── server.js          # Ponto de entrada da aplicação no servidor
│   │
│   ├── data
│   │   └── evaluations.json    # Armazena as avaliações em formato JSON
│   │
│   └── ifusp.png          # Logo do IFUSP
│
├── package.json           # Arquivo de configuração do npm
├── package-lock.json      # Lock file gerado automaticamente pelo npm
└── README.md              # Documentação do projeto
```

## Orientações de Uso

- Estudantes podem enviar avaliações anonimamente pela interface web.
- As avaliações enviadas serão armazenadas e podem ser visualizadas por outros estudantes.
- A aplicação foi projetada para ser amigável e acessível.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para enviar um pull request ou abrir uma issue com sugestões ou melhorias.

## Licença

Este projeto está licenciado sob a Licença MIT.