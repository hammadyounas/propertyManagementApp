import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTemplateAPI,
  deleteTemplateAPI,
  fetchAllTemplatesAPI,
  fetchTemplateByIdAPI,
  updateTemplateAPI,
  fetchDeletedTemplatesAPI,
  restoreTemplateAPI,
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

export const fetchDeletedTemplates = createAsyncThunk(
  "templates/fetchDeletedTemplates",
  async (params, thunkAPI) => {
    try {
      return await fetchDeletedTemplatesAPI(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Failed to fetch deleted templates"
      );
    }
  }
);

export const restoreTemplate = createAsyncThunk(
  "templates/restoreTemplate",
  async (id, thunkAPI) => {
    try {
      return await restoreTemplateAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Failed to restore template"
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
    deletedTemplates: [],
    deletedTotalCount: 0,
    restoreSuccess: false,
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
      })

      // fetch deleted templates
      .addCase(fetchDeletedTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeletedTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedTemplates = action.payload.templates;
        state.deletedTotalCount = action.payload.totalCount;
      })
      .addCase(fetchDeletedTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // restore template
      .addCase(restoreTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.restoreSuccess = false;
      })
      .addCase(restoreTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.restoreSuccess = true;
        // Remove from deleted templates list
        state.deletedTemplates = state.deletedTemplates.filter(
          (template) => template._id !== action.payload?._id && template.id !== action.payload?.id
        );
        state.deletedTotalCount = Math.max(0, state.deletedTotalCount - 1);
      })
      .addCase(restoreTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.restoreSuccess = false;
      });
  },
});

export const { clearTemplateError } = templateSlice.actions;
export default templateSlice.reducer;
