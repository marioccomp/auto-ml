import pandas as pd
from pandas import DataFrame
from pandas.api.types import is_numeric_dtype
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split


def train_regression(df: DataFrame):
    x, y = df
    colunas_nao_numericas = [
        column for column in x.columns if not is_numeric_dtype(x[column].dtype)
    ]
    colunas_numericas = [
        column for column in x.columns if is_numeric_dtype(x[column].dtype)
    ]
    b = is_numeric_dtype(y.dtype)

    if not b:
        print("A coluna alvo precisa ser numérica em uma regressão")
        return

    x_cp = x.copy()

    x_cp[colunas_nao_numericas] = (
        x_cp[colunas_nao_numericas].astype("object").fillna("__missing__")
    )

    print(x.isna().sum().sum())
    print(y.isna().sum())

    imputer = SimpleImputer(strategy="median")
    mascara = y.notna()
    x_cp = x_cp[mascara]
    y = y[mascara]

    x_treino, x_teste, y_treino, y_teste = train_test_split(
        x_cp, y, test_size=0.2, random_state=42
    )

    if colunas_nao_numericas:
        x_treino = pd.get_dummies(x_treino, columns=colunas_nao_numericas)
        x_teste = pd.get_dummies(x_teste, columns=colunas_nao_numericas)
    if colunas_numericas:
        x_treino[colunas_numericas] = imputer.fit_transform(x_treino[colunas_numericas])
        x_teste[colunas_numericas] = imputer.transform(x_teste[colunas_numericas])

    x_teste = x_teste.reindex(columns=x_treino.columns, fill_value=0)

    # colunas_existentes_em_treino = [
    #     column in x_treino.columns for column in x_teste.columns
    # ]

    # colunas_existentes_em_teste = [
    #     column in x_teste.columns for column in x_treino.columns
    # ]

    # x_teste = x_teste[colunas_existentes_em_treino]
    # x_treino = x_treino[colunas_existentes_em_teste]

    model = LinearRegression()
    model.fit(x_treino, y_treino)

    previsoes = model.predict(x_teste)

    for real, previsto in zip(y_teste.head(10), previsoes[:10]):
        print(real, previsto)

    mae = mean_absolute_error(y_teste, previsoes)
    print(mae)
