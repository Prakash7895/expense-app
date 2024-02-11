import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ColorScheme, Mode } from '../types';
import { RootState } from '.';

const initialState: {
  mode: Mode;
  colorScheme: ColorScheme;
  showSidebar: boolean;
} = {
  mode: 'light',
  colorScheme: localStorage.getItem('colorScheme') as ColorScheme,
  showSidebar: false,
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
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
    setShowSidebar: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { setColorScheme, setMode, setShowSidebar } = settingSlice.actions;

export const getSettings: (state: RootState) => typeof initialState = (
  state: RootState
) => state.setting;

export default settingSlice.reducer;
