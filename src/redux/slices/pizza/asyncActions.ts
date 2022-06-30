import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { SearchPizzaParams } from './slice';
import { Pizza } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { currentPage, sortBy, order, category, search } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://62a8a212943591102ba6fdb1.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);
