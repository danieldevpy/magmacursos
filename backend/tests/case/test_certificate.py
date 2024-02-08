import pytest
from src.infra.database.controller.certificateSqlite import CertificateSqlite, Engine, Certificate
from src.application.usecase.certificateCase import CertificateCase
from src.infra.database.controller.modelSqlite import ModelSqlite, Model
from src.application.usecase.modelCase import ModelCase


def test_create_correct():
  engine = Engine('zedamanga')
  try:
    repository_model = ModelSqlite(engine)
    mok_img = "test".encode("utf-8")
    new_model = Model("Daniel", mok_img, mok_img)
    model = ModelCase.create(repository_model, new_model)
    assert model.id == 1
    repository_certificate = CertificateSqlite(engine)
    new_certificate = Certificate('Daniel Fernandes Pereira', '18714933748', '12/03/1999', model)
    certificate = CertificateCase.create(repository_certificate, new_certificate)
    assert certificate.id == 1
    assert certificate.name == 'Daniel Fernandes Pereira'
    assert certificate.cpf == '18714933748'
    assert certificate.date == '12/03/1999'
    assert certificate.model.id == model.id
  finally:
    engine.delete()
