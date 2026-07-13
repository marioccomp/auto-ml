import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button, FormControl, TextInput } from '@primer/react'

import type { RegressionDatasetResponse, RegressionPrimitive } from '../types'
import './RegressionDatasetForm.css'

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
    <div className="regression-form">
      <form className="regression-form__fields" onSubmit={handleSubmit}>
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
          className="regression-form__submit"
          disabled={isSubmitting}
          type="submit"
          variant="primary"
        >
          {isSubmitting ? 'Enviando...' : 'Visualizar resultado'}
        </Button>
      </form>

      {errorMessage ? (
        <section
          className="regression-form__result regression-form__result--error"
          aria-live="polite"
          aria-label="Erro"
        >
          <p>{errorMessage}</p>
        </section>
      ) : null}

      {feedbackMessage ? (
        <section className="regression-form__result" aria-live="polite" aria-label="Resultado">
          <p>{feedbackMessage}</p>
        </section>
      ) : null}

      {result ? (
        <section className="regression-form__dataset" aria-live="polite" aria-label="Dataset">
          <div className="regression-form__dataset-header">
            <p>Dataset carregado</p>
            <strong>Preview recebido do backend</strong>
          </div>

          <dl className="regression-form__metadata">
            <div>
              <dt>Amostras</dt>
              <dd>{previewRows.length}</dd>
            </div>
            <div>
              <dt>Colunas</dt>
              <dd>{result.columns.length}</dd>
            </div>
            <div>
              <dt>Target</dt>
              <dd>{targetColumn?.name ?? '-'}</dd>
            </div>
          </dl>

          <div className="regression-form__columns">
            <p>Colunas detectadas</p>
            <ul>
              {result.columns.map((column, columnIndex) => (
                <li key={`${column.name}-${column.type}-${columnIndex}`}>
                  <span>{column.name}</span>
                  <small>
                    {columnIndex === result.columns.length - 1 ? 'target' : column.type}
                  </small>
                </li>
              ))}
            </ul>
          </div>

          {previewColumns.length > 0 ? (
            <div className="regression-form__preview">
              <p>Preview</p>
              <div className="regression-form__preview-scroll">
                <table>
                  <thead>
                    <tr>
                      {previewColumns.map((column) => (
                        <th key={column}>{column}</th>
                      ))}
                      {targetColumn ? <th>{targetColumn.name}</th> : null}
                    </tr>
                  </thead>
                  <tbody>
                    {previewRows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {previewColumns.map((column) => (
                          <td key={column}>{formatValue(row[column])}</td>
                        ))}
                        {targetColumn ? <td>{formatValue(targetPreview[rowIndex])}</td> : null}
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
