import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchDeletedDocuments,
  restoreDocument,
  clearDocumentError,
} from "../../../store/features/documents/documentSlice";
import {
  selectDeletedDocuments,
  selectLoading,
  selectDeletedTotalCount,
  selectError,
  selectRestoreSuccess,
} from "../../../store/features/documents/documentSelectors";

export default function useDeletedDocuments() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux state
  const deletedDocuments = useSelector(selectDeletedDocuments);
  const loading = useSelector(selectLoading);
  const totalCount = useSelector(selectDeletedTotalCount);
  const error = useSelector(selectError);
  const restoreSuccess = useSelector(selectRestoreSuccess);

  // Local state
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Fetch deleted documents on component mount
  useEffect(() => {
    dispatch(
      fetchDeletedDocuments({
        page: currentPage,
        limit: pageSize,
        search: globalFilter,
      })
    );
  }, [dispatch, currentPage, pageSize, globalFilter]);

  // Handle success/error states
  useEffect(() => {
    if (restoreSuccess) {
      toast.success("Document restored successfully!");
      dispatch(clearDocumentError());
      // Refresh deleted documents list
      dispatch(
        fetchDeletedDocuments({
          page: currentPage,
          limit: pageSize,
          search: globalFilter,
        })
      );
    }
  }, [restoreSuccess, dispatch, currentPage, pageSize, globalFilter]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearDocumentError());
    }
  }, [error, dispatch]);

  // Modal handlers
  const closeRestoreModal = () => {
    setShowRestoreModal(false);
    setCurrentItem(null);
  };

  const openRestoreModal = (documentId) => {
    setCurrentItem(documentId);
    setShowRestoreModal(true);
  };

  const handleRestore = async ({ documentId } = {}) => {
    try {
      setRestoreLoading(true);
      const targetId = documentId ?? currentItem;

      await dispatch(restoreDocument(targetId)).unwrap();

      closeRestoreModal();
      toast.success("Document restored successfully.");

      // Refresh deleted documents list
      dispatch(
        fetchDeletedDocuments({
          page: currentPage,
          limit: pageSize,
          search: globalFilter,
        })
      );
    } catch (error) {
      console.error("Error restoring document:", error);
      toast.error("Error restoring document!");
    } finally {
      setRestoreLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/documents");
  };

  // Pagination logic
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage + 1); // Convert from 0-based to 1-based
  };

  return {
    deletedDocuments,
    loading,
    globalFilter,
    setGlobalFilter,
    handleRestore,
    handleBack,
    currentItem,
    openRestoreModal,
    closeRestoreModal,
    showRestoreModal,
    restoreLoading,
    // Pagination props
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    handlePageChange,
    router,
  };
}
