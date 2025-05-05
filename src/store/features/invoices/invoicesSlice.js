import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInvoicesAPI } from "./invoiceAPI";

// Thunk to fetch invoices
export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async (params, thunkAPI) => {
    try {
      return await fetchInvoicesAPI(params);
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch invoices");
    }
  }
);

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
    totalCount: 0,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload.invoices;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default invoicesSlice.reducer;
