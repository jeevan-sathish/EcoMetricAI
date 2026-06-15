from fastapi import APIRouter,Depends
from schemas.car_schema import UserInput
from services.car_service import filter_car_data
from utils.auth_middleware import get_current_user

router = APIRouter()

@router.post("/filterData")
def filter_data(inp: UserInput,user=Depends(get_current_user)):
    print(user)

    return filter_car_data(
        inp.brand,
        inp.model
    )