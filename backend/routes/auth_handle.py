from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from google.oauth2 import id_token
from google.auth.transport import requests
from schemas.refresh_token_schema import RefreshTokenSchema
from dotenv import load_dotenv
import os

from database.db import get_db
from schemas.auth_token_schema import AuthToken
from model.Gauth_model import UserAuth
from utils.jwt_handler import create_acces_token , create_refresh_token

load_dotenv()

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

client_id = os.getenv("GOOGLE_OAUTH_ID")


@router.post("/login")
async def login(
    payload: AuthToken,
    db: Session = Depends(get_db)
):

    if not payload.token:
        return {"message": "Login failed"}

    try:

        user_info = id_token.verify_oauth2_token(
            payload.token,
            requests.Request(),
            client_id
        )

        email = user_info.get("email")
        name = user_info.get("name")
        picture = user_info.get("picture")

        user = (
            db.query(UserAuth)
            .filter(UserAuth.email == email)
            .first()
        )

        if not user:

            user = UserAuth(
                name=name,
                email=email,
                picture=picture
            )

            db.add(user)
            db.commit()
            db.refresh(user)

        access_token = create_acces_token(
            {
                "sub": user.email,
                "user_id": user.id
            }
        )

        refresh_token =create_refresh_token(
            {
                "sub":user.email,
                "user_id":user.id
            }
        )

        return {
            "access_token": access_token,
            "refresh_token":refresh_token,
            "name": name,
            "email": email,
            "picture": picture
        }

    except Exception as e:

        print("Login Error:", e)

        return {
            "message": "Login failed"
        }

@router.post("/refresh")
def refresh_token(payload:RefreshTokenSchema):
    secret =os.getenv("SECRET_KEY")
    try:
        decode =jwt.decode(
            payload.refresh_token,
            secret,
            algorithms=["HS256"]

        )
        email =decode.get("sub")
        user_id=decode.get("user_id")

        new_access_token =create_acces_token(
            {
                "sub":email,
                "user_id":user_id
            }
        )

        return {
            "access_token":new_access_token
        }
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid refresh token"
        )