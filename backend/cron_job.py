from database.db import SessionLocal
from services.car_cronjob_service import load_latest_model_CJ

def run_cron():
    db = SessionLocal()
    try:
        result = load_latest_model_CJ(db)
        print("CRON COMPLETED:", result)
    except Exception as e:
        print("CRON ERROR:", e)
    finally:
        db.close()

run_cron()