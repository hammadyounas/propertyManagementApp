import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTemplateAPI,
  deleteTemplateAPI,
  fetchAllTemplatesAPI,
  fetchTemplateByIdAPI,
  updateTemplateAPI,
} from "./templateAPI";

export const fetchTemplate = createAsyncThunk(
  "templates/fetchTemplate",
  async (params, thunkAPI) => {
    try {
      return await fetchAllTemplatesAPI(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "An error occurred while fetching template"
      );
    }
  }
);

export const createTemplate = createAsyncThunk(
  "templates/createTemplate",
  async (data, thunkAPI) => {
    try {
      return await createTemplateAPI(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "An error occurred while creating template"
      );
    }
  }
);

export const fetchTemplateById = createAsyncThunk(
  "templates/fetchTemplateById",
  async (id, thunkAPI) => {
    try {
      return await fetchTemplateByIdAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "An error occurred while fetching template by id"
      );
    }
  }
);

export const updateTemplate = createAsyncThunk(
  "templates/updateTemplate",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateTemplateAPI(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "An error occurred while updating template"
      );
    }
  }
);

export const deleteTemplate = createAsyncThunk(
  "templates/deleteTemplate",
  async (id, thunkAPI) => {
    try {
      return await deleteTemplateAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "An error occurred while deleting template"
      );
    }
  }
);

const templateSlice = createSlice({
  name: "templates",
  initialState: {
    templates: [],
    template: null,
    totalCount: 0,
    loading: false,
    error: null,
    createSuccess: false,
  },

  reducers: {
    clearTemplateError: (state) => {
      state.createSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all templates
      .addCase(fetchTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload.templates;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // create template
      .addCase(createTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createTemplate.fulfilled, (state) => {
        state.loading = false;
        state.createSuccess = true;
      })
      .addCase(createTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // fetch template by id
      .addCase(fetchTemplateById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplateById.fulfilled, (state, action) => {
        state.loading = false;
        state.template = action.payload;
      })
      .addCase(fetchTemplateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // update template
      .addCase(updateTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.template = action.payload;
        })
      .addCase(updateTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // delete template
      .addCase(deleteTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = state.templates.filter(
          (template) => template._id !== action.payload
        );
      })
      .addCase(deleteTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearTemplateError } = templateSlice.actions;
export default templateSlice.reducer;
