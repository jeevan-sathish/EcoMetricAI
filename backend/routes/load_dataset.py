from fastapi import APIRouter,Depends
from sqlalchemy import create_engine,text
from utils.auth_middleware import get_current_user
import pandas as pd
import os 
from dotenv import load_dotenv

load_dotenv()
router =APIRouter(prefix="/dataset", tags=["Dataset"])

CONNECTION_STRING=os.getenv("RENDER_CONNECTION_STRING")
engine =create_engine(CONNECTION_STRING)

path="dataset/car_emission_canada7000.csv"

@router.post('/upload')
def upload_dataset(user=Depends(get_current_user)):
    df =pd.read_csv(path)

    df.to_sql("cars",engine,if_exists="replace",index=False)
    print(CONNECTION_STRING)

    return {
        "message":"dataset uploaded succesfully"
    }


@router.get("/count")
def count_rows():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT COUNT(*) FROM cars"))
        return {"rows": result.scalar()}








@router.get("/usersemail")
def get_tables():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT * FROM authusers
        """))

        rows = result.mappings().all()
        return rows










