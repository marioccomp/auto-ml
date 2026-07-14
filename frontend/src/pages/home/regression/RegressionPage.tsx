import { useMutation, useQuery } from '@tanstack/react-query'

import { ThemeToggle } from '../../../components/theme/ThemeToggle'
import { RegressionDatasetForm } from '../../../features/regression/components/RegressionDatasetForm'
import type { RegressionDatasetResponse } from '../../../features/regression/types'

type ApiStatusResponse = {
  status: string
}

type DatasetUrlPayload = {
  url: string
}

const apiBaseUrl = import.meta.env.VITE_API_URL ?? '/api'

async function getApiStatus(): Promise<ApiStatusResponse> {
  const response = await fetch(`${apiBaseUrl}/`)

  if (!response.ok) {
    throw new Error('Nao foi possivel consultar o status da API.')
  }

  return response.json() as Promise<ApiStatusResponse>
}

async function postDatasetUrl(payload: DatasetUrlPayload): Promise<RegressionDatasetResponse> {
  const response = await fetch(`${apiBaseUrl}/get-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as { detail?: string } | null

    throw new Error(errorBody?.detail ?? 'Nao foi possivel enviar a URL do dataset.')
  }

  return response.json() as Promise<RegressionDatasetResponse>
}

export function RegressionPage() {
  const apiStatusQuery = useQuery({
    queryKey: ['regression', 'api-status'],
    queryFn: getApiStatus,
  })

  const datasetUrlMutation = useMutation({
    mutationFn: postDatasetUrl,
  })

  return (
    <main className="grid min-h-svh items-center bg-[var(--color-canvas)] px-[var(--space-6)] py-[clamp(var(--space-5),6vw,72px)] text-[var(--color-text)] max-[480px]:items-start max-[480px]:px-[var(--space-4)] max-[480px]:pt-[72px] max-[480px]:pb-[var(--space-5)]">
      <ThemeToggle />

      <section
        className="mx-auto grid w-[min(100%,720px)] gap-[var(--space-5)]"
        aria-labelledby="regression-title"
      >
        <div className="grid gap-[var(--space-3)]">
          <p className="m-0 text-[0.8125rem] font-bold tracking-normal text-[var(--color-accent-text)] uppercase">
            Auto ML
          </p>
          <h1
            className="m-0 text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-bold tracking-normal text-[var(--color-text)]"
            id="regression-title"
          >
            Regressao linear
          </h1>
          <p className="m-0 max-w-[620px] text-base leading-[1.6] text-[var(--color-text-muted)]">
            Informe a URL de um dataset numerico para preparar a visualizacao inicial do resultado.
          </p>

          <div
            className="flex w-fit items-center gap-[var(--space-3)] rounded-[var(--radius-md)] border border-[var(--color-accent-border)] bg-[var(--color-accent-muted)] px-[var(--space-3)] py-[var(--space-2)]"
            aria-live="polite"
          >
            <span className="font-mono text-[0.8125rem] text-[var(--color-accent-text)]">
              GET /
            </span>
            <strong className="text-sm text-[var(--color-text)]">
              {apiStatusQuery.isPending
                ? 'Verificando API'
                : apiStatusQuery.isError
                  ? 'API indisponivel'
                  : `API ${apiStatusQuery.data.status}`}
            </strong>
          </div>
        </div>

        <RegressionDatasetForm
          errorMessage={datasetUrlMutation.isError ? datasetUrlMutation.error.message : undefined}
          isSubmitting={datasetUrlMutation.isPending}
          onSubmitDataset={(url) => datasetUrlMutation.mutate({ url })}
          result={datasetUrlMutation.data}
        />
      </section>
    </main>
  )
}
