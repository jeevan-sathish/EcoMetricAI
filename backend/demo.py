import os 
from dotenv import load_dotenv
import pandas as pd
from sqlalchemy import create_engine

load_dotenv()
DATABASE_STRING =os.getenv("RENDER_CONNECTION_STRING_TWO")
path="./dataset/car_emission_canada7000.csv"

engine=create_engine(DATABASE_STRING,connect_args={"sslmode": "require"})
df=pd.read_csv(path)



df.to_sql("cars",con=engine,if_exists="replace",index=False)

print("Data inserted successfully")