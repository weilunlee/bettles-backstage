import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { OrderState } from "./storeInterface";
import { OrderInterface } from "../actions/apiInterface";

const initialState:OrderState = {
    orderList:[]
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        FETCH_ORDERS: (state, action:PayloadAction<OrderInterface[]>) => {
            state.orderList = action.payload
        },
        CLEAR_ORDERS: (state) => {
            state.orderList = []
        },
    }
})

export const {
    FETCH_ORDERS,
    CLEAR_ORDERS
} = ordersSlice.actions

export const selectOrder = (state: RootState) => state.orders

export default ordersSlice.reducer