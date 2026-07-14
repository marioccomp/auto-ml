# Arquitetura do frontend

Este documento registra os padroes atuais do frontend para manter as proximas entregas consistentes.

## Estrutura

- `src/app`: configuracoes da aplicacao, constantes de rota e pontos de composicao globais.
- `src/pages`: paginas roteaveis. Cada arquivo monta a tela usando layouts e features.
- `src/features/<dominio>`: codigo de dominio, como auth e errors. Componentes especificos ficam em `components` dentro da feature.
- `src/components`: componentes compartilhados entre features, como layout e tema.
- Estilos de componentes e telas usam Tailwind CSS diretamente no JSX.
- O CSS global deve ser mantido apenas para imports do Tailwind, tokens de tema, reset/base do documento, ponte de variaveis do Primer e utilitarios globais realmente compartilhados.

## Rotas

- A URL deve ser a fonte de verdade sempre que representar uma tela, modo ou recurso navegavel.
- O state local pode espelhar a URL para deixar a navegacao rapida, desde que seja sincronizado com `history.pushState`, `history.replaceState` e `popstate`.
- Evite guardar apenas em state local aquilo que deve sobreviver a reload, link direto ou historico do navegador.
- Use `navigateTo`, em `src/app/routes.ts`, para navegacao interna sem reload.
- Rotas atuais:
  - `/`: redireciona para `/login` usando `replaceState`.
  - `/login`: tela de autenticacao no modo login.
  - `/register`: tela de autenticacao no modo registro.
  - qualquer outra rota: tela padronizada de erro `404`.
- As constantes de rota ficam em `src/app/routes.ts`.

## UI e tema

- Usamos GitHub Primer (`@primer/react`) como base de componentes.
- Usamos Tailwind CSS para layout, espacamento, responsividade e estados visuais dos componentes.
- Tokens visuais globais ficam em `src/index.css`, incluindo a ponte para variaveis funcionais do Primer.
- Mantemos `src/index.css` porque tema claro/escuro, `color-scheme`, resets do documento, variaveis funcionais do Primer e animacoes globais nao pertencem a um componente especifico.
- A aplicacao deve funcionar em modo claro e escuro via `data-theme` no elemento `html`.
- `ThemeToggle` e responsavel por alternar tema e persistir a escolha em `localStorage`.
- Componentes novos devem preferir utilities do Tailwind e respeitar os tokens existentes via valores arbitrarios quando necessario: `--color-*`, `--space-*`, `--radius-*` e `--shadow-*`.
- Evite criar arquivos `.css` por componente. Se uma regra nao couber bem em Tailwind, primeiro avalie se ela e um token/base global ou se pode ser expressa com utilities e variantes arbitrarias.

## Auth

- Login e registro usam a mesma feature e o mesmo formulario, mas o modo vem da URL.
- O `SegmentedControl` troca entre `/login` e `/register` sem recarregar a pagina.
- State local deve ser usado para estado transitorio de UI, como feedback de envio, ou para espelhar a URL no roteamento.

## Erros

- Erros de pagina usam `ErrorScreen`, em `src/features/errors/components`.
- A tela aceita status, titulo, descricao, detalhes, acoes e metadados para reutilizacao em `404`, `500` ou falhas semelhantes.
- A pagina `NotFoundPage` e o fallback atual para rotas desconhecidas.

## Requisicoes

- O padrao definido para requisicoes e server state e TanStack Query (`@tanstack/react-query`).
- Use queries para leitura/cache de dados e mutations para operacoes de escrita.
- Query keys devem ser organizadas por feature, com nomes previsiveis e serializaveis.
- Evite `useEffect` para fetch comum quando uma query resolver o caso.
- Estados de loading, erro e retry devem ser tratados perto do componente que consome os dados, reutilizando telas ou componentes padronizados quando fizer sentido.

## Validacao

- Antes de entregar alteracoes, rode `npm run check`.
- Para validar compilacao TypeScript sem depender do empacotamento do Vite, use `npx tsc -b`.
- `npm run build` valida o bundle final, mas no sandbox do Windows pode exigir permissao extra por causa do Vite.
