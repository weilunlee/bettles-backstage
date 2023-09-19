from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class OrdersStatus(BaseModel):
    name:str = Field(..., title="customer name")
    customer_id: int = Field(..., title="customer id")
    optional:str

class Customers(BaseModel):
    name:str = Field(default='', title="customer name")
    cell_phone: str = Field(default='', title="cell_phone")
    last_ip: str = Field(default='', title="cell_phone")
    address: str = Field(default='', title="cell_phone")
    conv_store: str = Field(default='', title="cell_phone")
    cell_phone: str = Field(    default='', title="cell_phone")
    # created_at:datetime = Field(..., title='created_at')
    # updated_at: datetime = Field(..., title='updated_at')