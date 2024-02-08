from application.repository.modelRepository import ModelRepository, Model

class ModelCase:

  @classmethod
  def create(cls, repository: ModelRepository, model: Model):
    if not isinstance(model.front, bytes) or not isinstance(model.back, bytes):
      raise Exception("O objeto front ou back deve ser passado como bytes")

    return repository.create(model)

  @classmethod
  def get_by_id(cls, repository: ModelRepository, id: int) -> Model | Exception:
    return repository.get_by_id(id)