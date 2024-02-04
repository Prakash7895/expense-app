import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Category } from '../types';

const initialState: { category: Category[] } = { category: [] };

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category[]>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export const getCategory: (state: RootState) => Category[] = (
  state: RootState
) => state.category.category;

export default categorySlice.reducer;
