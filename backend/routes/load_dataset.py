from fastapi import APIRouter
from sqlalchemy import create_engine,text
import pandas as pd
import os 
from dotenv import load_dotenv

load_dotenv()
router =APIRouter(prefix="/dataset", tags=["Dataset"])

CONNECTION_STRING=os.getenv("RENDER_CONNECTION_STRING")
engine =create_engine(CONNECTION_STRING)

path="dataset/car_emission_canada7000.csv"

@router.post('/upload')
def upload_dataset():
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





@router.get("/check-users-table")
def check_users_table():
    with engine.connect() as conn:
        result = conn.execute(
            text("""
                SELECT EXISTS (
                    SELECT FROM information_schema.tables
                    WHERE table_schema = 'public'
                    AND table_name = 'authUsers'
                );
            """)
        )

        exists = result.scalar()

        return {
            "users_table_exists": exists
        }
    
@router.get("/tables")
def get_tables():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
        """))

        return [row[0] for row in result]






@router.get("/auth-columns")
def auth_columns():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = 'authUsers'
        """))

        return [row[0] for row in result]




@router.get("/renderusers")
def users():
    with engine.connect() as conn:
        result = conn.execute(
            text('SELECT * FROM "authUsers"')
        )

        return [dict(row._mapping) for row in result]