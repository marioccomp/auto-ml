import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button, FormControl, TextInput } from '@primer/react'

import './RegressionDatasetForm.css'

type RegressionResult = {
  message: string
}

const mockResult: RegressionResult = {
  message: 'Dataset recebido. A pre-visualizacao da regressao linear sera exibida aqui.',
}

export function RegressionDatasetForm() {
  const [datasetUrl, setDatasetUrl] = useState('')
  const [data, setData] = useState<RegressionResult | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
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
            placeholder="https://exemplo.com/dataset.csv"
            size="large"
            type="url"
            value={datasetUrl}
          />
          <FormControl.Caption>
            Por enquanto, use datasets com valores numericos.
          </FormControl.Caption>
        </FormControl>

        <Button block className="regression-form__submit" type="submit" variant="primary">
          Visualizar resultado
        </Button>
      </form>

      {data ? (
        <section className="regression-form__result" aria-live="polite" aria-label="Resultado">
          <p>{data.message}</p>
        </section>
      ) : null}
    </div>
  )
}
