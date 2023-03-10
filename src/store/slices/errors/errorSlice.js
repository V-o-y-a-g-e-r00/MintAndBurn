import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: "errors",
    initialState: {
        showError: true,
        message: 'error message'
    },
    reducers: {
        closeError: (state) => {
            state.showError = false;
            state.message = '';
        },
        setError: (state, action) => {
            state.showError = action.payload.showError;
            state.message = action.payload.message;            
        },
    }
});

export const { closeError, setError } = errorSlice.actions;

export default errorSlice;