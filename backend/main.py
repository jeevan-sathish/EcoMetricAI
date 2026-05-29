from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from routes.car_routes import router as car_router

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class User(BaseModel):
    name: str



@app.post("/greet")
def greet_user(user: User):

    return {
        "message": f"Welcome {user.name} to EcoMetric-AI"
    }



app.include_router(car_router)