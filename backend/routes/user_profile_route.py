from fastapi import APIRouter,Depends

from utils.auth_middleware import get_current_user

router = APIRouter(
    prefix="/profile",  
    tags=["profile"]
)   

@router.get("/profileData")
def get_profile_data(user=Depends(get_current_user)):
    return {
        "name": user.name,
        "email": user.email,
        "picture": user.picture
    }