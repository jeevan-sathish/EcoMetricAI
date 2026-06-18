from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.db import get_db
from model.Gauth_model import UserAuth

router = APIRouter(
    prefix="/profile",
    tags=["profile"]
)

@router.get("/allprofiles")
def get_all_profiles(
    db: Session = Depends(get_db)
):

    users = db.query(UserAuth).all()

    return [
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "picture": user.picture,
            "created_at": user.created_at
        }
        for user in users
    ]