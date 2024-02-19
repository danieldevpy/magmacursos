from dataclasses import dataclass
from entity.model import Model

@dataclass
class Certificate:
  name: str
  cpf: str
  date: str
  model: Model
  id: int = None

  def formatar_cpf(self):
      cpf_formatado = f"{self.cpf[:3]}.{self.cpf[3:6]}.{self.cpf[6:9]}-{self.cpf[9:]}"
      return cpf_formatado
  
  def to_dict(self):
      return {
          "name": self.name,
          "cpf": self.cpf,
          "date": self.date,
          "model": self.model.to_dict(),  # Assuming Model also has a to_dict method
          "id": self.id
      }