from jose import jwt, JWTError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
import os

load_dotenv()

secret_key = os.getenv("SECRET_KEY")
algo ="HS256"

oauth2_schem =OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)

def get_current_user(token:str = Depends(oauth2_schem)):
    try:
        payload =jwt.decode(
            token,
            secret_key,
            algorithms=[algo]
        )

        email =payload.get("sub")
        user_id =payload.get("user_id")

        if email is None:
            raise HTTPException(
                status_code=401,
                detail="invalid token"
            )
        
        return {
            "email":email,
            "user_id":user_id
        }
    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="invalid token"
        )

    
