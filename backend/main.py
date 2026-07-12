from fastapi import FastAPI


app = FastAPI(title="API")


@app.get("/")
def home():
  return {"status": "success"}
