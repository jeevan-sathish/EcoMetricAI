from sqlalchemy import Column, String, Float, BigInteger,Index
from database.db import Base

class CarModel(Base):
    __tablename__ = "cars"

    id = Column(BigInteger, primary_key=True)

    brand = Column(String,index=True)
    model = Column(String,index=True)
    vehicleclass = Column(String)

    enginesize = Column(Float)
    cylinders = Column(BigInteger)

    transmission = Column(String)
    fueltype = Column(String)

    cityconsumption = Column(Float)
    hwyconsumption = Column(Float)
    combconsumption = Column(Float)

    combmpg = Column(BigInteger)
    co2emission = Column(BigInteger,index=True)


    __table_args__ = (
        Index("ix_cars_brand_model", "brand", "model"),
        Index("ix_cars_brand_co2", "brand", "co2emission"),
    )