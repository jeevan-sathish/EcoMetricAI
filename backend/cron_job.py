from services.car_cronjob_service import load_latest_model_CJ
from database.db import SessionLocal

if __name__ == "__main__":
    db=SessionLocal()
    try:
        load_latest_model_CJ(db)
    finally:
        db.close()

    