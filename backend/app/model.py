from datetime import date, datetime
from typing import Literal

from pydantic import BaseModel, Field


# Request models
class InsertModel(BaseModel):
    emp_name: str = Field(min_length=1, max_length=16)
    date: date
    time: Literal["AM", "PM"]
    reason: str | None = Field(default=None, min_length=1, max_length=64)


class UpdateModel(BaseModel):
    emp_name: str = Field(min_length=1, max_length=16)
    date: date
    time: Literal["AM", "PM"]


# Response models
class MessageResponse(BaseModel):
    message: str


class LeaveRecord(BaseModel):
    IDX: int
    CREATE_TIME: datetime
    DELETE_TIME: str
    EMP_NAME: str
    DATE: date
    TIME: str
    REASON: str | None = None


class FetchResponse(BaseModel):
    status: str
    data: list[LeaveRecord]
