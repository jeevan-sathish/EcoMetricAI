from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("NEON_CONNECTION_STRING")

engine = create_engine(DATABASE_URL)