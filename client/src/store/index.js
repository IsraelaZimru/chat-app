import { configureStore } from "@reduxjs/toolkit";
import { ParticipantsSlice } from "./Participants-slice";
import { userSlice } from "./user-slice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        Participants: ParticipantsSlice.reducer
    }
})

export default store;