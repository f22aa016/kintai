import { createSlice } from "@reduxjs/toolkit";


const initialState = { value: []};

export const kintaiSlice = createSlice({
    name: "kintai",
    initialState,
    reducers: {
        setKintai: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setKintai} = kintaiSlice.actions;
export default kintaiSlice.reducer;