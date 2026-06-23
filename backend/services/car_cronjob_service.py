from groq import Groq
from dotenv import load_dotenv
import os
from sqlalchemy.orm import Session
from model.cars_model import CarModel
from prompts.cronJob_car_prompt import get_cronjob_prompt
import json

load_dotenv()

def load_latest_model_CJ(db: Session):

    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{
            "role": "user",
            "content": get_cronjob_prompt()
        }]
    )

    result = json.loads(response.choices[0].message.content)

    inserted_count = 0

    for row in result:
        exists = db.query(CarModel).filter_by(
            brand=row["brand"],
            model=row["model"],
            vehicleclass=row["vehicleclass"],
            enginesize=row["enginesize"],
            cylinders=row["cylinders"],
            transmission=row["transmission"],
            fueltype=row["fueltype"],
            co2emission=row["co2emission"],
        ).first()

        if not exists:
            db.add(CarModel(**row))
            inserted_count += 1

    db.commit()

    print("Inserted:", inserted_count)

    return inserted_count