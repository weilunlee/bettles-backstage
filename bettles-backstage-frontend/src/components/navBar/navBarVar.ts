import { handleList } from "./navFuncs"

export const NAVBAR_LIST:string[] = ["首頁", "訂單", "現金流", "顧客", "存貨", "歷史紀錄", "其他"]
export const ORDER_LIST:string[] = handleList(new Date().getMonth(), "訂單")
export const CASHFLOW_LIST:string[] = handleList(new Date().getMonth(), "損益")
export const STACK_LIST:string[] = handleList(new Date().getMonth(), "存貨")
export const HIS_LIST:string[] = handleList(new Date().getMonth(), "紀錄")
export const NAV_SWITCHER:boolean[] = [false, true, true, false, true, true, false]
