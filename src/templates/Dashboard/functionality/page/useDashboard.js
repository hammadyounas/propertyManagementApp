import { useEffect, useState } from "react";
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
  deleteDashboardEntry,
} from "../../../../store/features/dashboard/dashboardSlice";
import { toast } from "react-toastify";

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

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  // Delete handlers
  const openDeleteModal = (entryId) => {
    setCurrentItem(entryId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentItem(null);
  };

  const handleDelete = async ({ entryId } = {}) => {
    try {
      setDeleteLoading(true);
      const targetId = entryId ?? currentItem;

      await dispatch(deleteDashboardEntry(targetId)).unwrap();

      closeDeleteModal();
      toast.success("Dashboard entry deleted successfully.");

      // Refresh dashboard entries list
      dispatch(
        fetchDashboardEntries({
          currentPage,
          statusFilter,
          selectedBroker,
          globalFilter,
          pageSize,
        })
      );
    } catch (error) {
      console.error("Error deleting dashboard entry:", error);
      toast.error(error || "Error deleting dashboard entry!");
    } finally {
      setDeleteLoading(false);
    }
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
    // Delete props
    showDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    currentItem,
    deleteLoading,
  };
};

export default useDashboard;
