import os 
from dotenv import load_dotenv
import pandas as pd
from sqlalchemy import create_engine

load_dotenv()
DATABASE_STRING =os.getenv("NEON_CONNECTION_STRING")
path="./dataset/car_emission_canada7000.csv"

engine=create_engine(DATABASE_STRING)
df=pd.read_csv(path)

print(df.head())

df.to_sql("cars",con=engine,if_exists="replace",index=False)

print("Data inserted successfully")