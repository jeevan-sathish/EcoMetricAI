from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from google.oauth2 import id_token
from google.auth.transport import requests

from dotenv import load_dotenv
import os

from database.db import get_db
from schemas.auth_token_schema import AuthToken
from model.Gauth_model import UserAuth
from utils.jwt_handler import create_acces_token

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

        return {
            "access_token": access_token,
            "name": user.name,
            "email": user.email,
            "picture": user.picture
        }

    except Exception as e:

        print("Login Error:", e)

        return {
            "message": "Login failed"
        }