from dataclasses import dataclass
from typing import List
from entity.text import Text

@dataclass
class Model:
  name: str
  front: None
  back: None
  texts: str = None
  id: int = None

  def to_dict(self):
      return {
          "name": self.name,
          "front": False,
          "back": False,
          "texts": self.texts,
          "id": self.id
      }