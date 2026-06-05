from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from backend import ask_database

app = FastAPI()

# Allow React frontend to access FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    question: str

@app.post("/query")
def query_database(request: QueryRequest):

    result = ask_database(request.question)

    return {
        "rows": result.to_dict(orient="records")
    }

@app.get("/")
def root():
    return {
        "message": "NL Query Agent API Running"
    }