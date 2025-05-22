import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  fetchProperties,
  deleteProperty,
} from "../../../../store/features/properties/propertiesSlice";
import {
  selectProperties,
  selectPropertiesTotalCount,
  selectPropertiesLoading,
} from "../../../../store/features/properties/propertiesSelectors";
import { useDispatch, useSelector } from "react-redux";

const useProperty = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModal, setActiveModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const dispatch = useDispatch();
  const properties = useSelector(selectProperties);
  const loading = useSelector(selectPropertiesLoading);
  const totalCount = useSelector(selectPropertiesTotalCount);
  const pageSize = 10;
  const { push } = useRouter();
  const [statusFilter, setStatusFilter] = useState("");

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentItem(null);
  };

  const openDeleteModal = (id) => {
    setCurrentItem(id);
    setShowDeleteModal(!showDeleteModal);
  };

  const closeModal = () => {
    setActiveModal(false);
  };

  const openModal = () => {
    setActiveModal(!activeModal);
  };

  //   call the fetch properties function
  useEffect(() => {
    dispatch(
      fetchProperties({
        search: globalFilter,
        page: currentPage,
        limit: pageSize,
        statusFilter,
      })
    );
  }, [dispatch, globalFilter, currentPage, statusFilter]);

  //   reset the page to 1
  useEffect(() => {
    setCurrentPage(1);
  }, [globalFilter, statusFilter]);

  //   page change handling
  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
  };

  //   delete function
  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const resultAction = await dispatch(deleteProperty(currentItem));

      if (deleteProperty.fulfilled.match(resultAction)) {
        toast.success("Property Deleted Successfully.");
        dispatch(
          fetchProperties({
            search: globalFilter,
            page: currentPage,
            limit: pageSize,
          })
        );
        closeDeleteModal();
      } else {
        throw new Error(resultAction.payload || "Failed to delete property.");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error(error.message || "Error deleting property!");
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    globalFilter,
    setGlobalFilter,
    properties,
    pageSize,
    handlePageChange,
    currentPage,
    activeModal,
    closeModal,
    openModal,
    push,
    loading,
    handleDelete,
    showDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    deleteLoading,
    totalCount,
    setStatusFilter,
    statusFilter,
  };
};

export default useProperty;
