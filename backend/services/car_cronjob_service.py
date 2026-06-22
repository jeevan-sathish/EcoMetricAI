from groq import Groq
from dotenv import load_dotenv
import os
from sqlalchemy.orm import Session
from model.cars_model import CarModel
from prompts.cronJob_car_prompt import get_cronjob_prompt
import json


def load_latest_model_CJ(db:Session):

    client =Groq(api_key=os.getenv("GROQ_API_KEY"))
    response =client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{
            "role":"user",
            "content":get_cronjob_prompt()
        }]
    )
    result =json.loads(response.choices[0].message.content)
    
    for row in result:
        db.add(CarModel(**row))

    db.commit()
    print("inserted data:",len(result))
    return {
        "inserted":len(result)
    }




