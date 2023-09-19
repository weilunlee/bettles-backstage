import OrderCreater from "../order/createOrder"

export function pageOptionHandler(page:number):boolean|string{
    switch (page) {
        case 0: return false
        case 1: return "新增訂單"
        case 2: return "新增金額"
        case 3: return false
        case 4: return "新增庫存"
        case 5: return "新增紀錄"
        case 6: return false
        default: return false
    }
}

export function pageOptionOpener(page:number, openHandler:Function):JSX.Element{
    switch (page) {
        case 0: return <></>
        case 1: return <OrderCreater openHandler={openHandler}/>
        case 2: return <></>
        case 3: return <></>
        case 4: return <></>
        case 5: return <></>
        case 6: return <></>
        default: return <></>
    }
}