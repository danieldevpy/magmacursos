from typing import List, Optional
from sqlmodel import Field, SQLModel, create_engine, Relationship
from sqlalchemy import MetaData
from datetime import datetime
import os


class Model(SQLModel, table=True):
  id: Optional[int] = Field(default=None, primary_key=True)
  name: str
  front: bytes
  back: bytes
  texts: Optional[str] = Field(default=None)
  certificates: Optional['Certificate'] = Relationship(back_populates='model')

class Certificate(SQLModel, table=True):
  id: Optional[int] = Field(default=None, primary_key=True)
  name: str
  cpf: str
  date: str
  dateCreate: Optional[datetime] = Field(default=datetime.now())
  modelId: int = Field(default=None, foreign_key="model.id")
  model: Model = Relationship(back_populates='certificates')

class Engine:
  _instance = None

  def __new__(cls, *args, **kwargs):
    if not cls._instance:
      cls._instance = super(Engine, cls).__new__(cls)
    return cls._instance

  def __init__(self, name='magma'):
    if not hasattr(self, 'initialized'):
      self.name = name
      self.engine = create_engine(f"sqlite:///{self.name}.db")
      SQLModel.metadata.create_all(self.engine)

  def delete(self):
    os.remove(f"{self.name}.db")
  
