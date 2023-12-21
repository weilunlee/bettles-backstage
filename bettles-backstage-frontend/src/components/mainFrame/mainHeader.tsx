import { useState } from "react"
import { pageState } from "../../stores/storeInterface"
import { NAVBAR_LIST, NAV_SWITCHER } from "../navBar/navBarVar"
import { subPageHandler } from "../navBar/navFuncs"
import { pageOptionHandler, pageOptionOpener } from "./mainFuncs"
import { PlusBtn } from "../widgets/buttons"

type optionNum = {
    p_num:number,
    opener:boolean,
    openHandler:Function
}

const MainHeader=(page:pageState):React.JSX.Element=>{
    const Nav_List = NAVBAR_LIST
    const _P = page.currentPage
    const _subP = page.currentSubPage
    const [openPage, setOpenPage] = useState<boolean>(false);
    return <div className="mb-4 flex justify-between">
        {openPage?pageOptionOpener(_P, setOpenPage):null}
        <div className="flex-col">
            <div className="text-2xl font-bold">{Nav_List[_P]}</div>
            <div className="flex flex-row">
                <div className="cursor-pointer">Home</div>&nbsp;/&nbsp;
                <div className={`${NAV_SWITCHER[_P]? "":"font-bold"} cursor-pointer`}>{Nav_List[_P]}</div>
                {NAV_SWITCHER[_P]?
                    <>&nbsp;/&nbsp;<div className="font-bold cursor-pointer">{subPageHandler(_P)[_subP]}</div></>
                :null}
            </div>
        </div>
        {pageOptionHandler(_P)? <OptionButton p_num={_P} opener={openPage} openHandler={setOpenPage}/>:null}
    </div>
}
export default MainHeader

const OptionButton = ({p_num, opener, openHandler}:optionNum):React.JSX.Element =>{
    return <div
    onClick={()=>{(openHandler(!opener))}}
    className="mr-10 px-5 my-1 flex items-center w-44 justify-around bg-zinc-50 cursor-pointer shadow-md hover:bg-blue-300 rounded-lg hover:shadow-none">
    <PlusBtn color="bg-blue-200" size="w-6 h-6" type="" function={()=>{}}/>
    <div className="flex-1 flex justify-center">{pageOptionHandler(p_num)}</div>
</div>
}