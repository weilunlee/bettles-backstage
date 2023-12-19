from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from backendSetup import models, database

router = APIRouter(
    tags=["customer"]
)
get_db = database.get_db

@router.get("/get_customers_list", status_code=status.HTTP_200_OK, summary="抓客戶資料")
async def get_customers_list(db: Session = Depends(get_db)):
    """
    取得客戶紀錄
    """
    try:
        _customers = db.query(models.Customers).all()
    except Exception as err:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,  detail=f"{err}, No Customers have been founded！")
    db.close()
    return _customers


@router.delete("/delete_customer", status_code=status.HTTP_200_OK, summary="刪除客戶")
async def delete_customer(id:int, db: Session = Depends(get_db)):
    """
    刪除訂單
    """
    _customer = db.query(models.Customers).filter(models.Customers.id==id)
    if not _customer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'{id} Customers not found！')
    try:
        _customer.delete()
        db.commit()
    except Exception as e:
        raise e
    db.close()
    return HTTPException(status_code=status.HTTP_200_OK, detail='successfully delete Customers')