import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from 'store'
import { emptyWishlist } from './wishlistSlice'

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
    login(state, payload) {
      state.isLoggedIn = true
      state.user.userName = payload.payload || 'Guest'
      state.isLoginFormOpen = false
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

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.logout())
    dispatch(emptyWishlist())
  }
}

export const { login, showLoginForm, closeLoginForm } = authSlice.actions

export default authSlice.reducer
