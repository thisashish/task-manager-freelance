import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name : "categories",
    initialState :{
        value : ["cat1","cat2","cat2"]
    },
    reducers :{
        addNewCategory : (state,action) => {
            state.value = [...state.value , action.payload];
        }
    }
})

export const {addNewCategory} = slice.actions
export default slice.reducer;