"use client";
import {createSlice} from "@reduxjs/toolkit"
const userSlice = createSlice({
    name:"User",
    initialState:{
        user:{},
        token:null,
        loginState:false
        
    },
    reducers:{
        addUser(state = initialState,action){

            //state.push(action.payload)
            return { ...state, user: action.payload };

        },
        setToken(state = initialState,action){
            return{...state,token:action.payload}
        },
        setLoginState(state = initialState,action){
            return { ...state, loginState:true };
        }
    }
})

export const {addUser,setToken, setLoginState} =userSlice.actions;
export default userSlice.reducer;