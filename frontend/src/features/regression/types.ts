export type RegressionPrimitive = string | number | boolean | null

export type RegressionPreviewRow = Record<string, RegressionPrimitive>

export type RegressionDatasetColumn = {
  name: string
  type: string
}

export type RegressionDatasetResponse = {
  'x-preview': RegressionPreviewRow[]
  'y-preview': RegressionPrimitive[]
  columns: RegressionDatasetColumn[]
}
