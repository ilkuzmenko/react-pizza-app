import { createSlice } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';
import { pizzaSliceState, Status } from './types';

const initialState: pizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export type SearchPizzaParams = {
  sortBy: string;
  currentPage: string;
  order: string;
  category: string;
  search: string;
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
