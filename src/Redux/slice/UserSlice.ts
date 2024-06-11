import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    UserId: null,
    image: null,
    Username: null,
}

export const userAuthSlice = createSlice({
    name: "UserData",
    initialState,
    reducers: {
        loginData: (state, action) => {
            state.isAuthenticated = true;
            state.UserId = action.payload._id;
            state.image = action.payload.avatar;
            state.Username = action.payload.username

        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.UserId = null;
            state.image = null;
            state.Username = null;

        }
    }
})

export const { loginData, logout } = userAuthSlice.actions
