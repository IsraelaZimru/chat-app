import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        id: "",
        socketId: "",
        isLogin: false
    },
    reducers: {
        userlogin(state, action) {
            const userData = action.payload;
            state.name = userData.name
            state.id = userData.id
            state.isLogin = true
        },
        userLogout(state) {
            state.name = ""
            state.id = ""
            state.isLogin = false
            state.socketId = ""
        }
    }
})

export const userActions = userSlice.actions;