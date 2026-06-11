from pydantic import BaseModel, EmailStr

class UserAuth(BaseModel):
    name: str
    email: EmailStr
    picture: str
    