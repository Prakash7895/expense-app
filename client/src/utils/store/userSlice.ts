import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types';
import { RootState } from '.';

const initialState: { user: User | null } = { user: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const getUser: (state: RootState) => User | null = (state: RootState) =>
  state.user.user;

export default userSlice.reducer;
