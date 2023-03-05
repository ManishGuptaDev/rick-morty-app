import { createSlice } from '@reduxjs/toolkit'

type User = {
  userName: string
}

export interface AuthState {
  isLoggedIn: boolean;
  user : User
}

const initialState: AuthState = {
  isLoggedIn: true,
  user: {
    userName : ''
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
