

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.db import engine, Base 

from database.db import engine
from routes.car_routes import router as car_router
from routes.vehicle_brand_models_routes import router as vehicle_router
from routes.auth_handle import router as auth_handle
from routes.user_profile_route import router as profile_router
from routes.aiResponse_route import router as airesponse_router
from routes.all_profiles_route import router as allprofileroute



app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://eco-metric-ai.vercel.app",
]


Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




print("feature branch")
app.include_router(vehicle_router)
app.include_router(auth_handle)
app.include_router(profile_router)
app.include_router(allprofileroute)
app.include_router(car_router)
print("router hitting")
app.include_router(airesponse_router)