from fastapi import APIRouter,Depends
from sqlalchemy import create_engine,text
from sqlalchemy.orm import Session
from utils.auth_middleware import get_current_user
from model.cars_model import CarModel
from database.db import get_db
import pandas as pd
import os 
import json
from dotenv import load_dotenv
from services.car_cronjob_service import load_latest_model_CJ

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


@router.get("/datasize")
def count_rows(db:Session=Depends(get_db)):
    count =db.query(CarModel).count()
    return {
        "car_data_size":count
    }
    

@router.get("/tables")
def get_tables():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
        """))

        tables = [row[0] for row in result]

        return {"tables": tables}



@router.get("/usersemail")
def get_tables():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT * FROM authusers
        """))

        rows = result.mappings().all()
        return rows




@router.post("/getCronresponse")
def run_cron(db: Session = Depends(get_db)):

    inserted = load_latest_model_CJ(db)


    return {
        "message": "cron executed",
        "insertedCount": inserted
    }



@router.get("/check-indexes")
def check_indexes():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT indexname, indexdef
            FROM pg_indexes
            WHERE tablename = 'cars'
        """))
        return {"indexes": [dict(row._mapping) for row in result]}


@router.post("/drop-redundant-indexes")
def drop_indexes():
    with engine.connect() as conn:
        conn.execute(text("DROP INDEX IF EXISTS ix_cars_brand"))
        conn.execute(text("DROP INDEX IF EXISTS ix_cars_model"))
        conn.execute(text("DROP INDEX IF EXISTS ix_cars_co2emission"))
        conn.commit()
    return {"message": "redundant indexes dropped"}