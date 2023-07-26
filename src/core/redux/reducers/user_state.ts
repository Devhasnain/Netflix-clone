import { createSlice } from '@reduxjs/toolkit';

export interface InitialState {
    user: any | null
}

const initialState: InitialState = {
    user: null
}

const User_State = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload
        },
        logout:(state)=>{
            state.user=null
        }
    }
});

export const { setUserData,logout } = User_State.actions;

export default User_State.reducer;