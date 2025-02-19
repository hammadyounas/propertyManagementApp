import { useEffect, useMemo, useState } from "react";
import { rows } from "../constants/data";
import { useRouter } from "next/navigation";
import {
  deleteRequest,
  getRequest,
} from "../../../../libs/utils/request_handler";
import toast from "react-hot-toast";

const useClients = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { push } = useRouter();

  const [currentItem, setCurrentItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false)

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentItem(null);
  };

  const openDeleteModal = (id) => {
    setCurrentItem(id);
    setShowDeleteModal(!showDeleteModal);
  };

  const fetchClients = async () => {
    try {
      setLoading(true)
      const response = await getRequest("clients");
      console.log(response);
      const filteredUsers = response?.data?.filter((user) => !user.isDeleted);
      console.log(filteredUsers);
      setUsers(filteredUsers);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchClients();
    // setUsers(rows);
  }, []);

  // Calculate the paginated users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return users?.slice(startIndex, startIndex + pageSize);
  }, [users, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
  };

  const deleteClientById = async () => {
    try {
      setDeleteLoading(true);
      const response = await deleteRequest(`clients/${currentItem}`);
      if (response) {
        // setUsers(users.filter((user) => user.id !== id));
        fetchClients();
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
    setUsers,
    paginatedUsers, // Return paginated users
    pageSize,
    handlePageChange,
    currentPage,
    push,
    deleteClientById,
    showDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    deleteLoading,
    loading
  };
};

export default useClients;
