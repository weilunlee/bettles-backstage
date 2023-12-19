import { useEffect } from "react"
import ApiSets from "../../actions/apiSets"
import Orders from "./order"
import { useAppDispatch, useAppSelector } from "../../stores/hooks"
import { CLEAR_ORDERS, FETCH_ORDERS } from "../../stores/ordersSlice"
import COMM_ATTR from "../../assest/styles/commAttrs"
import { subPage2Month } from "../navBar/navFuncs"
import { OrderInterface } from "../../actions/apiInterface"

// interface OrderbodyIF{ orderArr:OrderInterface[] }

const OrderFrame=():JSX.Element=>{
    return(<div className="flex-1 grid grid-flow-row grid-cols-6" style={{gridTemplateRows:"repeat(20, minmax(0, 1fr))"}}>
        <div className="col-span-5 row-span-1 h-11"><OrderListBar /></div>
        <div className={"col-span-1 bg-white rounded-xl"+_border} style={{gridRow:"span 5 / span 5"}}></div>
        <div className={"col-span-5 grid "+_border}
            style={{gridRow:"span 19 / span 19", gridTemplateRows:"repeat(12, minmax(0, 1fr))"}}>
            <OrderBody />
        </div>
        <div className={"col-span-1 bg-white rounded-xl row-span-3"+_border}></div>
    </div>)
}
export default OrderFrame

const OrderBody=():JSX.Element=>{
    let _maxHeight:string = 'calc(100vh - 12.75rem)'       // header:3.5, padding(上下):2.5, line height:2+1, mb:1rem listbar(上下):2.75+2.75
    const dispatch = useAppDispatch()
    const orderArr = useAppSelector((state)=>state.orders.orderList)
    const page = useAppSelector((state)=>state.page)
    let _length = orderArr.length + 1

    useEffect(()=>{
        ApiSets.get_orders_list<OrderInterface[]>({id:0, month:subPage2Month(page.currentSubPage)})
        .then(res=>{dispatch(FETCH_ORDERS(res))})
        .catch(()=>{dispatch(CLEAR_ORDERS())})
    }, [dispatch, page])

    return <div className="overflow-auto scrollbar bg-white rounded-b-lg" style={{ maxHeight: _maxHeight, gridRow:`span ${_length} / span ${_length}`}}>
        {orderArr.map(res=><Orders {...res} key={res.id}/>)}
        {_length===1? <div className="w-full h-full flex items-center justify-center">--- 本月無訂單 ---</div>:null}
    </div>
}

export const OrderListBar=():JSX.Element=>{
    return(<div className={"h-full w-full bg-white rounded-t-xl grid grid-cols-12"+_border}>
        <div className="col-span-1 flex justify-around items-center">
            <div className="flex justify-center items-center h-10 w-10 cursor-pointer rounded-full hover:bg-slate-100">
                <div data-tooltip="全選" aria-label="全選" className={"w-5 h-5 rounded border-2 border-stone-400" + COMM_ATTR.tip}></div>
            </div>
        </div>
        <div className="col-span-8 flex justify-center items-center">
            <input className="w-60 border"/>
        </div>
        <div className="col-span-2 flex justify-around items-center">
            <PageArrow content="較舊" direction={true} />
            <PageArrow content="較新" direction={false} />
        </div>
    </div>)
}

const PageArrow=({content, direction}:Arrow):JSX.Element=>{
    let tip_before = " before:w-3 before:h-3 before:rounded-tl before:border-stone-400 before:hover:border-black"
    let _dir = direction? " before:-rotate-45 before:border-l-2 before:border-t-2":" before:-rotate-45 before:border-b-2 before:border-r-2"
    return <div
        data-tooltip={content}
        aria-label={content}
        aria-disabled="true"
        className={"h-10 w-10 cursor-pointer rounded-full hover:bg-slate-100"+ COMM_ATTR.tip + tip_before + _dir}>
    </div>
}

const _border = " border-2 border-slate-200"
interface Arrow{
    content:string,
    direction:boolean,
}