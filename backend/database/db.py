from sqlalchemy import create_engine
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
import os

load_dotenv()

DATABASE_URL = os.getenv("RENDER_CONNECTION_STRING")


engine = create_engine(DATABASE_URL,pool_pre_ping=True,pool_recycle=300)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db =SessionLocal()
    try:
        yield db    
    finally:
        db.close()