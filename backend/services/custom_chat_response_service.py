import os
from dotenv import load_dotenv
from groq import Groq
from sqlalchemy import text
from fastapi import HTTPException

from database.db import engine
from prompts.custom_chat_prompt import custom_chat_Prompt
from utils.custom_chat_query_validator import validate_query

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def custom_chat_service(input):

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": custom_chat_Prompt(input),
            }
        ],
        temperature=0.5,
        max_tokens=200,
    )

    query = response.choices[0].message.content.strip()

    try:
        query = validate_query(query)
        print(f"Executing query: {query}")

        with engine.connect() as connection:
            result = connection.execute(text(query))
            rows = [dict(row._mapping) for row in result]

        return rows

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )