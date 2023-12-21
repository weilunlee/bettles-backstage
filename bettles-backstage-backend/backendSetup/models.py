from backendSetup.database import Base
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

class OrdersStatus(Base):
    __tablename__ = 'orders_status'
    id = Column(Integer, primary_key=True)
    name = Column(String(45))
    customer_id = Column(String(45))
    place_time = Column(DateTime)
    payment_status = Column(Integer)
    payment_time = Column(DateTime)
    product_status = Column(Integer)
    shipping_status = Column(Integer)
    shipping_time = Column(DateTime)
    arrive_time = Column(DateTime)
    optional = Column(String(255))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

class OrdersDust(Base):
    __tablename__ = 'orders_dust'
    id = Column(Integer, primary_key=True)
    name = Column(String(45))
    customer_id = Column(String(45))
    order_id = Column(Integer)
    place_time = Column(DateTime)
    product_name = Column(String(45))
    amounts = Column(Integer)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

class Customers(Base):
    __tablename__ = 'customers'
    id = Column(Integer, primary_key=True)
    name = Column(String(8))
    cell_phone = Column(String(12))
    last_ip = Column(String(45))
    address = Column(String(255))
    conv_store = Column(String(255))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
