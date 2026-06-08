from pydantic import BaseModel

class UserInput(BaseModel):
    brand: str
    model: str