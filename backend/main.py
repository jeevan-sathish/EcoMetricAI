from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from database.db import engine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/data")
def get_data():

    with engine.connect() as connection:

        result = connection.execute(
            text("SELECT * FROM cars LIMIT 5")
        )

        rows = result.fetchall()

        data = [dict(row._mapping) for row in rows]

        return data