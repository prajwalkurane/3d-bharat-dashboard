import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getInvestorById, getInvestors } from '@/services/investorService';

export const fetchInvestors = createAsyncThunk('investors/fetchInvestors', async (_, { rejectWithValue }) => {
  try {
    return await getInvestors();
  } catch (error) {
    return rejectWithValue(error.message || 'Something went wrong.');
  }
});

export const fetchInvestorById = createAsyncThunk('investors/fetchInvestorById', async (id, { rejectWithValue }) => {
  try {
    return await getInvestorById(id);
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to load investor profile.');
  }
});

const initialState = {
  list: [],
  selectedInvestor: null,
  loading: false,
  error: null,
};

const investorsSlice = createSlice({
  name: 'investors',
  initialState,
  reducers: {
    setSelectedInvestor: (state, action) => {
      state.selectedInvestor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvestors.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchInvestors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong.';
      })
      .addCase(fetchInvestorById.fulfilled, (state, action) => {
        state.selectedInvestor = action.payload;
      });
  },
});

export const { setSelectedInvestor } = investorsSlice.actions;
export default investorsSlice.reducer;
