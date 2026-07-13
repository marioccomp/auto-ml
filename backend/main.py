from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from scripts.get_dataset import get_dataset_id_from_url, load_openml_dataset

app = FastAPI(title="API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class DatasetRequest(BaseModel):
    url: str


@app.get("/")
def home():
    return {"status": "success"}


@app.post("/get-url")
def get_database(request: DatasetRequest):
    dataset_id = get_dataset_id_from_url(request.url)

    if dataset_id is None:
        raise HTTPException(
            status_code=400,
            detail="URL invalida: informe uma URL do OpenML com parametro id.",
        )

    x, y = load_openml_dataset(dataset_id)
    columns = [{"name": column, "type": str(x[column].dtype)} for column in x.columns]
    columns.append({"name": y.name, "type": str(y.dtype)})
    return {
        "x-preview": x.head().to_dict(orient="records"),
        "y-preview": y.head().tolist(),
        "columns": columns,
    }
