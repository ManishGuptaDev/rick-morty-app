import { createSlice } from '@reduxjs/toolkit'

export interface WishlistState {
  episodeIds: string[]
}

const initialState: WishlistState = {
  episodeIds: [],
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, payload) {
      const id = payload.payload
      if (!state.episodeIds.includes(id)) {
        state.episodeIds.push(id)
      }
    },
    removeFromWishlist(state, payload) {
      const id = payload.payload
      if (state.episodeIds.includes(id)) {
        state.episodeIds = state.episodeIds.filter((episodeId) => episodeId != id)
      }
    },
    emptyWishlist(state) {
      state.episodeIds = []
    }
  },
})

export const { addToWishlist, removeFromWishlist, emptyWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer
