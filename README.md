# Auto ML

Projeto com backend em **FastAPI**, frontend em **React + Vite** e banco de dados local usando **PostgreSQL via Docker Compose**.

## Estrutura de pastas

```text
auto-ml/
|-- backend/                  # API em FastAPI
|   |-- main.py
|   |-- pyproject.toml        # Configuracao do Ruff
|   |-- requirements.txt      # Dependencias Python do backend
|   `-- requirements-dev.txt  # Dependencias de desenvolvimento do backend
|-- database/                 # Configuracao do banco local
|   `-- compose.yaml
|-- frontend/                 # Aplicacao React com Vite
|   |-- public/
|   `-- src/
|       |-- app/              # Configuracoes de app, rotas e providers
|       |-- components/       # Componentes compartilhados
|       |-- features/         # Componentes e regras por dominio
|       |-- pages/            # Telas completas
|       |-- App.tsx
|       |-- index.css         # Variaveis globais e paleta
|       `-- main.tsx
|-- .editorconfig
|-- .gitignore
`-- README.md
```

## Backend

A API fica em `backend/`.

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements-dev.txt
fastapi dev main.py
```

Depois de iniciar o servidor, acesse:

- API: `http://localhost:8000`
- Docs: `http://localhost:8000/docs`

## Frontend

A aplicacao web fica em `frontend/` e usa React, Vite, TypeScript, pnpm e GitHub Primer.

```bash
cd frontend
pnpm install
pnpm run dev
```

A URL local padrao e `http://localhost:5173`.

## GitHub Primer

O frontend usa **GitHub Primer React** como base de componentes.

Configuracao principal:

- `frontend/src/main.tsx` importa o tema do Primer.
- `ThemeProvider` e `BaseStyles` envolvem o app.
- Componentes de UI devem vir de `@primer/react` sempre que existir uma opcao adequada.

Exemplo:

```tsx
import { Button, FormControl, TextInput } from "@primer/react";
```

Use Primer para controles comuns: `Button`, `TextInput`, `FormControl`, `SegmentedControl`, `Dialog`, `Label`, `Stack`, `PageLayout`, `NavList`, tabelas e feedbacks.

## Padrao de componentes

Organizacao recomendada no `frontend/src`:

```text
src/
|-- app/                 # rotas, providers, configuracoes globais
|-- components/          # layout e componentes reaproveitaveis
|   `-- layout/
|-- features/            # funcionalidades por dominio
|   `-- auth/
|       |-- components/
|       `-- types.ts
|-- pages/               # telas completas que juntam layouts e features
|-- App.tsx
|-- index.css
`-- main.tsx
```

Regras praticas:

- `pages/` monta a tela.
- `features/` guarda componentes e logica de uma funcionalidade especifica.
- `components/` guarda pecas compartilhadas entre varias features.
- CSS de componente fica ao lado do componente: `AuthForm.tsx` + `AuthForm.css`.
- `App.tsx` deve apenas apontar para a pagina/roteamento atual.

## Padrao de cores

As cores do frontend devem sair de `frontend/src/index.css`.

Use variaveis semanticas nos componentes:

```css
background: var(--color-surface);
color: var(--color-text);
border-color: var(--color-border);
```

Nao coloque hex direto em CSS de componente, exceto quando estiver definindo a paleta em `index.css`.

A paleta tem blocos para light e dark:

```css
:root,
[data-theme="light"] {
  --color-canvas: #f6f8fa;
  --color-surface: #ffffff;
}

[data-theme="dark"] {
  --color-canvas: #0d1117;
  --color-surface: #161b22;
}
```

Para trocar a paleta, altere apenas as variaveis em `index.css`. Para ativar dark mode manualmente, defina `data-theme="dark"` no elemento `html` ou em um wrapper raiz.

O `index.css` tambem mapeia algumas variaveis do Primer para a paleta do projeto, como `--bgColor-default`, `--fgColor-default`, `--borderColor-default` e tokens do botao primario.

## Banco de dados

A configuracao do PostgreSQL fica em `database/compose.yaml`.

```bash
cd database
docker compose up -d
```

Para parar o banco:

```bash
docker compose down
```

## Padronizacao de codigo

O projeto usa:

- **EditorConfig** para regras basicas de editor.
- **Prettier** no frontend.
- **Ruff** no backend.
- Recomendacoes do VS Code em `.vscode/`, incluindo formatacao ao salvar.

No frontend:

```bash
cd frontend
pnpm run format
pnpm run format:check
pnpm run lint
pnpm run check
```

No backend:

```bash
cd backend
ruff format .
ruff check .
ruff check . --fix
```

## Scripts uteis

No frontend:

```bash
pnpm run dev
pnpm run build
pnpm run lint
pnpm run preview
```

No backend:

```bash
fastapi dev main.py
fastapi run main.py
```

## Observacoes

- Arquivos sensiveis, ambientes virtuais, dependencias, builds e caches ficam fora do Git pelo `.gitignore`.
- Dependencias Python do backend ficam em `backend/requirements.txt`.
- Ferramentas de desenvolvimento Python ficam em `backend/requirements-dev.txt`.
- Credenciais e segredos devem ficar em variaveis de ambiente.
