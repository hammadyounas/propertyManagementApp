import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../libs/utils/request_handler";

// Thunk to fetch all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await getRequest("users");
  return response.data;
});

// Thunk to fetch a single user by ID
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id) => {
    const response = await getRequest(`user/${id}`);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.filter((user) => !user.isDeleted);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch single user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
