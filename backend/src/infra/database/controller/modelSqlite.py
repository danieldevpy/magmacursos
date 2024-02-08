from sqlmodel import Session, select, delete
from typing import Union
from application.repository.modelRepository import ModelRepository
from infra.database.models import Model as ModelTable, Engine
from entity.model import Model

class ModelSqlite(ModelRepository):

  def __init__(self, database: Engine) -> None:
    self.engine = database.engine

  def create(self, m: Model) -> Model | Exception:
    with Session(self.engine) as session:
      try:
        model = ModelTable(name=m.name, front=m.front, back=m.back)
        session.add(model)
        session.commit()
        return Model(model.name, model.front, model.back, model.id)
      except Exception as e:
        return e
      
  def get_by_id(self, id) -> Model:
    with Session(self.engine) as session:
      try:
        statment = select(ModelTable).where(ModelTable.id == id)
        model = session.exec(statment).first()      
        if not model:
          return None
        return Model(model.name, model.front, model.back, model.texts, model.id)
      except Exception as e:
        return e
      
