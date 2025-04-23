import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest, patchRequest } from "../../../libs/utils/request_handler";

export const fetchMeetings = createAsyncThunk("meetings/fetchMeetings", async (startDate) => {
    const response = await getRequest(`meetings?startDate=${startDate}`);
    return response.data.filter((meeting) => !meeting.isDeleted);
})

export const createMeeting = createAsyncThunk("meetings/createMeeting", async (data, { rejectWithValue }) => {
    try {
      const response = await postRequest("meetings", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  });
  
  export const updateMeeting = createAsyncThunk("meetings/updateMeeting", async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await patchRequest(`meetings/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  });  

const meetingsSlice = createSlice({
    name: "meetings",
    initialState: {
        meetings: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetMeetingsState: (state) => {
            state.meetings = [];
            state.loading = false;
            state.error = null;
        },
        clearError: (state) => {
          state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchMeetings.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchMeetings.fulfilled, (state, action) => {
            state.meetings = action.payload;
            state.loading = false;
          })
          .addCase(fetchMeetings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
    
          .addCase(createMeeting.fulfilled, (state, action) => {
            state.meetings.push(action.payload);
          })

          .addCase(createMeeting.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
          })
    
          .addCase(updateMeeting.fulfilled, (state, action) => {
            const index = state.meetings.findIndex((m) => m._id === action.payload._id);
            if (index !== -1) {
              state.meetings[index] = action.payload;
            }
          })

          .addCase(updateMeeting.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
          });
      },
    });
    
    export const { resetMeetingsState, clearError } = meetingsSlice.actions;
    export default meetingsSlice.reducer;