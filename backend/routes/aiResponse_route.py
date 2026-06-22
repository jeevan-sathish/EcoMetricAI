from fastapi import APIRouter,Depends
from utils.auth_middleware import get_current_user
from schemas.car_schema import UserInput
from repositories.car_repository import get_AI_suggestions
from utils.auth_middleware import get_current_user

router=APIRouter()

@router.post('/aisuggestion')
def get_aisuggestion(inp:UserInput,user=Depends(get_current_user)):
    print("suggeston route hit")
    model =inp.model
    brand=inp.brand
    response =get_AI_suggestions(brand,model)
    print("response hit")

    return {
        "suggestion":response
    }