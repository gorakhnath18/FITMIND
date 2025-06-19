import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    // This makes the auth slice available in our app
    auth: authReducer,
  },
  // Enables Redux DevTools for easier debugging
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;