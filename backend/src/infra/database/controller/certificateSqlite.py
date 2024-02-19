from sqlmodel import Session, select, delete
from typing import List, Union
from infra.database.controller.modelSqlite import ModelSqlite
from application.repository.certificateRepository import CertificateRepository
from infra.database.models import Certificate as CertificateTable, Engine
from entity.certificate import Certificate
from entity.model import Model

class CertificateSqlite(CertificateRepository):

  def __init__(self, database: Engine) -> None:
    self.engine = database.engine
  
  def create(self, c: Certificate) -> Certificate | Exception:
    with Session(self.engine) as session:
      try:
        certificate = CertificateTable(name=c.name, cpf=c.cpf, date=c.date, modelId=c.model.id)
        session.add(certificate)
        session.commit()
        return self.__convert__entity__(certificate)
      except Exception as e:
        return e

  def get_by_id(self, id: int) -> Certificate | Exception:
    with Session(self.engine) as session:
      try:
        statment = select(CertificateTable).where(CertificateTable.id == id)
        certificate = session.exec(statment).first()
        return self.__convert__entity__(certificate)
      except Exception as e:
        return e
      
  def list_all(self) -> List[Certificate] | Exception:
    with Session(self.engine) as session:
      try:
        statment = select(CertificateTable)
        certificates = session.exec(statment).all()
        return [self.__convert__entity__no_mode__(certificate) for certificate in certificates]
      except Exception as e:
        return e
      
  def __convert__entity__(self, c: CertificateTable) -> Certificate:
    model = ModelSqlite(self.engine).get_by_id(c.model.id)
    return Certificate(c.name, c.cpf, c.date, model, c.id)
  
  def __convert__entity__no_mode__(self, c: CertificateTable) -> Certificate:
    return Certificate(c.name, c.cpf, c.date, Model(c.model.name, None, None, None, c.model.id), c.id)