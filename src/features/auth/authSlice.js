import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null, 
  token: null,
  refreshToken:null, 
};
  

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    login(state, action){
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state){
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    }
  }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;