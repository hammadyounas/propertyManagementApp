import { getRequest } from "@/libs/utils/request_handler";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch invoices
export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async ({ search = "", page, limit }) => {
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search.trim());
      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());

      const response = await getRequest(`invoices?${queryParams.toString()}`);
      const invoices = response?.data?.invoices?.filter((inv) => !inv.isDeleted);
      const total = response?.data?.total || 0;

      return { invoices, totalCount: total };
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
