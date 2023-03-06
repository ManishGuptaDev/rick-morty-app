import { createSlice } from '@reduxjs/toolkit'

type User = {
  userName: string
}

export interface AuthState {
  isLoggedIn: boolean
  isLoginFormOpen: boolean
  user: User
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLoginFormOpen: false,
  user: {
    userName: '',
  },
}

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
    showLoginForm(state) {
      state.isLoginFormOpen = true
    },
    closeLoginForm(state) {
      state.isLoginFormOpen = false
    },
  },
})

export const { login, logout, showLoginForm, closeLoginForm } = authSlice.actions

export default authSlice.reducer
