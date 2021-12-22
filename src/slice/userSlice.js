import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { urlApi } from "../const/index";
import userApi from '../api/userApi';
export const login = createAsyncThunk(
'user/login',
async (payload) =>{
//call Api to register 
const data = await userApi.login(payload)
return data
}
)
export const getinforUser = createAsyncThunk('/user/getInfo',async (payload)=>{
const data = await userApi.getInfor(payload)
return data
})
const userSlice = createSlice({
    name:'user',
    initialState:{
        current:{},
        loading:false,
        isLog:false,
        isAdmin:false
    
    }
    ,reducers: {
        addUser(state,action){
            state.user = action.payload
        }

    },
    extraReducers :{
     [login.pending] : (state,action)=>{
        state.loading = true
        state.isLog = false
        state.isAdmin = false
    },
     [login.rejected] : (state,action ) =>{
         state.loading = false
         
     },
     [login.fulfilled] : (state,action) =>{
         state.current = action.payload;
         state.loading=false
         localStorage.setItem('accessToken',action.payload.acessToken)
         state.isLog = true
     },
     [getinforUser.pending] : (state,action) =>{
         state.loading = true
     },
     [getinforUser.rejected] : (state,action )=>{
         state.loading = false
         state.isLog = false

     },
     [getinforUser.fulfilled] : (state,action)=>{
         state.current = action.payload
         state.isLog = true
         state.loading = false
         state.isAdmin = action.payload.user.role === 1 ? true : false
         
     }
    }
   
})
const {reducer,actions} = userSlice;
export default reducer;
export const {addUser} = actions