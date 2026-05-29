from fastapi import APIRouter
from schemas.car_schema import UserInput
from services.car_service import filter_car_data

router = APIRouter()

@router.post("/filterData")
def filter_data(inp: UserInput):

    return filter_car_data(
        inp.brand,
        inp.model
    )