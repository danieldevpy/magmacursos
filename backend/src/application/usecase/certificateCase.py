from application.repository.certificateRepository import CertificateRepository, Certificate


class CertificateCase:

  @classmethod
  def create(cls, repository: CertificateRepository, certificate: Certificate):
    return repository.create(certificate)
  
  @classmethod
  def get_by_id(cls, repository: CertificateRepository, id: int) -> Certificate | Exception:
    return repository.get_by_id(id)