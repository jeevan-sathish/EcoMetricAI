from fastapi import APIRouter
from database.db import engine
from sqlalchemy import text
from pydantic import BaseModel
from fastapi import HTTPException

class UserInput(BaseModel):
    brand:str
    model:str
    fueltype:str


router = APIRouter()

@router.post("/filterData")
def filter_data(inp: UserInput):
    with engine.connect() as connection:
        query = text("""
            SELECT * FROM cars 
WHERE brand = :brand 
AND model = :model 
AND fueltype = :fueltype
        """)

        result = connection.execute(query, {
            "brand": inp.brand,
            "model": inp.model,
            "fueltype": inp.fueltype
        })

        rows = result.fetchall()
        data =[dict(row._mapping) for row in rows]
        print(data[0]["brand"])

        return data
        