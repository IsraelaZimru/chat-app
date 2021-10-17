import { createSlice } from "@reduxjs/toolkit";

export const ParticipantsSlice = createSlice({
    name: "Participants",
    initialState: {
        users: []
    },
    reducers: {
        addUser(state, action) {
            const userData = action.payload;
            const existingUser = state.users.find(user => user.id === userData.id);

            if (!existingUser) {
                state.users.push(userData)
            }
        },
        removeUser(state, action) {
            const userData = action.payload;
            state.users = state.users.filter(user => user.id !== userData.id)
        }
    }
})

export const ParticipantsActions = ParticipantsSlice.actions;