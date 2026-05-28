from fastapi import APIRouter
from database.db import engine
from sqlalchemy import text
from pydantic import BaseModel

class UserInput(BaseModel):
    brand: str
    model: str

router = APIRouter()

@router.post("/filterData")
def filter_data(inp: UserInput):

    with engine.connect() as connection:

        query1 = text("""
            SELECT *
            FROM cars
            WHERE brand = :brand
            AND model = :model
        """)

        result1 = connection.execute(query1, {
            "brand": inp.brand,
            "model": inp.model
        })

        query2 = text("""
            SELECT model, co2emission
            FROM cars
            WHERE brand = :brand
            ORDER BY co2emission ASC limit 10
        """)

        result2 = connection.execute(query2, {
            "brand": inp.brand
        })

        query3 = text("""
            SELECT *
            FROM cars
            WHERE brand = :brand
                 AND co2emission = (
                       SELECT MIN(co2emission)
                      FROM cars
            WHERE brand = :brand
     )
        """)

        result3 = connection.execute(query3, {
            "brand": inp.brand
        })

        rows1 = result1.fetchall()
        rows2 = result2.fetchall()
        rows3 = result3.fetchall()

        data1 = [dict(row._mapping) for row in rows1]
        data2 = [dict(row._mapping) for row in rows2]
        data3 = [dict(row._mapping) for row in rows3]
        print(data3)

        return {
            "data1": data1,
            "data2": data2,
            "data3": data3
        }