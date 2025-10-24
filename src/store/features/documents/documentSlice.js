import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createDocumentAPI,
  deleteDocumentAPI,
  fetchDocumentByIdAPI,
  fetchDocumentsAPI,
  sendEmailWithDocumentAPI,
  updateDocumentAPI,
  uploadPdfToCloudinaryAPI,
} from "./documentAPI";

export const fetchDocuments = createAsyncThunk(
  "documents/fetchDocuments",
  async (params, thunkAPI) => {
    try {
      return await fetchDocumentsAPI(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Failed to fetch documents"
      );
    }
  }
);

export const fetchDocumentById = createAsyncThunk(
  "documents/fetchDocumentById",
  async (id, thunkAPI) => {
    try {
      return await fetchDocumentByIdAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Failed to fetch document by ID"
      );
    }
  }
);

export const createDocument = createAsyncThunk(
  "documents/createDocument",
  async (data, thunkAPI) => {
    try {
      return await createDocumentAPI(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Failed to create document"
      );
    }
  }
);

export const updateDocument = createAsyncThunk(
  "documents/updateDocument",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateDocumentAPI(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message || "Failed to update document");
    }
  }
);

export const deleteDocument = createAsyncThunk(
  "documents/deleteDocument",
  async (id, thunkAPI) => {
    try {
      return await deleteDocumentAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Failed to delete document"
      );
    }
  }
);

export const uploadPdfToCloudinary = createAsyncThunk(
  "documents/uploadPdfToCloudinary",
  async ({ id, file }, thunkAPI) => {
    try {
      return await uploadPdfToCloudinaryAPI(id, file);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Failed to upload PDF to Cloudinary"
      );
    }
  }
);

export const sendEmailWithDocument = createAsyncThunk(
  "documents/sendEmailWithDocument",
  async ({id, email}, thunkAPI) => {
    try {
      return await sendEmailWithDocumentAPI(id, email);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Failed to send email with document"
      );
    }
  }
);

const documentSlice = createSlice({
  name: "documents",
  initialState: {
    documents: [],
    document: null,
    totalCount: 0,
    loading: false,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  },
  reducers: {
    clearDocumentError: (state) => {
      state.createSuccess = false;
      state.updateSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    // fetch all documents
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload.documents;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch document by id
      .addCase(fetchDocumentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocumentById.fulfilled, (state, action) => {
        state.loading = false;
        state.document = action.payload;
      })
      .addCase(fetchDocumentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create document
      .addCase(createDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createDocument.fulfilled, (state) => {
        state.loading = false;
        state.createSuccess = true;
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update document
      .addCase(updateDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.updateSuccess = true;
        state.document = action.payload;
        // Update the document in the documents array if it exists
        const index = state.documents.findIndex(
          (doc) => doc._id === action.payload._id || doc.id === action.payload.id
        );
        if (index !== -1) {
          state.documents[index] = action.payload;
        }
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.updateSuccess = false;
      })

      // delete document
      .addCase(deleteDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = state.documents.filter(
          (doc) => doc._id !== action.payload
        );
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // upload PDF to Cloudinary
      .addCase(uploadPdfToCloudinary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadPdfToCloudinary.fulfilled, (state, action) => {
        state.loading = false;
        state.document = action.payload;
      })
      .addCase(uploadPdfToCloudinary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // send email with document
      .addCase(sendEmailWithDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendEmailWithDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.document = action.payload;
      })
      .addCase(sendEmailWithDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDocumentError } = documentSlice.actions;
export default documentSlice.reducer;
