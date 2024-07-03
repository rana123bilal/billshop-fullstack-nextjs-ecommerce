import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    initialState: {
        currentUser: null,
    },
    name: "user",
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
});

export const { setCurrentUser } = userSlice.actions;