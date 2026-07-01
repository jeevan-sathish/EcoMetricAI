from fastapi import APIRouter,Depends
from utils.auth_middleware import get_current_user
from services.custom_chat_response_service import custom_chat_service
from schemas.custom_chat_schema import CustomChatSchema


router =APIRouter()

@router.post("/customChatResponse")
def custom_chat_response(input :CustomChatSchema,user  = Depends(get_current_user)):
    result =custom_chat_service(input.userInput)

    return {"result":result}