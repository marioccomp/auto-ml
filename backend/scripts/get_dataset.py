from urllib.parse import parse_qs, urlparse

import openml
from pandas import DataFrame

openml.config.set_root_cache_directory("./.openml-cache")


def get_dataset_id_from_url(url: str) -> int | None:

    parsed = urlparse(url)
    query = parse_qs(parsed.query)

    if "id" in query:
        return int(query["id"].pop())
    else:
        return None


def load_openml_dataset(datased_id: int) -> DataFrame:
    dataset = openml.datasets.get_dataset(datased_id)
    x, y, categorical_indicator, attribute_names = dataset.get_data(
        dataset_format="dataframe"
    )
    y = x[
        "class"
    ]  # OpenML aparentemente retorna o dataset inteiro, entao o y tem q pegar a coluna alvo
    x = x.drop(columns=["class"])
    print(x.tail())
    print(y.tail())


id = get_dataset_id_from_url(
    "https://www.openml.org/search?type=data&sort=runs&status=active&id=31"  # teste hardcoded, esse script receberia a URL via API
)

load_openml_dataset(id)
