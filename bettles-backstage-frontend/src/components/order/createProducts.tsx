import { PostOrder } from "../../actions/apiInterface"
import { useAppDispatch } from "../../stores/hooks"
import { useEffect, useState } from "react"
import { PRODUCT_DIST, productIF } from "../../globalAttr/globalVar"
import { CloseXBtn, PlusBtn } from "../widgets/buttons"

interface OrderCreaterIF{ openHandler:Function }       // openHandler : control switch on/off boolean
interface SelectBoxIF{
    content:string,
    added:boolean,
    func:Function
}
const order = {
    id:1,
    name:"",
    customer_id:"",
    optional:""
};
type OrderIF = typeof order
interface ItemsIF{
    order: OrderIF,
    func1:Function,
    func2:Function
}
interface ProductIF {
    name:string,
    catagory: string[]
}

interface OptionIF {
    product: ProductIF,
    func:Function
}

const _border = 'border rounded border-slate-300'

const OrderProducts=({openHandler}:OrderCreaterIF):React.JSX.Element=>{
    const dispatch = useAppDispatch()
    const [index, setIndex] = useState(2);
    const [orderList, setOrderList] = useState<OrderIF[]>([order]);
    function addOrderList(){
        let _new_order = {
            id:0,
            name:"",
            customer_id:"",
            optional:""
        };
        _new_order.id = index
        setOrderList([...orderList, _new_order])
        setIndex(index+1)
    }
    function pushOrderList(_result:OrderIF){
        setOrderList(
            orderList.filter(o=>o.id!==_result.id)
        )
    }
    function PostOrder(){}

    return(<>
    {orderList.map(res=><ItemRow func1={addOrderList} func2={pushOrderList} order={res} key={res.id}/>)}

    <div className="flex flex-row h-16 items-center justify-end mr-5">
        <div className="bg-zinc-200 px-5 py-2 cursor-pointer font-bold rounded shadow" onClick={()=>{PostOrder()}}>確認</div>
    </div>
    </>)
}
export default OrderProducts

const ItemRow=({func1, func2, order}:ItemsIF):React.JSX.Element=>{
    const [show, setShow] = useState<boolean>(false);
    const [select, setSelect] = useState<ProductIF>(PRODUCT_DIST.STBDS);
    function toggleShow(){
        setShow(!show)
    }
    function selectCombine(){
        toggleShow()
        func1()
    }
    return <div className="flex flex-col shadow rounded px-3 py-2 mr-5">
        <div className="flex items-center w-full justify-between">
            <div className="flex items-center">
                {!show?<div className="w-10">
                    <PlusBtn css="bg-blue-400 w-6 h-6 active:bg-blue-200" func={selectCombine}/>
                </div>:null}
                <SelectBlock content={!show?"新增產品":"產品"+order.id} added={show} func={setSelect} />
            </div>
            {show?<div className="" onClick={toggleShow}><CloseXBtn css="w-6 h-6" func={()=>{func2(order)}} /></div>:null}
        </div>
        {show? <OptionBlock product={select} func={()=>{}}/>:null}
    </div>
}

const SelectBlock=({content, added, func}:SelectBoxIF):React.JSX.Element=>{
    const productList = Object.keys(PRODUCT_DIST) as Array<productIF>
    function handleSelect(_value:string){
        let _p_m = productList.filter(res=>PRODUCT_DIST[res].name===_value)[0]
        func(PRODUCT_DIST[_p_m])
    }
    return <div className={`flex flex-row h-10 w-100 items-center `}>
        <div className="flex-none w-20 ">{content}</div>
        <select
            onChange={e=>{handleSelect(e.target.value)}}
            className={added?_border:"text-gray-400"}>
            {productList.map(res=><option key={res}>{PRODUCT_DIST[res].name}</option>)}
        </select>
    </div>
}

const OptionBlock=({product, func}:OptionIF):React.JSX.Element=>{
    return <div>
        <div className="flex flex-row h-10 w-100 items-center ">
            <div className="w-20">產品規格</div>
            <select className={_border}>
            {product?.catagory.map(res=><option key={res}>{res}</option>)}
            </select>
        </div>
        <div className="flex flex-row h-10 w-100 items-center ">
            <div className="w-20">產品數量</div>
            <input type="number" className={`w-1/2 pl-1 ${_border}`}/>
        </div>
    </div>
}