import { OrderInterface } from "../actions/apiInterface"

export interface pageState{
    currentPage:number,
    currentSubPage:number,
    fallPageState:boolean[],
    stackStage:boolean[],
    cashFlowStage:boolean[],
    orderStage:boolean[],
    historyStage:boolean[]
}

export interface OrderState{
    orderList:OrderInterface[]
}