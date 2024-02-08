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
