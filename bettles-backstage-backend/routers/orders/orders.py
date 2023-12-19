from fastapi import APIRouter, Request, Depends, status, HTTPException, responses
from datetime import datetime, timedelta, date
from sqlalchemy import delete
from sqlalchemy.orm import Session
from backendSetup import models, schemas, database
import calendar

router = APIRouter(
    tags=["order"]
)
get_db = database.get_db

DN = datetime.now()                            # date now
# _df = '%Y-%m'                                   # date format
# _df = '%Y-%m-%d'                                # date format
_df = '%Y-%m-%d %H:%M:%S'                          # date format
_dStr = datetime.strftime(DN, _df)             # datetime.strftime
_dM = DN.month
# _mS = DN.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
# _mE = DN.replace(month=_dM, day=1, hour=23, minute=59, second=59, microsecond=999999) - timedelta(days=1)
@router.get("/get_orders_list", status_code=status.HTTP_200_OK, summary="抓訂單資料")
async def get_orders_list(id:int=0, month:int=_dM, db: Session = Depends(get_db)):
    """
    取得訂單紀錄
    """
    try:
        now = date.today()
        monethStart = DN.replace(month=month, day=1, hour=0, minute=0, second=0, microsecond=0)
        # monethEnd = DN.replace(month=month+1, day=1, hour=23, minute=59, second=59, microsecond=999999) - timedelta(days=1)
        monethEnd = datetime(now.year, month, calendar.monthrange(now.year, month)[1])
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED,  detail=f"{e}")
    try:
        if id==0:
            _orders = db.query(models.OrdersStatus).filter(models.OrdersStatus.created_at>=monethStart).filter(models.OrdersStatus.created_at<=monethEnd).order_by(models.OrdersStatus.id.desc()).all()
        else:
            _orders = db.query(models.OrdersStatus).filter(models.OrdersStatus.id==int(id)).filter(models.OrdersStatus.created_at>=monethStart).filter(models.OrdersStatus.created_at<=monethEnd).all()
    except:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,  detail="can't find order!")
    if not _orders:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,  detail=f'No orders have been founded！')
    db.close()
    return _orders


@router.post("/create_order", status_code=status.HTTP_200_OK, summary="新增訂單")
async def create_order(request:schemas.OrdersStatus, client:Request, db: Session = Depends(get_db)):
    """
    新增訂單
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
    # return responses.JSONResponse(content={'orders': _orders})
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