import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ColorScheme, Mode, User } from '../types';
import { RootState } from '.';

const initialState: {
  user: User | null;
  mode: Mode;
  colorScheme: ColorScheme;
} = {
  user: null,
  mode: 'light',
  colorScheme: localStorage.getItem('colorScheme') as ColorScheme,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
    },
    setColorScheme: (state, action: PayloadAction<ColorScheme>) => {
      state.colorScheme = action.payload;
      state.mode =
        action.payload === 'system'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : action.payload;
    },
  },
});

export const { setUser, setColorScheme, setMode } = userSlice.actions;

export const getUser: (state: RootState) => User | null = (state: RootState) =>
  state.user.user;

export const getColorSheme: (state: RootState) => ColorScheme = (
  state: RootState
) => state.user.colorScheme;

export const getMode: (state: RootState) => Mode = (state: RootState) =>
  state.user.mode;

export default userSlice.reducer;
