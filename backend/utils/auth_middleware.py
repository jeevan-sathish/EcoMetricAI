from jose import jwt, JWTError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import os

from database.db import get_db
from model.Gauth_model import UserAuth

load_dotenv()

secret_key = os.getenv("SECRET_KEY")
algo ="HS256"

oauth2_schem =OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)

def get_current_user(token:str = Depends(oauth2_schem),db:Session =Depends(get_db)):
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
        user =(
            db.query(UserAuth).filter(UserAuth.id == user_id).first()
        )

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )
        
        return user
    
    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="invalid token"
        )

    
