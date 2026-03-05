from datetime import date, datetime
from typing import Literal
from pydantic import BaseModel, Field, field_validator


class _LeaveRequestBase(BaseModel):
    """Shared validation logic for leave request models."""

    emp_name: str = Field(min_length=1, max_length=16)
    date: date
    time: Literal["AM", "PM"]

    @field_validator("emp_name")
    @classmethod
    def emp_name_not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("emp_name must not be blank")
        return v


# Request models
class InsertModel(_LeaveRequestBase):
    reason: str | None = Field(default=None, min_length=1, max_length=64)


class UpdateModel(_LeaveRequestBase):
    pass


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