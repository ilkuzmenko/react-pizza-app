import { FilterSliceState, Sort, SortPropertyEnum } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярністю',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

const counterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      console.log(action.payload);
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'популярністю',
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
      }
    },
  },
});

export const { setSearchValue, setCategoryId, setSort, setCurrentPage, setFilters } =
  counterSlice.actions;

export default counterSlice.reducer;
