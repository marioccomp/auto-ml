# Auto ML

Projeto com backend em **FastAPI**, frontend em **React + Vite** e banco de dados local usando **PostgreSQL via Docker Compose**.

## Estrutura de pastas

```text
auto-ml/
├── backend/                  # API em FastAPI
│   ├── main.py
│   ├── pyproject.toml        # Configuração do Ruff
│   ├── requirements.txt      # Dependências Python do backend
│   └── requirements-dev.txt  # Dependências de desenvolvimento do backend
├── database/                 # Configuração do banco local
│   └── compose.yaml
├── frontend/                 # Aplicação React com Vite
│   ├── public/
│   └── src/
├── .editorconfig             # Regras básicas compartilhadas entre editores
├── .gitignore
└── README.md
```

## Backend

A API fica na pasta `backend/` e atualmente expõe uma rota inicial para verificar se o serviço está respondendo.

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements-dev.txt
fastapi dev main.py
```

Depois de iniciar o servidor, acesse:

- API: `http://localhost:8000`
- Documentação interativa: `http://localhost:8000/docs`

> `fastapi dev main.py` é o comando recomendado para desenvolvimento. Ele encontra a aplicação FastAPI no arquivo `main.py`, ativa o reload automático e usa o Uvicorn por baixo. O comando `uvicorn main:app --reload` também funciona, mas é mais explícito e um pouco menos conveniente para o dia a dia.

## Frontend

A aplicação web fica na pasta `frontend/` e usa React com Vite.

```bash
cd frontend
npm install
npm run dev
```

Depois de iniciar, o Vite mostra no terminal a URL local da aplicação, geralmente `http://localhost:5173`.

## Banco de dados

A configuração do PostgreSQL fica em `database/compose.yaml`.

```bash
cd database
docker compose up -d
```

Para parar o banco:

```bash
docker compose down
```

## Padronização de código

Para manter o código consistente em dupla, o projeto usa:

- **EditorConfig** na raiz, para regras básicas de editor.
- **Prettier** no frontend, para TypeScript, React, CSS, JSON e Markdown.
- **Ruff** no backend, para formatar Python, organizar imports e apontar problemas comuns.
- Recomendações do VS Code em `.vscode/`, incluindo formatação ao salvar.

No frontend:

```bash
cd frontend
pnpm run format        # formata os arquivos
pnpm run format:check  # verifica se a formatação está correta
pnpm run lint          # executa o ESLint
pnpm run check         # executa lint + checagem do Prettier
```

No backend:

```bash
cd backend
ruff format .       # formata os arquivos Python
ruff check .        # verifica lint/imports
ruff check . --fix  # corrige automaticamente o que for seguro
```

## Scripts úteis

No frontend:

```bash
pnpm run dev      # inicia o ambiente de desenvolvimento
pnpm run build    # gera a versão de produção
pnpm run lint     # executa o lint
pnpm run preview  # pré-visualiza o build
```

No backend:

```bash
fastapi dev main.py  # inicia a API em modo desenvolvimento
fastapi run main.py  # inicia a API em modo produção
```

## Observações

- Arquivos sensíveis, ambientes virtuais, dependências, builds e caches ficam fora do Git pelo `.gitignore` da raiz.
- As dependências Python do backend ficam centralizadas em `backend/requirements.txt`.
- As ferramentas de desenvolvimento Python ficam em `backend/requirements-dev.txt`.
- Se alterar as credenciais do banco, prefira usar variáveis de ambiente em vez de deixar dados sensíveis direto no repositório.