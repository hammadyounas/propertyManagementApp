import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchACMAPI, updateACMDataAPI } from "./invoiceAPI";
import { fetchACMAPI } from "./acmAPI";

// Thunk to fetch acm
export const fetchACM = createAsyncThunk(
  "acm/fetchACM",
  async (params, thunkAPI) => {
    try {
      return await fetchACMAPI(params);
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch acm");
    }
  }
);

// export const updateInvoice = createAsyncThunk(
//   "acm/updateacmtatus",
//   async ({ invoiceId, status }, thunkAPI) => {
//     try {
//       return await updateacmtatusAPI({ invoiceId, status });
//     } catch (err) {
//       return thunkAPI.rejectWithValue("Failed to update invoice status");
//     }
//   }
// );

const acmSlice = createSlice({
  name: "acm",
  initialState: {
    acm: [],
    totalCount: 0,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchACM.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchACM.fulfilled, (state, action) => {
        state.loading = false;
        state.acm = action.payload.acm;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchACM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // update invoice status
    //   .addCase(updateInvoice.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(updateInvoice.fulfilled, (state, action) => {
    //     state.loading = false;
    //     const index = state.acm.findIndex(
    //       (inv) => inv._id === action.payload._id
    //     );
    //     if (index !== -1) {
    //       state.acm[index] = action.payload;
    //     }
    //   })
    //   .addCase(updateInvoice.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload || "Something went wrong";
    //   });
  },
});

export default acmSlice.reducer;
