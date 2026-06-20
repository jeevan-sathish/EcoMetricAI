from fastapi import APIRouter,Depends
from utils.auth_middleware import get_current_user
from schemas.car_schema import UserInput
from repositories.car_repository import get_AI_suggestions

router=APIRouter()

@router.post('/aisuggestion')
def get_aisuggestion(inp:UserInput,user=Depends(get_current_user)):
    model =inp.model
    brand=inp.brand

    return get_AI_suggestions(model,brand)