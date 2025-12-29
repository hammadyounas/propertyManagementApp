import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardEntries,
  setStatusFilter,
  setSelectedBroker,
  setGlobalFilter,
  setCurrentPage,
  handleOpenCommentModal,
  handleCloseModal,
  fetchBrokers,
} from "../../../../store/features/dashboard/dashboardSlice";

const useDashboard = () => {
  const pageSize = 10;
  const { push } = useRouter();
  const dispatch = useDispatch();

  const {
    dashboardEntries,
    totalEntries,
    brokerOptions,
    selectedBroker,
    statusFilter,
    globalFilter,
    currentPage,
    loading,
    isModalOpen,
    selectedComment,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(
      fetchDashboardEntries({
        currentPage,
        statusFilter,
        selectedBroker,
        globalFilter,
        pageSize,
      })
    );
  }, [dispatch, currentPage, statusFilter, selectedBroker, globalFilter]);

  useEffect(() => {
    dispatch(fetchBrokers());
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page + 1)); // For 1-based page indexing
  };

  const setSelectedFilter = (filter) => {
    dispatch(setStatusFilter(filter)); // Dispatch Redux action to update status filter
  };

  return {
    globalFilter,
    setGlobalFilter: (value) => dispatch(setGlobalFilter(value)),
    dashboardEntries,
    pageSize,
    handlePageChange,
    currentPage,
    push,
    loading,
    statusFilter,
    setStatusFilter: (value) => dispatch(setStatusFilter(value)),
    totalEntries,
    handleOpenCommentModal: (comment) =>
      dispatch(handleOpenCommentModal(comment)),
    handleCloseModal: () => dispatch(handleCloseModal()),
    selectedComment,
    isModalOpen,
    brokerOptions,
    selectedBroker,
    setSelectedFilter,
    setSelectedBroker: (value) => dispatch(setSelectedBroker(value)),
  };
};

export default useDashboard;
