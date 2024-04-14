import { OrderInterface } from "../../actions/apiInterface"
import { TimeHandler } from "../../actions/globalFuncs"
import { DeleteBtn } from "../widgets/buttons"
import { useAppDispatch, useAppSelector } from "../../stores/hooks"
import ApiSets from "../../actions/apiSets"
import { CLEAR_ORDERS, FETCH_ORDERS } from "../../stores/ordersSlice"
import { subPage2Month } from "../navBar/navFuncs"

interface stateIF{
    time:string,
    stage:number,
    status:number
}

const Orders=(props:OrderInterface):React.JSX.Element=>{
    const dispatch = useAppDispatch()
    const page = useAppSelector((state)=>state.page)
    function deleteOrder(_id:number){
        ApiSets.delete_order(_id)
            .then(()=>{
                ApiSets.get_orders_list<OrderInterface[]>({id:0, month:subPage2Month(page.currentSubPage)})
                .then(res=>{dispatch(FETCH_ORDERS(res))})
                .catch(()=>{dispatch(CLEAR_ORDERS())})
            })
            .catch(err=>{console.log(err)})
    }
    let _hoverStyle:string = "hover:outline hover:outline-2 hover:outline-slate-400 "
    let _frameStyle:string = "h-16 w-100 m-0.5 mb-1 bg-white rounded-sm shadow flex flex-row items-center "
    let _gridStyle:string = "grid"
    console.log(props.payment_status, props.shipping_status)
    return(<div className={_frameStyle+_hoverStyle+_gridStyle} style={{gridTemplateColumns:"repeat(20, minmax(0, 1fr))"}}>
        <div className="col-span-1 flex justify-center items-center">
            <div className="flex justify-center items-center h-12 w-12 cursor-pointer rounded-full hover:bg-slate-100">
                <div className="w-5 h-5 rounded border-2 border-stone-400 grid-cols-17"></div>
            </div>
        </div>
        <div className="col-span-1 flex justify-center items-center">{props.id}</div>
        <StateComponent time={new TimeHandler(props.place_time).getAutoDate()} stage={0} status={1}/>
        <StateComponent time={new TimeHandler().getDateZHTW()} stage={1} status={props.payment_status}/>
        <StateComponent time={new TimeHandler().getDateZHTW()} stage={2} status={props.shipping_status}/>
        <div className="col-span-2 flex justify-center items-center"></div>
        <div className="col-span-2 flex justify-center items-center">已完成</div>
        <div className="col-span-2 flex justify-center items-center">已完成</div>
        <div className="col-span-2 flex justify-center items-center">{props.name}</div>
        <div className="col-span-2 flex justify-center items-center">${ Math.floor(Math.random() * 3001)}</div>
        <DeleteBtn size="col-span-2" function={()=>{deleteOrder(props.id)}}/>
    </div>)
}
export default Orders

const StateComponent=({time, stage, status}:stateIF):React.JSX.Element => {
    let _bg = handleStateColor(status)
    let _content = ''
    switch (stage) {
        case 0:
            _content = '成立'
            break;
        case 1:
            _content = '付款'
            break;
        case 2:
            _content = '出貨'
            break;
        default:
            break;
    }
    return <div className="col-span-2 flex justify-center items-center flex-col">
        <div className={"rounded px-1 "+_bg}>{status!==0?"已":"未"}{_content}</div>
        <div>{new TimeHandler().DB2Time(time)}</div>
    </div>
}

function handleStateColor(_status:number):string{
    switch (_status) {
        case 0: return 'bg-red-300'
        case 1: return 'bg-green-300'
        // case 1: return 'bg-red-300'
        // case 2: return 'bg-orange-300'
        // case 3: return 'gray'
        // case 4: return 'gray'
        // case 5: return 'gray'
        // case 6: return 'gray'
        default: return 'gray'
    }
}