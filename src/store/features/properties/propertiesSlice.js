import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deletePropertyAPI, fetchPropertiesAPI } from "./propertiesAPI";

export const fetchProperties = createAsyncThunk(
    "properties/fetchProperties",
    async (params, thunkAPI) => {
        try {
            return await fetchPropertiesAPI(params)
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch Properties", error.response.data);   
        }
    }
)

export const deleteProperty = createAsyncThunk(
    "properties/deleteProperty",
    async (id, thunkAPI) => {
        try {
            return await deletePropertyAPI(id); // returns the ID
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to delete property");
        }
    }
);


const propertiesSlice = createSlice({
    name: "properties",
    initialState: {
        properties: [],
        totalCount: 0,
        loading: false,
        error: null,
        search: "",
        page: 1,
        limit: 10,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProperties.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.properties = action.payload.properties;
                state.totalCount = action.payload.totalCount;
            })
            .addCase(fetchProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error || "Failed to fetch properties";
            })

            // delete property
            .addCase(deleteProperty.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProperty.fulfilled, (state, action) => {
                state.loading = false;
                state.properties = state.properties.filter(p => p._id !== action.payload);
            })
            .addCase(deleteProperty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
            
              
    },
})

export default propertiesSlice.reducer;