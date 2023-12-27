import ApiSets from "../../actions/apiSets"
import { OrderInterface, PostOrder } from "../../actions/apiInterface"
import { useAppDispatch } from "../../stores/hooks"
import { FETCH_ORDERS } from "../../stores/ordersSlice"
import { useState } from "react"
import { PRODUCT_DIST, productIF } from "../../globalAttr/globalVar"
import { CloseXBtn, PlusBtn } from "../widgets/buttons"
import OrderProducts from "./createProducts"

interface OrderCreaterIF{ openHandler:Function }       // openHandler : control switch on/off boolean
interface InputBlockIF{ content:string, input:string, func:Function, focus:boolean }


const OrderCreater=({openHandler}:OrderCreaterIF):React.JSX.Element=>{
    const [returnStage, setReturnStage] = useState<number>(1);
    let _frame = "border-8 border-zinc-500 rounded-xl bg-white shadow-xl py-5 pl-5 "
    let _trans = "-translate-x-5 -translate-y-5 "
    let _h = returnStage===0? 'h-1/2 ':'h-2/3 '
    return <div className={"absolute z-50 bottom-0 right-0 w-1/4 "+_h+_frame+_trans}>
        <div className="text-xl font-bold flex flex-row justify-between w-100 pr-5">
            <div>{returnStage===0?"建立訂單":"輸入產品"}</div>
            <CloseXBtn css="w-6 h-6 bg-zinc-200 rounded" func={openHandler}/>
        </div>
        <div className="h-[98%] overflow-auto scrollbar scroll pb-5">
            {returnStage===0?
                <OrderCustomer openHandler={setReturnStage}/>:
                <OrderProducts openHandler={openHandler} />
            }
        </div>
    </div>
}

export default OrderCreater

const OrderCustomer=({openHandler}:OrderCreaterIF):React.JSX.Element=>{
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
        openHandler(1)
        // ApiSets.post_order<OrderInterface[]>(_order)
        // .then(res=>{
        //     dispatch(FETCH_ORDERS(res))
        //     openHandler(1)
        // })
        // .catch(err=>console.log(err))
    }

    return(<div className="pr-5">
        <InputBlock content="姓名" func={handleInputData} input={order.name} focus={noInput} />
        <InputBlock content="顧客id" func={handleInputData} input={order.customer_id} focus={noInput} />
        <InputBlock content="其他" func={handleInputData} input={order.optional} focus={false} />
        <div className="flex flex-row h-16 items-center justify-end">
            <div className="bg-zinc-200 px-5 py-2 cursor-pointer font-bold rounded shadow" onClick={()=>{PostOrder(order)}}>確認</div>
        </div>
    </div>)
}

const InputBlock=({content, input, func, focus}:InputBlockIF):React.JSX.Element=>{
    let _noInputCss = focus?" border-red-500 border-2":" border"

    return <div className="flex flex-row h-10 w-100 items-center">
        <div className="flex-none w-20">{content}</div>
        <input value={input} type="text"
            onChange={(e)=>{func(e.target.value, content)}}
            className={"flex-none w-3/5 border border-zinc-500 rounded pl-2" + _noInputCss}/>
    </div>
}