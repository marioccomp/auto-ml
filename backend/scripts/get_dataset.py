from urllib.parse import parse_qs, urlparse

import openml
from pandas import DataFrame

from scripts.regression import train_regression

openml.config.set_root_cache_directory("./.openml-cache")


def get_dataset_id_from_url(url: str) -> int | None:
    parsed = urlparse(url)
    query = parse_qs(parsed.query)

    if "id" in query:
        return int(query["id"].pop())

    return None


def load_openml_dataset(
    dataset_id: int,
) -> DataFrame:
    dataset = openml.datasets.get_dataset(dataset_id)
    x, y, categorical_indicator, attribute_names = dataset.get_data(
        dataset_format="dataframe",
        target=dataset.default_target_attribute,
    )

    return x, y


if __name__ == "__main__":
    dataset_id = get_dataset_id_from_url(
        "https://www.openml.org/search?type=data&status=active&id=189"
    )

    if dataset_id is not None:
        loaded_dataset = load_openml_dataset(dataset_id)
        print(loaded_dataset)

        train_regression(loaded_dataset)
