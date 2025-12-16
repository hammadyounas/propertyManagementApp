import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, deleteRequest } from "@/libs/utils/request_handler";

// Async thunk to fetch dashboard entries
export const fetchDashboardEntries = createAsyncThunk(
  "dashboard/fetchEntries",
  async ({
    currentPage,
    statusFilter,
    selectedBroker,
    globalFilter,
    pageSize,
  }) => {
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage);
      params.append("limit", pageSize);

      // Apply selected broker filter if selected
      if (selectedBroker && selectedBroker.value !== "all") {
        params.append("search", selectedBroker.value); // Backend should handle ?broker=name
      }

      // Apply the status filter
      if (["pending", "submitted", "paid"].includes(statusFilter)) {
        params.append("invoice", statusFilter);
      }

      let url = `dashboard`;
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await getRequest(url);
      return response.data; // Return the response data for Redux to store
    } catch (error) {
      throw new Error("Error fetching dashboard entries:", error); // Handle errors
    }
  }
);

export const fetchDashboardEntriesById = createAsyncThunk(
  "dashboard/fetchEntriesById",
  async (id) => {
    try {
      const response = await getRequest(`dashboard/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching dashboard entry by ID:", error);
    }
  }
);

export const fetchBrokers = createAsyncThunk(
  "dashboard/fetchBrokers",
  async () => {
    const response = await getRequest("users"); // <- Make sure this endpoint returns [{ name, _id }]
    const filteredBrokers = response.data.filter((user) => !user.isDeleted);
    return [
      { label: "All", value: "all" },
      ...filteredBrokers.map((user) => ({
        label: user.name,
        value: user.name,
      })),
    ];
  }
);

export const deleteDashboardEntry = createAsyncThunk(
  "dashboard/deleteEntry",
  async (id) => {
    try {
      const response = await deleteRequest(`dashboard/${id}`);
      return { id, data: response.data };
    } catch (error) {
      throw new Error("Error deleting dashboard entry:", error);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboardEntries: [],
    totalEntries: 0,
    brokerOptions: [{ label: "All", value: "all" }],
    loading: false,
    statusFilter: "",
    selectedBroker: null,
    globalFilter: "",
    currentPage: 1,
    isModalOpen: false,
    selectedComment: "",
  },
  reducers: {
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setSelectedBroker: (state, action) => {
      state.selectedBroker = action.payload;
    },
    setGlobalFilter: (state, action) => {
      state.globalFilter = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    handleOpenCommentModal: (state, action) => {
      state.selectedComment = action.payload;
      state.isModalOpen = true;
    },
    handleCloseModal: (state) => {
      state.isModalOpen = false;
    },  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardEntries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardEntries.fulfilled, (state, action) => {
        const { data, createdByNames, totalCount } = action.payload;

        // if (state.brokerOptions.length <= 1) {
        //   const uniqueBrokerOptions =
        //     createdByNames?.map((name) => ({
        //       label: name,
        //       value: name,
        //     })) || [];

        //   state.brokerOptions = [
        //     { label: "All", value: "all" },
        //     ...uniqueBrokerOptions,
        //   ];
        // }

        state.dashboardEntries =
          data?.filter((entry) => !entry.isDeleted) || [];
        state.totalEntries = totalCount || 0;
        state.loading = false;
      })

      .addCase(fetchDashboardEntries.rejected, (state) => {
        state.loading = false;
      })

      // Fetch single dashboard by ID
      .addCase(fetchDashboardEntriesById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardEntriesById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchDashboardEntriesById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchBrokers.fulfilled, (state, action) => {
        state.brokerOptions = action.payload;
      })

      .addCase(deleteDashboardEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDashboardEntry.fulfilled, (state, action) => {
        state.dashboardEntries = state.dashboardEntries.filter(
          (entry) => entry._id !== action.payload.id
        );
        state.totalEntries = Math.max(0, state.totalEntries - 1);
        state.loading = false;
      })
      .addCase(deleteDashboardEntry.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setStatusFilter,
  setSelectedBroker,
  setGlobalFilter,
  setCurrentPage,
  handleOpenCommentModal,
  handleCloseModal,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
