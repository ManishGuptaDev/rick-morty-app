import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

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
        toast.success('Added to Wishlist')
      }
    },
    removeFromWishlist(state, payload) {
      const id = payload.payload
      if (state.episodeIds.includes(id)) {
        state.episodeIds = state.episodeIds.filter((episodeId) => episodeId != id)
        toast.success('Removed from Wishlist')
      }
    },
    emptyWishlist(state) {
      state.episodeIds = []
    }
  },
})

export const { addToWishlist, removeFromWishlist, emptyWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer
