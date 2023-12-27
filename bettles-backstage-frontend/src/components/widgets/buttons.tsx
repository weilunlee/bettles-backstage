interface btnIF{
    size:string,
    function:Function
}
interface btnBaseIF extends btnIF{
    color:string
    type:string
}

export const DeleteBtn =(props:btnIF):React.JSX.Element=>{
    return <ButtonBase type="刪除" size={props.size} color="bg-red-300" function={props.function}/>
}

export const ConfirmBtn =(props:btnIF):React.JSX.Element=>{
    return <ButtonBase type="確認" size={props.size} color="bg-blue-300" function={props.function}/>
}

const ButtonBase =(props:btnBaseIF):React.JSX.Element=>{
    let _size = props.size
    let _c = props.color
    return <div onClick={()=>{props.function()}}
        className={`${_size} ${_c} flex justify-center items-center cursor-pointer rounded-md mx-3 shadow`}>
        {props.type}
    </div>
}

interface XbtnIF{
    css?:string,
    func?:Function
}

export const PlusBtn =({css="w-6 h-6", func}:XbtnIF):React.JSX.Element=>{
    // active:shadow-inner active:bg-blue-500"
    //
    function passFuncFilter(){
        if(func) func()             // 排除 func = undefiend 的情況
    }
    return <div onClick={passFuncFilter}
        className={`${css} relative rounded-full flex justify-center items-center cursor-pointer shadow `}>
        <div className="w-3 absolute border border-white"></div>
        <div className="h-3 absolute border border-white"></div>
    </div>
}

export const CloseXBtn=({css, func}:XbtnIF):React.JSX.Element=>{
    function passFuncFilter(){
        if(func) func()             // 排除 func = undefiend 的情況
    }
    return <div onClick={passFuncFilter}
        className={css+" relative flex justify-center items-center flex-none cursor-pointer"}>
        <div className="w-3 absolute border rotate-45 border-zinc-700"></div>
        <div className="h-3 absolute border rotate-45 border-zinc-700"></div>
    </div>
}
