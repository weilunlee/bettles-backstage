import GLOBAL_PIC from "../../globalAttr/globalPic"
import GLOBAL_VAR from "../../globalAttr/globalVar"

type AppProps = {
    account:{
        accName:string,
    }
}

const BeetleHeader=({account}:AppProps):JSX.Element=>{
    const _alert_arr:Array<string> = [GLOBAL_PIC.BELL, GLOBAL_PIC.MESSAGE]

    return(<div className="flex-none h-14 bg-zinc-50 shadow-md z-50 flex flex-row items-center">
        <div className="flex-1 pl-4 flex flex-row items-center">
            <img src={GLOBAL_PIC.MAIN_ICON} className="w-8 h-8" alt="brand icon" />
            <div className="text-2xl font-bold pl-3">{GLOBAL_VAR.BRAND_NAME}</div>
        </div>
        <div className="flex-1">
            <input className="w-64 border border-amber-950 rounded pl-1" placeholder="search"/>
        </div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1 flex flex-row text-xl">
            <div className="flex flex-none w-32 flex-row justify-around">
                {_alert_arr.map(res=><div className="rounded-md hover:bg-blue-200 cursor-pointer" key={res}>
                    <img src={res} className="w-10 h-10 p-1" alt="order" />
                </div>)}
            </div>
            <div className="flex flex-1 flex-row justify-center">
                <img src={GLOBAL_PIC.USER} className="w-10 h-10 p-1 mr-3" alt="profile" />
                <div className="flex items-center">{account.accName}</div>
            </div>
        </div>
    </div>)
}
export default BeetleHeader