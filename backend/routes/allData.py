from fastapi import APIRouter
from database.db import engine
from sqlalchemy import text

router =APIRouter()

@router.get('/data')
def get_data():
    with engine.connect() as connection:

        result = connection.execute(
            text("SELECT * FROM cars LIMIT 5")
        )

        rows = result.fetchall()

        data = [dict(row._mapping) for row in rows]

        return data