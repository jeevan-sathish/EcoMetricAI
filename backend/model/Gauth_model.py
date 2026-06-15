from database.db import Base
from sqlalchemy import Column, Integer, String,DateTime
from datetime import datetime

class UserAuth(Base):
    __tablename__ = "authUsers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    picture = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)