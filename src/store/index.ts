import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import watchlistReducer from './watchlistSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    watchlist: watchlistReducer,
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
