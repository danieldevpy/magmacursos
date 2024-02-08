
import pytest
from src.infra.database.controller.modelSqlite import ModelSqlite, Engine, Model
from src.application.usecase.modelCase import ModelCase


def test_create_correct():
  engine = Engine('zedamanga')
  try:
    repository = ModelSqlite(engine)
    mok_img = "test".encode("utf-8")
    new_model = Model("Daniel", mok_img, mok_img)
    model = ModelCase.create(repository, new_model)
    assert model.id == 1
    assert model.name == 'Daniel'
    assert type(model.front) == bytes
    assert type(model.back) == bytes
  finally:
    engine.delete()

def test_create_incorrect_string_instead_of_bytes():
  engine = Engine('zedamanga')
  try:
    repository = ModelSqlite(engine)
    with pytest.raises(Exception):
      new_model = Model("Daniel", 'mok_img', 'mok_img')
      ModelCase.create(repository, new_model)
  finally:
    engine.delete()