from dataclasses import dataclass
from typing import Tuple

@dataclass
class Text:
  size: str
  pos_x: Tuple[int, int]
  pos_y: int
  text: str = None
  