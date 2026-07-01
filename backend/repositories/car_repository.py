from sqlalchemy import text
from database.db import engine
from prompts.Vehicle_analysis_prompt import get_vehicle_analysis_prompt
from groq import Groq
from dotenv import load_dotenv
from groq import RateLimitError
import os

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


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


def get_all_car_data(brand, model):
    try:
        with engine.connect() as connection:

           
            q1 = text("""
                SELECT *
                FROM cars
                WHERE brand = :brand
                AND model = :model
            """)
            data1 = [dict(row._mapping) for row in
                     connection.execute(q1, {"brand": brand, "model": model}).fetchall()]

            
            q2 = text("""
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
                WHERE rn <= 1
                ORDER BY model ASC, co2emission ASC
            """)
            data2 = [dict(row._mapping) for row in
                     connection.execute(q2, {"brand": brand}).fetchall()]

            
            q3 = text("""
                SELECT *
                FROM cars
                WHERE brand = :brand
                AND co2emission = (
                    SELECT MIN(co2emission)
                    FROM cars
                    WHERE brand = :brand
                )
            """)
            data3 = [dict(row._mapping) for row in
                     connection.execute(q3, {"brand": brand}).fetchall()]

            return data1, data2, data3

    except Exception as e:
        print("DB Error:", str(e))
        return [], [], []


def get_AI_suggestions(brand, model):
    if not brand or not model:
        return "Input is missing"

    try:
        with engine.connect() as connection:
            print("ai suggestion cooking...")
            data = connection.execute(
                text("""
                    SELECT
                        brand,
                        model,
                        fueltype,
                        co2emission,
                        combmpg,
                        vehicleclass
                    FROM cars
                    ORDER BY co2emission ASC
                    LIMIT 5
                """)
            ).fetchall()

            result = [dict(row._mapping) for row in data]

            user_preferred_brand = get_selected_car(brand, model)

            prompt = get_vehicle_analysis_prompt(result, user_preferred_brand)

            response = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.5,
                max_tokens=600
            )

            return response.choices[0].message.content

    except RateLimitError:
        return "AI suggestions temporarily unavailable. Groq quota exceeded."

    except Exception as e:
        print("AI ERROR:", str(e))
        return "Unable to generate AI suggestions."