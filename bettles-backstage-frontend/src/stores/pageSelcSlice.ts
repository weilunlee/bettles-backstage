import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { pageState } from "./storeInterface";

interface currenPage{
    currentPage:number,
    currentSubPage:number,
}

interface pageTrans{
    currentPage:number,
}

const initialState:pageState = {
    currentPage:0,
    currentSubPage:0,
    fallPageState:[true, false, false, false, false, false, false],
    stackStage:[false, false, false, false, false, false, false],
    cashFlowStage:[false, false, false, false, false, false, false],
    orderStage:[false, false, false, false, false, false, false],
    historyStage:[false, false, false, false, false, false, false]
}

export const pageSelcSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        PAGE_SELECTED: (state, action:PayloadAction<currenPage>) => {
            state.currentPage = action.payload.currentPage
            state.currentSubPage = action.payload.currentSubPage
        },
        FULL_PAGESTATE_UPDATE: (state, action:PayloadAction<pageTrans>) => {
            state.currentPage = action.payload.currentPage
            state.fallPageState[action.payload.currentPage] = !state.fallPageState[action.payload.currentPage]
        }
    }
})

export const {
    FULL_PAGESTATE_UPDATE,
    PAGE_SELECTED
} = pageSelcSlice.actions

export const selectPage = (state: RootState) => state.page

export default pageSelcSlice.reducer