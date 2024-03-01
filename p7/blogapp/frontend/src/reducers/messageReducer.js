import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "messages",
    initialState: { message: null, type: "info" },
    reducers: {
        createInfo(state, action) {
            return { message: action.payload, type: "info" };
        },
        createError(state, action) {
            return { message: action.payload, type: "error" };
        },
        removeMessage(state, action) {
            return { message: null, type: "info" };
        },
    },
});

export const { createInfo, createError, removeMessage } = messageSlice.actions;
export default messageSlice.reducer;
