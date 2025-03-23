# import package
from pydantic import BaseModel
from typing import Optional

# class model for InsertData
class InsertModel(BaseModel):
    emp_name: str
    date: str
    time: str
    reason: Optional[str] = None

# class model for UpdateDatas
class UpdateModel(BaseModel):
    emp_name: str
    date: str
    time: str