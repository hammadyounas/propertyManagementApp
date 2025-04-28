import { getRequest } from "@/libs/utils/request_handler";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch clients
export const fetchClients = createAsyncThunk("clients/fetchClients", async () => {
  const response = await getRequest("clients");
  return response.data;
});

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
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
        state.clients = action.payload.filter(client => !client.isDeleted);
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default clientSlice.reducer;
