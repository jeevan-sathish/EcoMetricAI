from sqlalchemy import text
from database.db import engine
from prompts.Vehicle_analysis_prompt import get_vehicle_analysis_prompt 
from groq import Groq
from dotenv import load_dotenv
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
            WHERE rn <= 1
            ORDER BY model ASC, co2emission ASC
            
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
    

def get_AI_suggestions(brand, model):

    if not brand or not model:
        return "input is missing"

    with engine.connect() as connection:
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
                LIMIT 20
            """)
        ).fetchall()

        result = [
            dict(row._mapping)
            for row in data
        ]

        user_preferred_brand = get_selected_car(
            brand,
            model
        )
        prompt = get_vehicle_analysis_prompt(
            result,
            user_preferred_brand
        )
        response = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }

            ],

            temperature=0.5,
            max_tokens=700
        )

        return response.choices[0].message.content

    
        

       