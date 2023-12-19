import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { CustomerState, OrderState } from "./storeInterface";
import { CustomerInterface } from "../actions/apiInterface";

const initialState:CustomerState = {
    customerList:[]
}

export const customersSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        FETCH_CUTOMERS: (state, action:PayloadAction<CustomerInterface[]>) => {
            state.customerList = action.payload
        },
        CLEAR_CUSTOMERS: (state) => {
            state.customerList = []
        },
    }
})

export const {
    FETCH_CUTOMERS,
    CLEAR_CUSTOMERS
} = customersSlice.actions

export const selectOrder = (state: RootState) => state.orders

export default customersSlice.reducer