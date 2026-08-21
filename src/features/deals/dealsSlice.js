import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { filterDeals, getDeals, paginateDeals, searchDeals, sortDeals } from '@/services/dealService';

export const fetchDeals = createAsyncThunk('deals/fetchDeals', async (_, { rejectWithValue }) => {
  try {
    const data = await getDeals();
    return data;
  } catch (error) {
    return rejectWithValue(error.message || 'Something went wrong.');
  }
});

export const fetchSearchedDeals = createAsyncThunk('deals/fetchSearchedDeals', async (query, { rejectWithValue }) => {
  try {
    const data = await searchDeals(query);
    return data;
  } catch (error) {
    return rejectWithValue(error.message || 'Search failed.');
  }
});

const initialState = {
  data: [],
  loading: false,
  error: null,
  filters: {
    minRoi: 0,
    risk: '',
    industry: '',
    status: '',
    maxInvestment: 100,
  },
  search: '',
  sort: 'roi-desc',
  page: 1,
  pageSize: 10,
  selectedDeal: null,
};

const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
      state.page = 1;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    clearFilters: (state) => {
      state.filters = { minRoi: 0, risk: '', industry: '', status: '', maxInvestment: 100 };
      state.search = '';
      state.sort = 'roi-desc';
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSelectedDeal: (state, action) => {
      state.selectedDeal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong.';
      })
      .addCase(fetchSearchedDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchedDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSearchedDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong.';
      });
  },
});

export const {
  setSearch,
  setSort,
  setFilters,
  clearFilters,
  setPage,
  setSelectedDeal,
} = dealsSlice.actions;

const selectDealsState = (state) => state.deals;

export const selectVisibleDeals = createSelector([selectDealsState], ({ data, search, filters, sort }) => {
  const filteredSearch = search.trim().toLowerCase();
  let nextData = data;

  if (filteredSearch) {
    nextData = nextData.filter((deal) =>
      [deal.companyName, deal.industry, deal.location].some((field) =>
        String(field).toLowerCase().includes(filteredSearch),
      ),
    );
  }

  nextData = filterDeals(nextData, filters);
  nextData = sortDeals(nextData, sort);

  return nextData;
});

export const selectPaginatedDeals = createSelector([selectVisibleDeals, selectDealsState], (visibleDeals, { page, pageSize }) => {
  return paginateDeals(visibleDeals, page, pageSize);
});

export default dealsSlice.reducer;
