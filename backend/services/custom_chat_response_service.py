import os
from dotenv import load_dotenv
from groq import Groq
from sqlalchemy import text
from fastapi import HTTPException

from database.db import engine
from prompts.custom_chat_prompt import (
    custom_chat_Prompt,
    custom_chat_reply_prompt,
    custom_chat_smalltalk_prompt,
)
from utils.custom_chat_query_validator import validate_query

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def _ask_groq(prompt, max_tokens=200, temperature=0.5):
    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[{"role": "user", "content": prompt}],
        temperature=temperature,
        max_tokens=max_tokens,
    )
    return response.choices[0].message.content.strip()


def custom_chat_service(input):
    try:
        
        raw_query = _ask_groq(custom_chat_Prompt(input), max_tokens=200, temperature=0.3)

       
        if raw_query.strip().upper() == "INVALID_QUERY":
            reply = _ask_groq(
                custom_chat_smalltalk_prompt(input), max_tokens=150, temperature=0.7
            )
            return {"reply": reply, "rows": []}

        
        query = validate_query(raw_query)
        print(f"Executing query: {query}")

        with engine.connect() as connection:
            result = connection.execute(text(query))
            rows = [dict(row._mapping) for row in result]

        
        reply = _ask_groq(
            custom_chat_reply_prompt(input, rows), max_tokens=300, temperature=0.6
        )

        return {"reply": reply, "rows": rows}

    except ValueError as ve:
       
        reply = (
            "I can only help with questions about car data — things like brands, "
            "models, CO2 emissions, or fuel efficiency. Could you rephrase that?"
        )
        return {"reply": reply, "rows": []}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))