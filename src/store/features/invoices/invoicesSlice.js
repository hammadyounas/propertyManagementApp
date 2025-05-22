import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInvoicesAPI, updateInvoiceStatusAPI } from "./invoiceAPI";

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

export const updateInvoice = createAsyncThunk(
  "invoices/updateInvoiceStatus",
  async ({ invoiceId, status }, thunkAPI) => {
    try {
      return await updateInvoiceStatusAPI({ invoiceId, status });
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to update invoice status");
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
      })

      // update invoice status
      .addCase(updateInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.invoices.findIndex(
          (inv) => inv._id === action.payload._id
        );
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default invoicesSlice.reducer;
