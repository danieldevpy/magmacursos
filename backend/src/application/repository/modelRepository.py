from abc import ABC, abstractmethod
from entity.model import Model


class ModelRepository(ABC):

  @abstractmethod
  def create(self, m: Model) -> Model | Exception:
    raise NotImplemented
  
  @abstractmethod
  def get_by_id(self, id: int) -> Model | Exception:
    raise NotImplemented