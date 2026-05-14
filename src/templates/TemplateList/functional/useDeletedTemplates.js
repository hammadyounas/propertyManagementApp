import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchDeletedTemplates,
  restoreTemplate,
  clearTemplateError,
} from "../../../store/features/templates/templateSlice";
import {
  selectDeletedTemplates,
  selectTemplateLoading,
  selectDeletedTemplatesTotalCount,
  selectTemplateError,
  selectTemplateRestoreSuccess,
} from "../../../store/features/templates/templateSelectors";
import { AppRoutes } from "@/constants/appRoutes";

export default function useDeletedTemplates() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux state
  const deletedTemplates = useSelector(selectDeletedTemplates);
  const loading = useSelector(selectTemplateLoading);
  const totalCount = useSelector(selectDeletedTemplatesTotalCount);
  const error = useSelector(selectTemplateError);
  const restoreSuccess = useSelector(selectTemplateRestoreSuccess);

  // Local state
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Fetch deleted templates on component mount
  useEffect(() => {
    dispatch(
      fetchDeletedTemplates({
        page: currentPage,
        limit: pageSize,
        search: globalFilter,
      })
    );
  }, [dispatch, currentPage, pageSize, globalFilter]);

  // Handle success/error states
  useEffect(() => {
    if (restoreSuccess) {
      // toast.success("Template restored successfully!");
      dispatch(clearTemplateError());
      // Refresh deleted templates list
      dispatch(
        fetchDeletedTemplates({
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
      dispatch(clearTemplateError());
    }
  }, [error, dispatch]);

  // Modal handlers
  const closeRestoreModal = () => {
    setShowRestoreModal(false);
    setCurrentItem(null);
  };

  const openRestoreModal = (templateId) => {
    setCurrentItem(templateId);
    setShowRestoreModal(true);
  };

  const handleRestore = async ({ templateId } = {}) => {
    try {
      setRestoreLoading(true);
      const targetId = templateId ?? currentItem;

      await dispatch(restoreTemplate(targetId)).unwrap();

      closeRestoreModal();
      toast.success("Template restored successfully.");

      // Refresh deleted templates list
      dispatch(
        fetchDeletedTemplates({
          page: currentPage,
          limit: pageSize,
          search: globalFilter,
        })
      );
    } catch (error) {
      console.error("Error restoring template:", error);
      toast.error("Error restoring template!");
    } finally {
      setRestoreLoading(false);
    }
  };

  const handleBack = () => {
    router.push(AppRoutes.TEMPLATES);
  };

  // Pagination logic
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage + 1); // Convert from 0-based to 1-based
  };

  return {
    deletedTemplates,
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
