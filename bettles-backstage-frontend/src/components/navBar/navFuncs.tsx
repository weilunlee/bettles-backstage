import { CASHFLOW_LIST, HIS_LIST, ORDER_LIST, STACK_LIST } from "./navBarVar"

export function subPageHandler(page:number):string[]{
    switch (page) {
        case 0: return [""]
        case 1: return ORDER_LIST
        case 2: return CASHFLOW_LIST
        case 3: return [""]
        case 4: return STACK_LIST
        case 5: return HIS_LIST
        case 6: return [""]
        default: return [""]
    }
}

export function monthToStr(_m:number):string{
    switch (_m) {
        case 0: return  "一月";
        case 1: return  "二月";
        case 2: return  "三月";
        case 3: return  "四月";
        case 4: return  "五月";
        case 5: return  "六月";
        case 6: return  "七月";
        case 7: return  "八月";
        case 8: return  "九月";
        case 9: return  "十月";
        case 10: return  "十一月";
        case 11: return  "十二月";
        default: return  "六個月以上";
    }
}

export function handleList(_m:number, type:string):Array<string>{
    let _ret:string[] = ["當月"+type]
    for(let i:number=0; i<5; i++){
        _ret.push(monthToStr(_m-1) + type)
        _m--
    }
    _ret.push("其他月份")
    return _ret
}

export function subPage2Month(_page:number):number{
    return new Date().getMonth() - _page
}