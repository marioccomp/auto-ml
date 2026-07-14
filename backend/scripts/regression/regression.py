from pandas import DataFrame
from pandas.api.types import is_numeric_dtype
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split


def train_regression(df: DataFrame):
    x, y = df
    a = [is_numeric_dtype(x[column].dtype) for column in x.columns]
    b = is_numeric_dtype(y.dtype)
    colunas_nao_numericas = [
        column for column in x.columns if not is_numeric_dtype(x[column])
    ]
    print(colunas_nao_numericas)
    if False in a or not b:
        print("tem alguma coisa q nao eh numerica")
        return

    print(x.isna().sum().sum())
    print(y.isna().sum())

    imputer = SimpleImputer(strategy="median")
    mascara = y.notna()
    x = x[mascara]
    y = y[mascara]
    x_tratado = imputer.fit_transform(x)

    x_treino, x_teste, y_treino, y_teste = train_test_split(
        x_tratado, y, test_size=0.2, random_state=42
    )
    model = LinearRegression()
    model.fit(x_treino, y_treino)

    previsoes = model.predict(x_teste)

    for real, previsto in zip(y_teste.head(10), previsoes[:10]):
        print(real, previsto)

    mae = mean_absolute_error(y_teste, previsoes)
    print(mae)
