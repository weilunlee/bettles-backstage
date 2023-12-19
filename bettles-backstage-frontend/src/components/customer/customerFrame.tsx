import { useEffect } from "react"
import ApiSets from "../../actions/apiSets"
import { useAppDispatch, useAppSelector } from "../../stores/hooks"
import { OrderListBar } from "../order/orderFrame"
import { FETCH_CUTOMERS } from "../../stores/customersSlice"
import { CustomerInterface } from "../../actions/apiInterface"
import Customers from "./customers"

const _border = " border-2 border-slate-200"

const CustomerFrame =():JSX.Element=>{
    return <div className="flex-1 grid grid-flow-row grid-cols-6" style={{gridTemplateRows:"repeat(20, minmax(0, 1fr))"}}>
        <div className="col-span-5 row-span-1 h-11"><OrderListBar /></div>
        <div className={"col-span-5 grid "+_border}
            style={{gridRow:"span 19 / span 19", gridTemplateRows:"repeat(12, minmax(0, 1fr))"}}>
            <CustomerBody />
        </div>
    </div>
}

export default CustomerFrame

const CustomerBody=():JSX.Element=>{
    const customerArr = useAppSelector((state)=>state.customers.customerList)
    let _maxHeight:string = 'calc(100vh - 12.75rem)'       // header:3.5, padding(上下):2.5, line height:2+1, mb:1rem listbar(上下):2.75+2.75
    let _length = customerArr.length + 1
    const dispatch = useAppDispatch()

    useEffect(()=>{
        ApiSets.get_customers_list<CustomerInterface[]>()
        .then(res=>{dispatch(FETCH_CUTOMERS(res))})
        .catch(err=>{console.log(err)})
    }, [dispatch])

    return <div className="overflow-auto scrollbar bg-white rounded-b-lg" style={{ maxHeight: _maxHeight, gridRow:`span ${_length} / span ${_length}`}}>
        {customerArr.map(res=><Customers {...res} key={res.id}/>)}
        {_length===1? <div className="w-full h-full flex items-center justify-center">--- 本月無訂單 ---</div>:null}
    </div>
}