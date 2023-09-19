import { OrderInterface } from "../../actions/apiInterface"
import { TimeHandler } from "../../actions/globalFuncs"

interface stateIF{
    time:string,
    content:string,
    status:number
}

const Orders=(props:OrderInterface):JSX.Element=>{
    let _hoverStyle:string = "hover:outline hover:outline-2 hover:outline-slate-400 "
    let _frameStyle:string = "h-16 w-100 m-0.5 mb-1 bg-white rounded-sm shadow flex flex-row items-center "
    let _gridStyle:string = "grid"
    return(<div className={_frameStyle+_hoverStyle+_gridStyle} style={{gridTemplateColumns:"repeat(20, minmax(0, 1fr))"}}>
        <div className="col-span-1 flex justify-center items-center">
            <div className="flex justify-center items-center h-12 w-12 cursor-pointer rounded-full hover:bg-slate-100">
                <div className="w-5 h-5 rounded border-2 border-stone-400 grid-cols-17"></div>
            </div>
        </div>
        <div className="col-span-1 flex justify-center items-center">{props.id}</div>
        <StateComponent time={new TimeHandler(props.place_time).getAutoDate()} content={'已成立'} status={props.product_status}/>
        <StateComponent time={new TimeHandler().getDateZHTW()} content={'已完成'} status={0}/>
        <StateComponent time={new TimeHandler().getDateZHTW()} content={'已完成'} status={0}/>
        <div className="col-span-2 flex justify-center items-center"></div>
        <div className="col-span-2 flex justify-center items-center">已完成</div>
        <div className="col-span-2 flex justify-center items-center">已完成</div>
        <div className="col-span-2 flex justify-center items-center">{props.name}</div>
        <div className="col-span-2 flex justify-center items-center">$3000</div>
    </div>)
}
export default Orders

const StateComponent=({time, content, status}:stateIF):JSX.Element => {
    let _bg = handleStateColor(status)
    return <div className="col-span-2 flex justify-center items-center flex-col">
        <div className={"rounded px-1 "+_bg}>{content}</div>
        <div>{new TimeHandler().DB2Time(time)}</div>
    </div>
}

function handleStateColor(_status:number):string{
    switch (_status) {
        case 0: return 'bg-red-300'
        case 1: return 'bg-red-300'
        case 2: return 'bg-orange-300'
        case 3: return 'gray'
        case 4: return 'gray'
        case 5: return 'gray'
        case 6: return 'gray'
        default: return 'gray'
    }
}