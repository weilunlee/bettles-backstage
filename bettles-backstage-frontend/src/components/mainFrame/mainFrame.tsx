import { useAppSelector } from "../../stores/hooks"
import CfFrame from "../cashFlow/cfFrame"
import Dashboard from "../dashboard/dashboard"
import OrderFrame from "../order/orderFrame"
import MainHeader from "./mainHeader"

const MainFrame=():JSX.Element=>{
    const page = useAppSelector((state) => state.page)
    function handlePage(_p:number, _s:number):JSX.Element{
        switch (_p) {
            case 0: return <Dashboard />    
            case 1: return <OrderFrame />
            case 2: return <CfFrame />
            case 3: return <></>
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