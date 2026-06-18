from jose import jwt
from datetime import datetime, timedelta,timezone
import os
from dotenv import load_dotenv

load_dotenv()

secret_key =os.getenv("SECRET_KEY")
algo="HS256"

def create_acces_token(data:dict):

    to_encode =data.copy()

    expire =datetime.now(timezone.utc) + timedelta(minutes=15)

    to_encode.update({
        "exp":expire
    })

    return jwt.encode(
        to_encode,
        secret_key, 
        algorithm=algo
    )


def create_refresh_token(data:dict):
    to_encode=data.copy()
    
    expire =(
        datetime.mow(timezone.utc)+timedelta(days=7)
    )

    to_encode.update({
        "exp":expire
    })

    return jwt.encode(
        to_encode,
        secret_key,
        algorithm=algo
    )