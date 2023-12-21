import { useAppSelector } from "../../stores/hooks"
import CfFrame from "../cashFlow/cfFrame"
import CustomerFrame from "../customer/customerFrame"
import Dashboard from "../dashboard/dashboard"
import OrderFrame from "../order/orderFrame"
import MainHeader from "./mainHeader"

const MainFrame=():React.JSX.Element=>{
    const page = useAppSelector((state) => state.page)
    function handlePage(_p:number, _s:number):React.JSX.Element{
        switch (_p) {
            case 0: return <Dashboard />
            case 1: return <OrderFrame />
            case 2: return <CfFrame />
            case 3: return <CustomerFrame />
            case 4: return <></>
            case 5: return <></>
            case 6: return <></>
            default:
                return <></>
        }
    }

    return <div className="flex-1 px-8 py-5 bg-slate-200 flex flex-col">
        <MainHeader {...page}/>

        {handlePage(page.currentPage, page.currentSubPage)}
    </div>
}
export default MainFrame