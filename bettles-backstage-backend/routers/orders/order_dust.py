from fastapi import APIRouter, Request, Depends, status, HTTPException, responses
from datetime import datetime, date
from sqlalchemy.orm import Session
from backendSetup import models, schemas, database

router = APIRouter(
    tags=["order"]
)
get_db = database.get_db

@router.post("/create_order_dust", status_code=status.HTTP_200_OK, summary="新增土訂單")
async def create_order_dust(request:schemas.OrdersStatus, client:Request, db: Session = Depends(get_db)):
    """
    新增土訂單
    """
    customer = db.query(models.Customers).filter(models.Customers.id==request.customer_id).first()
    if not customer:
        try:
            new_customer = models.Customers(
                name = request.name,
                cell_phone = "",
                last_ip = client.client.host,
                address = "",
                conv_store = "",
                created_at = datetime.now()
            )
            customer = new_customer
            db.add(new_customer)
            db.commit()
            db.refresh(new_customer)
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,  detail=f'{e} error occurred during creating customer')
    try:
        request = models.OrdersStatus(
            name = request.name,
            customer_id = customer.id,
            place_time = datetime.now(),
            payment_status= 0,
            product_status=0,
            shipping_status=0,
            optional = request.optional,
            created_at = datetime.now()
        )
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,  detail=f'{e} error occurred during creating signing value')

    try:
        db.add(request)
        db.commit()
        db.refresh(request)
    except:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail='error occurred during creating order')
    try:
        _orders = db.query(models.OrdersStatus).order_by(models.OrdersStatus.id.desc()).all()
    except:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail='sql busy, yet order created!')
    db.close()
    return _orders


@router.delete("/delete_order", status_code=status.HTTP_200_OK, summary="刪除訂單")
async def delete_order(id:int, db: Session = Depends(get_db)):
    """
    刪除訂單
    """
    _order = db.query(models.OrdersStatus).filter(models.OrdersStatus.id==id)
    if not _order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'{id} order not found！')
    try:
        _order.delete()
        db.commit()
    except Exception as e:
        raise e
    db.close()
    return HTTPException(status_code=status.HTTP_200_OK, detail='successfully delete order')