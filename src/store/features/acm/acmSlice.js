import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createACMAPI, fetchACMAPI, deleteACMAPI } from "./acmAPI";

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

export const createACM = createAsyncThunk(
  "acm/createACM",
  async (formData, thunkAPI) => {
    try {
      const response = await createACMAPI(formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "An error occurred while creating ACM."
      );
    }
  }
)

export const deleteACM = createAsyncThunk(
  "acm/deleteACM",
  async (acmId, thunkAPI) => {
    try {
      const response = await deleteACMAPI(acmId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "An error occurred while deleting ACM."
      );
    }
  }
)

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
    createSuccess: false,
  },
  reducers: {
    clearACMCreateStatus: (state) => {
      state.createSuccess = false;
      state.error = null;
    },
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

            // Create ACM
      .addCase(createACM.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createACM.fulfilled, (state) => {
        state.loading = false;
        state.createSuccess = true;
      })
      .addCase(createACM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create ACM";
      })

      // Delete ACM
      .addCase(deleteACM.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteACM.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteACM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete ACM";
      });

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

export const { clearACMCreateStatus} = acmSlice.actions;
export default acmSlice.reducer;
