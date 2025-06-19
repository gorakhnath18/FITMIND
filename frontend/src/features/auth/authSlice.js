import { createSlice } from '@reduxjs/toolkit';

// Check if user info exists in localStorage on initial load
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // This action is dispatched on successful login/registration
    setCredentials(state, action) {
      state.userInfo = action.payload;
      // Save user info to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    // This action is dispatched on logout
    logout(state) {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;