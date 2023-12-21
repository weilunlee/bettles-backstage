import { CustomerInterface } from "../../actions/apiInterface"
import ApiSets from "../../actions/apiSets"
import { CLEAR_CUSTOMERS, FETCH_CUTOMERS } from "../../stores/customersSlice"
import { useAppDispatch } from "../../stores/hooks"
import { DeleteBtn } from "../widgets/buttons"

const Customers = (props:CustomerInterface):React.JSX.Element=>{
    const dispatch = useAppDispatch()
    function deleteCustomer(_id:number){
        ApiSets.delete_customers(_id)
        .then(()=>{
            ApiSets.get_customers_list<CustomerInterface[]>()
            .then(res=>{dispatch(FETCH_CUTOMERS(res))})
            .catch(()=>{dispatch(CLEAR_CUSTOMERS())})
        })
        .catch(err=>{console.log(err)})
    }
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
        <div className="col-span-2 flex justify-center items-center">{props.name}</div>
        <div className="col-span-2 flex justify-center items-center">{props.cell_phone}</div>
        <div className="col-span-10 flex justify-center items-center"></div>
        <DeleteBtn size="col-span-2" function={()=>{deleteCustomer(props.id)}}/>
    </div>)
}

export default Customers