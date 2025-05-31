import { getRequest } from "@/libs/utils/request_handler";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchClientAPI} from "./clientAPI";

// Async thunk to fetch clients
export const fetchClients = createAsyncThunk("clients/fetchClients", async (params, thunkAPI) => {
   try {
       return await fetchClientAPI(params);
     } catch (err) {
       return thunkAPI.rejectWithValue("Failed to fetch acm");
     }
});

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    totalCount: 0,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload.clients;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default clientSlice.reducer;
