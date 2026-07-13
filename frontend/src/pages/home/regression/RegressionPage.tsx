import { useMutation, useQuery } from '@tanstack/react-query'

import { ThemeToggle } from '../../../components/theme/ThemeToggle'
import { RegressionDatasetForm } from '../../../features/regression/components/RegressionDatasetForm'
import type { RegressionDatasetResponse } from '../../../features/regression/types'
import './RegressionPage.css'

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
    <main className="regression-page">
      <ThemeToggle />

      <section className="regression-page__content" aria-labelledby="regression-title">
        <div className="regression-page__header">
          <p className="regression-page__eyebrow">Auto ML</p>
          <h1 id="regression-title">Regressao linear</h1>
          <p>
            Informe a URL de um dataset numerico para preparar a visualizacao inicial do resultado.
          </p>

          <div className="regression-page__api-status" aria-live="polite">
            <span>GET /</span>
            <strong>
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
