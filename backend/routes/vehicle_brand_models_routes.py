from fastapi import APIRouter
from sqlalchemy import text

from database.db import engine
from schemas.vehicle_models_schema import ListOfModels

router = APIRouter()


@router.post("/brands")
def get_brands_list():
    with engine.connect() as connection:
        query = text("""
            select distinct brand
            from cars
            ORDER BY brand ASC
            LIMIT 30
        """)

        result = connection.execute(query)

        brands = [row[0] for row in result.fetchall()]

        return {"brands": brands}


@router.post("/models")
def get_models_list(data: ListOfModels):
    with engine.connect() as connection:
        query = text("""
            SELECT DISTINCT model
            FROM cars
            WHERE brand = :brand
            ORDER BY model ASC
        """)

        result = connection.execute(
            query,
            {"brand": data.brand}
        )

        models = [row[0] for row in result.fetchall()]

        return {"models": models}