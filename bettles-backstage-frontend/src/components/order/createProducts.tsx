import { PostOrder } from "../../actions/apiInterface"
import { useAppDispatch } from "../../stores/hooks"
import { useEffect, useState } from "react"
import { PRODUCT_DIST, productIF } from "../../globalAttr/globalVar"
import { CloseXBtn, PlusBtn } from "../widgets/buttons"

interface OrderCreaterIF{ openHandler:Function }       // openHandler : control switch on/off boolean
interface SelectBoxIF{ content:string, added:boolean }
interface ItemsIF{ func:Function }
const order = {
    name:"",
    customer_id:"",
    optional:""
};
type orderIF = typeof order

const OrderProducts=({openHandler}:OrderCreaterIF):React.JSX.Element=>{
    const dispatch = useAppDispatch()
    const [orderList, setOrderList] = useState<orderIF[]>([order]);
    const [noInput, setNoInput] = useState(false);
    function addOrderList(){
        setOrderList([...orderList, order])
    }
    function PostOrder(){}
    useEffect(()=>{
        console.log(orderList)
    }, [orderList])
    return(<>
    {orderList.map(res=><ItemRow func={addOrderList} key={res.name}/>)}

    <div className="flex flex-row h-16 items-center justify-end">
        <div className="bg-zinc-200 px-5 py-2 cursor-pointer font-bold rounded shadow" onClick={()=>{PostOrder()}}>確認</div>
    </div>
    </>)
}
export default OrderProducts

const ItemRow=(props:ItemsIF):React.JSX.Element=>{
    const [select, setSelect] = useState<boolean>(false);
    function toggleSelect(){
        setSelect(!select)
    }
    return <div className="flex items-center w-full justify-between">
        <div className="flex items-center">
            {!select?<div className="w-10" onClick={()=>{
                toggleSelect()
                props.func()}}>
                <PlusBtn css="bg-blue-400 w-6 h-6 active:bg-blue-200"/>
            </div>:null}
            <SelectBlock content={!select?"新增產品":"產品"} added={select} />
        </div>
        {select?<div className="" onClick={toggleSelect}><CloseXBtn /></div>:null}
    </div>
}

const SelectBlock=({content, added}:SelectBoxIF):React.JSX.Element=>{
    const productList = Object.keys(PRODUCT_DIST) as Array<productIF>
    return <div className={`flex flex-row h-10 w-100 items-center `}>
        <div className="flex-none w-20 ">{content}</div>
        <select className={added?"":"text-gray-400"}>{productList.map(res=><option key={res}>{PRODUCT_DIST[res].name}</option>)}</select>
    </div>
}