import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  deleteRequest,
} from "../../../../libs/utils/request_handler";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../../../../store/features/clients/clientSlice";
import { clientLoading, selectClient, selectClientsTotalCount } from "../../../../store/features/clients/clientSelectors";

const useClients = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { push } = useRouter();
  const [currentItem, setCurrentItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector(selectClient);
  const loading = useSelector(clientLoading);
  const totalCount = useSelector(selectClientsTotalCount);

  useEffect(() => {
    dispatch(fetchClients({ search: globalFilter, page: currentPage, limit: pageSize }));
  }, [globalFilter, currentPage, dispatch]);

    useEffect(() => {
    setCurrentPage(1);
  }, [globalFilter]);

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentItem(null);
  };

  const openDeleteModal = (id) => {
    setCurrentItem(id);
    setShowDeleteModal(!showDeleteModal);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page + 1);
  }

  const deleteClientById = async () => {
    try {
      setDeleteLoading(true);
      const response = await deleteRequest(`clients/${currentItem}`);
      if (response) {
        dispatch(fetchClients());
        closeDeleteModal();
        console.log(response);
        toast.success("Client deleted successfully!");
      } else {
        toast.error("Failed to delete client!");
      }
      setDeleteLoading(false);
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error deleting client!"
      );
      setDeleteLoading(false);
    }
  };

  return {
    globalFilter,
    setGlobalFilter,
    users,
    pageSize,
    handlePageChange,
    currentPage,
    push,
    deleteClientById,
    showDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    deleteLoading,
    loading,
    totalCount,
  };
};

export default useClients;
