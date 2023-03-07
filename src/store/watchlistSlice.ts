import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

export interface WatchlistState {
  episodeIds: string[]
}

const initialState: WatchlistState = {
  episodeIds: [],
}

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist(state, payload) {
      const id = payload.payload
      if (!state.episodeIds.includes(id)) {
        state.episodeIds.push(id)
        toast.success('Added to Watchlist')
      }
    },
    removeFromWatchlist(state, payload) {
      const id = payload.payload
      if (state.episodeIds.includes(id)) {
        state.episodeIds = state.episodeIds.filter((episodeId) => episodeId != id)
        toast.success('Removed from Watchlist')
      }
    },
    emptyWatchlist(state) {
      state.episodeIds = []
    }
  },
})

export const { addToWatchlist, removeFromWatchlist, emptyWatchlist } = watchlistSlice.actions

export default watchlistSlice.reducer
