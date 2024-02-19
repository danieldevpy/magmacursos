from typing import List
from application.repository.certificateRepository import CertificateRepository, Certificate


class CertificateCase:

  @classmethod
  def create(cls, repository: CertificateRepository, certificate: Certificate):
    return repository.create(certificate)
  
  @classmethod
  def get_by_id(cls, repository: CertificateRepository, id: int) -> Certificate | Exception:
    return repository.get_by_id(id)
  
  @classmethod
  def list_all(cls, repository: CertificateRepository) -> List[Certificate] | Exception:
    return repository.list_all()