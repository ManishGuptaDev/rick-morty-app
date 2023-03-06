import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import wishlistReducer from './wishlistSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: wishlistReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
