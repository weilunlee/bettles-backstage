import ApiSets from "../../actions/apiSets"
import { OrderInterface, PostOrder } from "../../actions/apiInterface"
import { useAppDispatch } from "../../stores/hooks"
import { FETCH_ORDERS } from "../../stores/ordersSlice"
import { useState } from "react"

interface OCInterface{ openHandler:Function }
interface InputBlockIF{ content:string, input:string, func:Function, focus:boolean }

const OrderCreater=({openHandler}:OCInterface):JSX.Element=>{
    let _frame = "border-8 border-zinc-500 rounded-xl bg-white shadow-xl p-5 "
    let _trans = "-translate-x-5 -translate-y-5 "
    const dispatch = useAppDispatch()
    const [order, setOrder] = useState<PostOrder>({
        name:"",
        customer_id:"",
        optional:""
    });
    const [noInput, setNoInput] = useState(false);

    function handleInputData(_value:string, _index:string):void{
        let _addText:object = {}
        switch (_index) {
            case "姓名": _addText={name:_value}; break;
            case "顧客id": _addText={customer_id:_value}; break;
            case "其他": _addText={optional:_value}; break;
            default: break;
        }
        setOrder({...order, ..._addText})
    }

    function PostOrder(_order:PostOrder):void{
        if(_order.name==="" && _order.customer_id===""){
            setNoInput(true);
            return;
        }
        if(_order.customer_id==="") _order.customer_id = "0"
        ApiSets.post_order<OrderInterface[]>(_order)
        .then(res=>{dispatch(FETCH_ORDERS(res))})
        .catch(err=>console.log(err))
    }

    return(<div className={"absolute z-50 top-1/2 left-3/4 w-1/4 h-1/2 "+_frame+_trans}>
        <div className="text-xl font-bold flex flex-row justify-between w-100">
            <div>建立訂單</div>
            <div onClick={()=>{openHandler()}} className="w-6 h-6 bg-zinc-200 rounded flex justify-center items-center flex-none cursor-pointer">
                <div className="w-3 absolute border rotate-45 border-zinc-700"></div>
                <div className="h-3 absolute border rotate-45 border-zinc-700"></div>
            </div>
        </div>
        <InputBlock content="姓名" func={handleInputData} input={order.name} focus={noInput} />
        <InputBlock content="顧客id" func={handleInputData} input={order.customer_id} focus={noInput} />
        <InputBlock content="其他" func={handleInputData} input={order.optional} focus={false} />
        <div className="flex flex-row h-16 items-center justify-end">
            <div className="bg-zinc-200 px-5 py-2 cursor-pointer font-bold rounded shadow" onClick={()=>{PostOrder(order)}}>確認</div>
        </div>
    </div>)
}
export default OrderCreater

const InputBlock=({content, input, func, focus}:InputBlockIF):JSX.Element=>{
    let _noInputCss = focus?" border-red-500 border-2":" border"

    return <div className="flex flex-row h-10 w-100 items-center">
        <div className="flex-none w-20">{content}</div>
        <input value={input} type="text"
            onChange={(e)=>{func(e.target.value, content)}}
            className={"flex-none w-3/5 border border-zinc-500 rounded pl-2" + _noInputCss}/>
    </div>
}