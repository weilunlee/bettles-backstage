from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import env

DATABASE_URL = "mysql+pymysql://" + env.USER+":"+env.PWD+"@"+env.HOST_PORT_DB+'/'+env.DB

engine = create_engine(DATABASE_URL, echo=False, pool_recycle=1200, pool_size=120)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()

def get_db():
    db=SessionLocal()
    try:
        yield db
    except:
        db.close()