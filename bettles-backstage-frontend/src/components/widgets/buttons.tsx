interface btnIF{
    size:string,
    function:Function
}

interface btnBaseIF extends btnIF{
    color:string
    type:string
}

export const DeleteBtn =(props:btnIF):JSX.Element=>{
    return <ButtonBase type="刪除" size={props.size} color="bg-red-300" function={props.function}/>
}

export const ConfirmBtn =(props:btnIF):JSX.Element=>{
    return <ButtonBase type="確認" size={props.size} color="bg-blue-300" function={props.function}/>
}

const ButtonBase =(props:btnBaseIF):JSX.Element=>{
    let _size = props.size
    let _c = props.color
    return <div onClick={()=>{props.function()}}
        className={`${_size} ${_c} flex justify-center items-center cursor-pointer rounded-md mx-3 shadow`}>
        {props.type}
    </div>
}