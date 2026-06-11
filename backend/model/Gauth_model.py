from database.db import Base
from sqlalchemy import Column, Integer, String

class UserAuth(Base):
    __tablename__ = "authUsers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    picture = Column(String, nullable=False)