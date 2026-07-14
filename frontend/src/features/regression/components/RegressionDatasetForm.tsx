import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button, FormControl, TextInput } from '@primer/react'

import type { RegressionDatasetResponse, RegressionPrimitive } from '../types'

type RegressionResult = {
  message: string
}

type RegressionDatasetFormProps = {
  errorMessage?: string
  isSubmitting?: boolean
  onSubmitDataset?: (datasetUrl: string) => void
  result?: RegressionDatasetResponse
}

const mockResult: RegressionResult = {
  message: 'Dataset recebido. A pre-visualizacao da regressao linear sera exibida aqui.',
}

const formShellClassName =
  "grid w-full gap-[var(--space-5)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[clamp(var(--space-5),5vw,var(--space-7))] text-[var(--color-text)] shadow-[var(--shadow-lg)] [--button-primary-bgColor-active:var(--color-action-active)] [--button-primary-bgColor-hover:var(--color-action-hover)] [--button-primary-bgColor-rest:var(--color-action)] [--button-primary-borderColor-hover:var(--color-action-border)] [--button-primary-borderColor-rest:var(--color-action-border)] [--button-primary-fgColor-rest:var(--color-action-text)] [&_input]:!bg-[var(--color-field-bg)] [&_input]:!text-[var(--color-field-text)] [&_input]:!shadow-none [&_input::placeholder]:!text-[var(--color-text-muted)] [&_label]:!text-[var(--color-text)] [&_[class*='Caption']]:!text-[var(--color-text-muted)] [&_[class*='Label']]:!text-[var(--color-text)] [&_[class*='TextInput']]:!border-[var(--color-border)] [&_[class*='TextInput']]:!bg-[var(--color-field-bg)] [&_[class*='TextInput']]:!text-[var(--color-field-text)]"

export function RegressionDatasetForm({
  errorMessage,
  isSubmitting = false,
  onSubmitDataset,
  result,
}: RegressionDatasetFormProps) {
  const [datasetUrl, setDatasetUrl] = useState('')
  const [data, setData] = useState<RegressionResult | null>(null)
  const feedbackMessage = data?.message
  const previewRows = result?.['x-preview'] ?? []
  const targetPreview = result?.['y-preview'] ?? []
  const targetColumn = result?.columns[result.columns.length - 1]
  const previewColumns = previewRows[0] ? Object.keys(previewRows[0]).slice(0, 5) : []

  function formatValue(value: RegressionPrimitive | undefined) {
    if (value === null || value === undefined || value === '') {
      return '-'
    }

    return String(value)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setData(null)

    if (onSubmitDataset) {
      onSubmitDataset(datasetUrl)
      return
    }

    setData(mockResult)
  }

  return (
    <div className={formShellClassName}>
      <form className="grid gap-[var(--space-4)]" onSubmit={handleSubmit}>
        <FormControl required>
          <FormControl.Label>URL do dataset</FormControl.Label>
          <TextInput
            block
            name="datasetUrl"
            onChange={(event) => setDatasetUrl(event.target.value)}
            placeholder="https://www.openml.org/search?type=data&id=31"
            size="large"
            type="url"
            value={datasetUrl}
          />
          <FormControl.Caption>
            Use uma URL do OpenML com parametro id, como o backend espera.
          </FormControl.Caption>
        </FormControl>

        <Button
          block
          className="justify-center"
          disabled={isSubmitting}
          type="submit"
          variant="primary"
        >
          {isSubmitting ? 'Enviando...' : 'Visualizar resultado'}
        </Button>
      </form>

      {errorMessage ? (
        <section
          className="rounded-[var(--radius-md)] border border-[var(--color-danger-border)] bg-[var(--color-danger-muted)] p-[var(--space-4)] [&_p]:m-0 [&_p]:text-[0.9375rem] [&_p]:leading-[1.5] [&_p]:text-[var(--color-danger)]"
          aria-live="polite"
          aria-label="Erro"
        >
          <p>{errorMessage}</p>
        </section>
      ) : null}

      {feedbackMessage ? (
        <section
          className="rounded-[var(--radius-md)] border border-[var(--color-accent-border)] bg-[var(--color-accent-muted)] p-[var(--space-4)] [&_p]:m-0 [&_p]:text-[0.9375rem] [&_p]:leading-[1.5] [&_p]:text-[var(--color-accent-text)]"
          aria-live="polite"
          aria-label="Resultado"
        >
          <p>{feedbackMessage}</p>
        </section>
      ) : null}

      {result ? (
        <section
          className="grid gap-[var(--space-5)] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-[var(--space-5)]"
          aria-live="polite"
          aria-label="Dataset"
        >
          <div className="grid gap-[var(--space-1)]">
            <p className="m-0 text-[0.8125rem] font-bold tracking-normal text-[var(--color-text-muted)] uppercase">
              Dataset carregado
            </p>
            <strong className="text-xl leading-[1.2] text-[var(--color-text)]">
              Preview recebido do backend
            </strong>
          </div>

          <dl className="m-0 grid grid-cols-3 gap-[var(--space-3)] max-[640px]:grid-cols-1">
            <div className="min-w-0 rounded-[var(--radius-md)] border border-[var(--color-border-muted)] bg-[var(--color-surface)] p-[var(--space-3)]">
              <dt className="text-xs font-semibold text-[var(--color-text-muted)]">Amostras</dt>
              <dd className="mt-[var(--space-1)] mb-0 [overflow-wrap:anywhere] font-bold text-[var(--color-text)]">
                {previewRows.length}
              </dd>
            </div>
            <div className="min-w-0 rounded-[var(--radius-md)] border border-[var(--color-border-muted)] bg-[var(--color-surface)] p-[var(--space-3)]">
              <dt className="text-xs font-semibold text-[var(--color-text-muted)]">Colunas</dt>
              <dd className="mt-[var(--space-1)] mb-0 [overflow-wrap:anywhere] font-bold text-[var(--color-text)]">
                {result.columns.length}
              </dd>
            </div>
            <div className="min-w-0 rounded-[var(--radius-md)] border border-[var(--color-border-muted)] bg-[var(--color-surface)] p-[var(--space-3)]">
              <dt className="text-xs font-semibold text-[var(--color-text-muted)]">Target</dt>
              <dd className="mt-[var(--space-1)] mb-0 [overflow-wrap:anywhere] font-bold text-[var(--color-text)]">
                {targetColumn?.name ?? '-'}
              </dd>
            </div>
          </dl>

          <div className="grid gap-[var(--space-3)]">
            <p className="m-0 text-[0.8125rem] font-bold tracking-normal text-[var(--color-text-muted)] uppercase">
              Colunas detectadas
            </p>
            <ul className="m-0 flex list-none flex-wrap gap-[var(--space-2)] p-0">
              {result.columns.map((column, columnIndex) => (
                <li
                  className="inline-flex max-w-full items-center gap-[var(--space-2)] rounded-[var(--radius-sm)] border border-[var(--color-border-muted)] bg-[var(--color-surface)] px-[var(--space-3)] py-[var(--space-2)]"
                  key={`${column.name}-${column.type}-${columnIndex}`}
                >
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-[var(--color-text)]">
                    {column.name}
                  </span>
                  <small className="text-xs text-[var(--color-text-muted)]">
                    {columnIndex === result.columns.length - 1 ? 'target' : column.type}
                  </small>
                </li>
              ))}
            </ul>
          </div>

          {previewColumns.length > 0 ? (
            <div className="grid gap-[var(--space-3)]">
              <p className="m-0 text-[0.8125rem] font-bold tracking-normal text-[var(--color-text-muted)] uppercase">
                Preview
              </p>
              <div className="overflow-x-auto rounded-[var(--radius-md)] border border-[var(--color-border-muted)] bg-[var(--color-surface)]">
                <table className="w-full min-w-[520px] border-collapse">
                  <thead>
                    <tr>
                      {previewColumns.map((column) => (
                        <th
                          className="border-b border-[var(--color-border-muted)] px-[var(--space-3)] py-[var(--space-2)] text-left text-[0.8125rem] font-bold whitespace-nowrap text-[var(--color-text-muted)]"
                          key={column}
                        >
                          {column}
                        </th>
                      ))}
                      {targetColumn ? (
                        <th className="border-b border-[var(--color-border-muted)] px-[var(--space-3)] py-[var(--space-2)] text-left text-[0.8125rem] font-bold whitespace-nowrap text-[var(--color-text-muted)]">
                          {targetColumn.name}
                        </th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child_td]:border-b-0">
                    {previewRows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {previewColumns.map((column) => (
                          <td
                            className="border-b border-[var(--color-border-muted)] px-[var(--space-3)] py-[var(--space-2)] text-left text-[0.8125rem] whitespace-nowrap text-[var(--color-text)]"
                            key={column}
                          >
                            {formatValue(row[column])}
                          </td>
                        ))}
                        {targetColumn ? (
                          <td className="border-b border-[var(--color-border-muted)] px-[var(--space-3)] py-[var(--space-2)] text-left text-[0.8125rem] whitespace-nowrap text-[var(--color-text)]">
                            {formatValue(targetPreview[rowIndex])}
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  )
}
