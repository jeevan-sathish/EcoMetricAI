from sqlalchemy import Column, String, Float, BigInteger
from database.db import Base

class CarModel(Base):
    __tablename__ = "cars"

    id = Column(BigInteger, primary_key=True)

    brand = Column(String)
    model = Column(String)
    vehicleclass = Column(String)

    enginesize = Column(Float)
    cylinders = Column(BigInteger)

    transmission = Column(String)
    fueltype = Column(String)

    cityconsumption = Column(Float)
    hwyconsumption = Column(Float)
    combconsumption = Column(Float)

    combmpg = Column(BigInteger)
    co2emission = Column(BigInteger)