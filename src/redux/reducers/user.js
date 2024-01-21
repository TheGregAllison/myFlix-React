import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, token: null },
  reducers: {
    setUser: (state, action) => {
      state.user = {
        ...action.payload.user,
        FavoriteMovies: action.payload.user.FavoriteMovies || [], // Ensure FavoriteMovies is an array
      };
      state.token = action.payload.token;
    },
    updateUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = {
        ...state.user,
        ...user,
        FavoriteMovies: user.FavoriteMovies || state.user.FavoriteMovies || [], // Preserve existing FavoriteMovies
      };
      if (token) {
        state.token = token;
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
