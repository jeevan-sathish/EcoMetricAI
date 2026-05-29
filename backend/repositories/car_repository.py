from sqlalchemy import text
from database.db import engine


def get_selected_car(brand, model):

    with engine.connect() as connection:

        query = text("""
            SELECT *
            FROM cars
            WHERE brand = :brand
            AND model = :model
        """)

        result = connection.execute(query, {
            "brand": brand,
            "model": model
        })

        return [dict(row._mapping) for row in result.fetchall()]


def get_lowest_emission_cars(brand):

    with engine.connect() as connection:

        query = text("""
            SELECT model, co2emission
            FROM (
                SELECT
                    model,
                    co2emission,
                    ROW_NUMBER() OVER (
                        PARTITION BY model
                        ORDER BY co2emission ASC
                    ) as rn
                FROM cars
                WHERE brand = :brand
            ) ranked
            WHERE rn <= 2
            ORDER BY model ASC, co2emission ASC
            LIMIT 6
        """)

        result = connection.execute(query, {
            "brand": brand
        })

        return [dict(row._mapping) for row in result.fetchall()]


def get_best_car(brand):

    with engine.connect() as connection:

        query = text("""
            SELECT *
            FROM cars
            WHERE brand = :brand
            AND co2emission = (
                SELECT MIN(co2emission)
                FROM cars
                WHERE brand = :brand
            )
        """)

        result = connection.execute(query, {
            "brand": brand
        })

        return [dict(row._mapping) for row in result.fetchall()]