from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from database.db import engine
from routes.allData import router as all_data_router
from routes.fetchUserBased import router as fetch_user_based_data
from pydantic import BaseModel

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    name: str

@app.post("/greet")
def greet_user(user: User):
    msg = f"Welcome {user.name} to EcoMetric-AI"
    return {
        "message": msg
    }

app.include_router(all_data_router)

app.include_router(fetch_user_based_data)

