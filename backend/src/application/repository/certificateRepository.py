from abc import ABC, abstractmethod
from entity.certificate import Certificate


class CertificateRepository(ABC):

  @abstractmethod
  def create(self, c: Certificate) -> Certificate | Exception:
    raise NotImplemented
    
  @abstractmethod
  def get_by_id(self, id: int) -> Certificate | Exception:
    raise NotImplemented