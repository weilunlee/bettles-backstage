import uvicorn
import env as env
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.orders import orders
from routers.customers import customers
import backendSetup.models
from backendSetup.database import engine

app = FastAPI()

origins = ['*']
# 開 cors !!!!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# 開 cors !!!!

# create engine重要！
backendSetup.models.Base.metadata.create_all(engine)

app.include_router(orders.router)
app.include_router(customers.router)


if __name__ == '__main__':
    config = uvicorn.Config(
        env.APP,
        host=env.HOST,
        port=env.PORT,
        log_level="info",
        workers=env.WORKERS,
        reload=True
    )
    server = uvicorn.Server(config)
    server.run()