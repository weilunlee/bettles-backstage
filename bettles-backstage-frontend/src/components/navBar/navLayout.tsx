import { useAppDispatch, useAppSelector } from "../../stores/hooks"
import { FULL_PAGESTATE_UPDATE, PAGE_SELECTED } from "../../stores/pageSelcSlice"
import { NAVBAR_LIST, NAV_SWITCHER } from "./navBarVar"
import { subPageHandler } from "./navFuncs"

type arrowSide = {
    side: boolean,
    currentPage: number,
}
type dropDownType = {
    page: number,
    sub: number
}

const NavLayout = ():JSX.Element=> {
    const dispatch = useAppDispatch()
    const page = useAppSelector((state) => state.page)
    const currentPage:number = page.currentPage
    const fullPageState:boolean[] = page.fallPageState
    const navList:string[] = NAVBAR_LIST
    const navSwitch:boolean[] = NAV_SWITCHER

    return(<div className="w-64 bg-zinc-50 shadow-md p-1 z-40 scrollbar overflow-y-auto" style={{height:"calc(100vh - 3.5rem)"}}>{navList.map((res, index)=><div key={res+index}
            onClick={()=>{
                if(!navSwitch[index]) dispatch(PAGE_SELECTED({ currentPage:index, currentSubPage:0}))
                else if(!fullPageState[index] && navSwitch[index]) dispatch(PAGE_SELECTED({ currentPage:index, currentSubPage:0}))
            }}
            className={`text-sm flex flex-col cursor-pointer m-2 ${fullPageState[index] && navSwitch[index]?"bg-stone-100 rounded-md border border-stone-100":"border border-zinc-50"}`}>
            <div className={`z-40 flex flex-row rounded-md items-center p-2 hover:bg-blue-100 ${currentPage === index? "bg-blue-100 ":"bg-zinc-50"}`}>
                <img className="w-5 h-5" src="" alt={res} />
                <div className="pl-3">{res}</div>
                {navSwitch[index]? <DownArrow side={fullPageState[index]}  currentPage={index}/>:null}
            </div>
            {fullPageState[index] && navSwitch[index]? <NavDropDown page={index} sub={page.currentSubPage}/>:null}
        </div>)}
    </div>)
}
export default NavLayout;

const DownArrow = ({side, currentPage}:arrowSide):JSX.Element => {
    const dispatch = useAppDispatch()
    return <div className="w-4 h-4 flex flex-row items-center justify-center ml-3"
        onClick={()=>{dispatch(FULL_PAGESTATE_UPDATE({ currentPage:currentPage}))}}>
        <div className={`flex-none w-2 h-2 border-b border-r border-stone-500 hover:-rotate-45 transition duration-300 -translate-y-px ${side? "-rotate-45":"rotate-45 "}`}></div>
    </div>
}

const NavDropDown = ({ page, sub }:dropDownType):JSX.Element => {
    const dispatch = useAppDispatch()
    return <div className="items-center">
        {subPageHandler(page).map((res, index)=><div 
            key={res+index}
            onClick={()=>{dispatch(PAGE_SELECTED({ currentPage:page, currentSubPage:index}))}}
            className={`px-5 py-1 my-1 mx1 rounded-md hover:bg-stone-300 ${sub===index? "bg-stone-300":""}`}>
                {res}
        </div>)}
    </div>
}