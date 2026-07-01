from pydantic import BaseModel

class CustomChatSchema(BaseModel):
    userInput : str