import { ThemeToggle } from '../../../components/theme/ThemeToggle'
import { RegressionDatasetForm } from '../../../features/regression/components/RegressionDatasetForm'
import './RegressionPage.css'

export function RegressionPage() {
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
        </div>

        <RegressionDatasetForm />
      </section>
    </main>
  )
}
