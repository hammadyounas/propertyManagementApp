import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('user_id');
      localStorage.removeItem('auth_token');
      state.user = null;  
    },  
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
